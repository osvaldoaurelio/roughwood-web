import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NotFoundText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2.5vw;
  font-weight: bold;
  width: 50%;
  min-width: 200px;
  text-align: center;
  line-height: 3rem;
  letter-spacing: 2px;
`;

export const Img = styled.img`
  width: 50%;
  min-width: 200px;
`;
