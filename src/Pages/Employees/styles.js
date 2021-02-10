import styled from 'styled-components';
import bg from '../../assets/img/bg-not-found.gif';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0 1rem  0;
  border-bottom: 1px solid ${({ theme }) => (theme.colors.text)};
`;

export const Body = styled.main`
  max-height: 85vh;
  overflow-y: auto;
`;

export const Title = styled.div`
  font-size: 2.5rem;
  flex: 1;
`;

export const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 57%;
    cursor: pointer;

    &:first-child {
      left: 1.75rem;
      cursor: initial;
    }
  }
`;

export const Input = styled.input`
  margin: 0 1rem;
  font-size: 20px;
  line-height: 24px;
  padding: 10px 40px 10px 40px;
  height: 50px;
  color: ${({ theme }) => (theme.title === 'dark' ? '#fff' : '#333')};
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#333')};
`;

export const Button = styled.button`
  background-color: ${({ theme }) => (theme.colors.primary)};
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  height: 50px;
  width: 100%;
  border-radius: 4px;
  outline: none;
  transition: 0.3s all;
  cursor: pointer;

  &:hover {
    opacity: ${({ theme }) => (theme.title === 'light' ? 0.8 : 0.4)};
  }
`;

export const NoEmployeesFound = styled.div`
  padding: 2rem 0;
  text-align: right;
  min-height: 75vh;
  background-repeat: no-repeat;
  background-position: bottom right;
  background-image: url(${bg});
`;
