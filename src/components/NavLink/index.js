/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// This creates a custom component that wraps an <a> tag
const RedLink = styled.a`
  color: ${props => props.color || 'black !important'};
  &:hover: {
    color: ${props => props.color} !important;
  }
`;

function NavLink({ href, name, color, onClick }) {
  // Must add passHref to Link
  return (
    <Link href={href} passHref onClick={onClick}>
      <RedLink color={color}>{name}</RedLink>
    </Link>
  );
}

export default NavLink;
