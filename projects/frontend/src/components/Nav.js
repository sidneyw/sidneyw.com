// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import debounce from 'lodash.debounce';
import { Menu } from 'react-feather';
import SocialIcon, { PropType as SocialPropType } from './SocialIcon';
import Link from './Link';

import { IconButton } from '.';
import { Center, ZDepth1 } from './mixins';

// TODO: Check out: https://github.com/fisshy/react-scroll - 03/04/18 12:42:12 sidneywijngaarde
export default class Navigation extends React.Component {
  static propTypes = {
    hamburger: SocialPropType,
    socialIcons: PropTypes.arrayOf(SocialPropType),
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string.isRequired,
      })
    ),
  };

  constructor(props) {
    super(props);

    this.handleScroll = debounce(this.handleScroll.bind(this), 100, {
      leading: true,
      trailing: false,
      maxWait: 200,
    });

    this.toggleMobile = this.toggleMobile.bind(this);
  }

  state = { show: true, showMobile: false, lastY: 0 };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({
      show: window.scrollY < this.state.lastY,
      showMobile: false,
      lastY: window.scrollY,
    });
  }

  toggleMobile() {
    this.setState({ showMobile: !this.state.showMobile });
  }

  render() {
    const { links, socialIcons } = this.props;

    return (
      <Nav show={this.state.show}>
        <NavWrap show={this.state.show}>
          <LogoLink to="/">Sidney Wijngaarde</LogoLink>
          <Hamburger onClick={this.toggleMobile}>
            <Menu />
          </Hamburger>
        </NavWrap>
        <NavLinks
          onClick={this.toggleMobile}
          showMobile={this.state.showMobile}
        >
          {links.map(link => (
            <NavLink {...link} key={link.text}>
              {link.text}
            </NavLink>
          ))}
          <Divider />
          {/* <SocialWrap>
                 {socialIcons.map((icon, ind) => <NavSocial {...icon} key={ind} />)}
               </SocialWrap> */}
        </NavLinks>
      </Nav>
    );
  }
}

// ------------------------------------
// Style Components
// ------------------------------------
const NavHeight = 10;

const LogoLink = styled(Link)`
  font-size: 1.5em;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;

const NavToggle = prop => css`
  transition: all 200ms ease;
  transform: translateY(${prop ? '0' : '-50vh'});
`;

const NavStyles = css`
  ${ZDepth1};
  ${({ show }) => NavToggle(show)};
  display: flex;
  z-index: 2;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  width: 100vw;
  height: ${NavHeight}vh;
  max-height: 200px;
  padding: 0 10px;
`;

const Nav = styled.nav`
  z-index: 2;
  position: fixed;
  display: flex;
  font-weight: 100 !important;
  p {
    font-size: 1.5em;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    ${NavStyles};
  }
`;

const NavLinks = styled.div`
  ${ZDepth1} ${Center}
  ${({ showMobile }) => NavToggle(showMobile)};
  position: fixed;
  z-index: 1;
  top: ${NavHeight}vh;
  left: 0;
  flex-flow: column;
  justify-content: space-between;
  background-color: #fff;
  width: 100vw;
  padding: 10px;

  // pure-md
  @media screen and (min-width: 48em) {
    display: flex;
    height: 100%;
    position: relative;
    top: 0;
    right: 0;
    width: initial;

    flex-flow: row nowrap;
    justify-content: flex-end;
    padding: 0;
    box-shadow: none;
    transform: none;
  }
`;

const NavLink = styled(Link)`
  margin: 5px auto;
  &:last-of-type {
    margin-bottom: 0;
  }

  text-decoration: none;
  color: #000;

  &:visited,
  &:focused {
    text-decoration: none;
    color: #000;
  }

  // pure-md
  @media screen and (min-width: 48em) {
    margin-left: 0.5vw;
    margin-bottom: 0;
  }
`;

const NavWrap = styled.div`
  ${NavStyles} // pure-md
  @media screen and (min-width: 48em) {
    box-shadow: none;
  }
`;

const SocialWrap = styled.div`
  ${Center} height: 100%;
  width: 100%;
  margin-top: 5px;
  // pure-md
  @media screen and (min-width: 48em) {
    width: initial;
    margin-top: 0px;
  }
`;

const Hamburger = styled.div`
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  // pure-md
  @media screen and (min-width: 48em) {
    display: none;
  }
`;

const NavSocial = styled(SocialIcon)`
  margin: 0.5em;

  // pure-md
  @media screen and (min-width: 48em) {
    margin: 0.2em;
  }
`;

const Divider = styled.span`
  width: 50%;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  margin: 5px 0;

  // pure-md
  @media screen and (min-width: 48em) {
    height: 50%;
    width: 0;
    margin: 0 10px;
  }
`;
