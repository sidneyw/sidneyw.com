// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import { Center, ZDepth1 } from './mixins';

// TODO: Check out: https://github.com/fisshy/react-scroll - 03/04/18 12:42:12 sidneywijngaarde
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = debounce(this.handleScroll.bind(this), 100, {
      leading: true,
      trailing: false,
      maxWait: 200,
    });
  }

  state = { show: false, lastY: 0 };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    this.setState({
      show: window.scrollY < this.state.lastY,
      lastY: window.scrollY,
    });
  }

  render() {
    return (
      <Nav show={this.state.show}>
        <NavLinks>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <NavLink href="#experience">Experience</NavLink>
        </NavLinks>
      </Nav>
    );
  }
}

// ------------------------------------
// Style Components
// ------------------------------------
const Nav = styled.nav`
  ${ZDepth1} z-index: 6;
  position: fixed;
  transition: all 200ms ease;
  transform: translateY(${({ show }) => (show ? '0' : '-15vh')});
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  width: 100vw;
  height: 10vh;
  max-height: 200px;
  padding: 0 10px;
`;

const NavLinks = styled.div`
  ${Center} height: 100%;
  width: 100%;
  justify-content: space-between;

  // pure-md
  @media screen and (min-width: 48em) {
    justify-content: flex-end;
  }
`;

const NavLink = styled.a`
  margin: 0 0.5vw;
  text-decoration: none;
  color: #000;
  font-weight: 100 !important;

  &:visited,
  &:focused {
    text-decoration: none;
    color: #000;
  }
`;
