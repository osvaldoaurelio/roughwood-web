import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingImage = styled.img`
  margin-right: 0.5rem;
  height: ${({ size }) => `${size}px`};
`;

export const LoadingTitle = styled.p`
  color: ${({ titleColor }) => titleColor};
`;
