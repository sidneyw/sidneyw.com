/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import styled from 'styled-components';
import { StackIcon } from './Lead/Stack';
import { Card } from '.';
import ContactModal from '../components/ContactModal';
import ContactModalButton from '../components/ContactModalButton';
import Link from './Link';

const CTAForm = ({ title }) => (
  <StaticQuery
    query={graphql`
      query ctaQuery {
        ctaStack: allFile(filter: { relativePath: { eq: "fed.json" } }) {
          edges {
            node {
              childDataJson {
                stack {
                  name
                  img {
                    childImageSharp {
                      fluid {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ ctaStack }) => {
      const { stack } = ctaStack.edges[0].node.childDataJson;
      return (
        <CTACard>
          <h3>{title}</h3>

          <StackWrap>
            {stack.splice(0, stack.length - 1).map(({ name, img }) => (
              <CTAStackIcon title={name} img={img.childImageSharp} key={name} />
            ))}
          </StackWrap>

          <ContactModal>
            {props => <ContactModalButton {...props} />}
          </ContactModal>
          <Link to="/cloud">Learn More</Link>
        </CTACard>
      );
    }}
  />
);

CTAForm.propTypes = {
  title: PropTypes.string,
};

export default CTAForm;

const CTACard = styled(Card)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  width: 95%;
  max-width: 20em;
  margin: 0 auto;
  border-radius: 5px;

  h3,
  a {
    text-align: center;
  }
`;

const StackWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 1em 0;
  font-size: 0.8em;
`;

const CTAStackIcon = styled(StackIcon)`
  width: 49%;
  padding: 0;
`;
