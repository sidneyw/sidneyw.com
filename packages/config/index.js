class Config {
  constructor(configuration) {
    this.configuration = configuration;
    this.env = process.env.NODE_ENV;
  }

  get(key) {
    const defaultConf = this.configuration[key].default;
    const envConf = this.configuration[key][this.env];

    return Object.assign({}, defaultConf, envConf);
  }

  createClient(key) {
    const clientConf = this.configuration[key];

    return clientConf.init(this.get(key));
  }
}

module.exports = Config;
