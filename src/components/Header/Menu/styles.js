import styled from "styled-components";

export const Container = styled.div`
  padding: 1.5rem 0;
  flex: 1;
`;

export const Nav = styled.nav``;

export const LinkContainer = styled.div`
  margin-left: -1rem;
  margin-right: -1rem;

  &:hover {
    box-shadow: 0 0 32px #999 inset;
  }

  a {
    text-decoration: none;
    display: block;
    padding: .75rem 1rem;
    transistion: all .3s;

    &:hover {
      font-weight: 900;
    }
  }
`;
