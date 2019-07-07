---
title: Go HTTP Reverse Proxy
author: Sidney
date: 1562204746
tags: ['go']
img: "./assets/header2.png"
---

It’s no secret that the go has one of the most comprehensive standard libraries out there but did you know it had a reverse proxy implementation?

Go is one of my favorite programming languages for a many reasons. Simplicity, practicality, and performance were key focus areas for the designers of the language. Where this truly shines is with networking tasks.

This post will show how simple it is to set up a reverse proxy in go and extend the proxy to capture metrics from downstream services.

## Reverse Proxying
If you’re new to the concept of reverse proxying an exact definition would be:

> ”In [computer networks](https://en.wikipedia.org/wiki/Computer_network) , a reverse proxy is a type of [proxy server](https://en.wikipedia.org/wiki/Proxy_server) that retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client, appearing as if they originated from the proxy server itself. “
>
> From [Wikipedia](https://en.wikipedia.org/wiki/Reverse_proxy)

Essentially, a reverse proxy forwards traffic from a client to a set of servers behind the proxy.

![Reverse Proxy Network](./assets/proxy.png)

Why would you want to do this? There are many applications for reverse proxies. Load balancing, TLS termination, metric reporting, and A/B testing are just a few.

If you’d like to learn more about proxying I highly recommend checking out  [Introduction to modern network load balancing and proxying](https://blog.envoyproxy.io/introduction-to-modern-network-load-balancing-and-proxying-a57f6ff80236)  by Matt Klein. Matt is the creator of [Envoy Proxy](https://www.envoyproxy.io/), a robust proxy server that powers service mesh tools like [Istio](https://istio.io/). His post does a great job of outlining the approaches used by modern load balancers and proxies.

## Simple Go Reverse Proxy
How do we go about rolling our own simple proxy in go?

```go
proxy := httputil.NewSingleHostReverseProxy(url)
```

Yep, with the go standard library it really is that simple.

Let’s dig in here. The function returns a reverse proxy with the following method.

```go
func (p *ReverseProxy) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
```

All we need to do is configure the proxy and wire it up to a standard go http server to have a working reverse proxy as shown below.

```go
package main

import (
	"flag"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"
)

func main() {
	port := flag.Int("port", 8080, "port to listen on")
	targetURL := flag.String("target-url", "", "downstream service url to proxy to")
	flag.Parse()

	u, err := url.Parse(*targetURL)
	if err != nil {
		log.Fatalf("Could not parse downstream url: %s", *targetURL)
	}

	proxy := httputil.NewSingleHostReverseProxy(u)

	director := proxy.Director
	proxy.Director = func(req *http.Request) {
		director(req)
		req.Header.Set("X-Forwarded-Host", req.Header.Get("Host"))
		req.Host = req.URL.Host
	}

	http.HandleFunc("/", proxy.ServeHTTP)
	log.Printf("Listening on port %d", *port)
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(*port), nil))
}
```

That’s it! This server can now handle proxying HTTP 1 and 2 as well as web socket connections. You’ll notice that I’ve configured the _proxy.Director_ field. The _ReverseProxy.Director_ is a function that modifies the incoming request before it is forwarded. The signature is as follows:

```go
Director func(*http.Request)
```

A common use case for the director function is altering request headers. There is a default director set by  _httputil.NewSingleHostReverseProxy_ . The default implementation takes care of setting the request scheme, host, and path. I found this useful and didn’t want to duplicate the code. I had to reset the _req.Host_  field to contact HTTPS endpoints . I’ve also included an example of setting a request header.

## Capturing Metrics 
Not too long ago I was asked to build a demo for one of our clients at work. The task was to capture the response metrics of a web service and add those metrics to [Prometheus](https://prometheus.io/) for display in [Grafana](https://grafana.com/). The only catch was that I did not have direct access to the web service and therefore couldn’t instrument the code. I completed the task by adapting the go reverse proxy to observe the network traffic coming from the service.

Let’s extend our simple proxy to read and report metrics about the downstream service responses. To do this we’ll return to the  _httputil.ReverseProxy_ struct once more. It exposes a  struct field _ReverseProxy.ModifyResponse_ which gives us access to the http response before it goes back to the client.

```go
ModifyResponse func(*net/http.Response) error
```

HTTP bodies in go are implemented as _io.Reader_’s and therefore they can only be read once. If you would like to parse them before forwarding the request/response you will need to copy the body into a byte buffer and the reset the request/response body. An obvious drawback is that we buffer the entire response in memory without limit. This could lead to memory issues in production if you received a large response but for our use case this wasn’t an issue. Here’s a quick implementation to duplicate the response body.

```go
func duplicateReader(in io.ReadCloser) (b, b1 io.ReadCloser, err error) {
	bBytes, err := ioutil.ReadAll(in)
	if err != nil {
		return nil, nil, err
	}

	in.Close()

	buf := bytes.NewBuffer(bBytes)
	b = ioutil.NopCloser(buf)
	b1 = ioutil.NopCloser(bytes.NewBuffer(bBytes))

	return
}
```

Depending on your use case you may not actually want to duplicate the reader. You may opt for returning the parsed body of the response i.e. parsing the json into a struct or _map[string]interface{}_  and just resetting _req.Body_ to an equivalent reader.

With the request body problem solved, capturing metrics is simple.

```go
	proxy := httputil.NewSingleHostReverseProxy(u)
	// Configure proxy.Director ...

	// ModifyResponse runs before forwarding the downstream response back to the client
	proxy.ModifyResponse = func(res *http.Response) error {
			var err error
			var body io.ReadCloser

			body, res.Body, err = duplicateReader(res.Body)
			if err != nil {
				panic(err)
			}

			fmt.Printf("body = %+v\n", body)

			captureMetrics(body)
			return nil
		}
}
```

And that’s it! The capture metrics function was pretty specific to my use case so I’ll leave it up to you to implement. Form here it is pretty straightforward to further extend for applications like load balancing, redirect policies, etc.

Hopefully you’ve left this post as excited as I am about the go standard library for networking tasks. If you found this at all useful or have any questions please leave a comment below.
