import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background-color: ${({ theme }) => {
    return theme.title === 'light' ? '#fff' : theme.colors.primary;
  }};
  width: 100%;
  max-width: 445px;
  padding: 2.5rem;
  border-radius: 4px;
  border: 2px solid #cdd4d9;
  box-shadow: 4px 4px rgba(6, 41, 66, 0.1);
`;

export const Title = styled.h1`
  margin-bottom: 1rem;

  img {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
  }
`;

export const ErrorContainer = styled.div``;

export const AlreadyExistError = styled.p`
  color: #e81123;
  display: ${({ error }) => (error ? 'block' : 'none')};
`;

export const NoInputError = styled.p`
  color: #e81123;
  display: ${({ error }) => (error ? 'block' : 'none')};
`;

export const Input = styled.input`
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  margin: 0.5rem 0;
  height: 50px;
  width: 100%;
  border-radius: 4px;
  outline: none;
  background-color: ${({ theme }) => {
    return theme.title === 'light' ? '#fff' : '#ccc';
  }};
  border-color: ${({ error, value }) => (error && !value ? '#e81123' : 'none')};
`;

export const Button = styled.button`
  background-color: ${({ theme }) => {
    return theme.title === 'light'
      ? theme.colors.primary
      : theme.colors.secondary;
  }};
  color: #eee;
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  margin: 0.5rem 0;
  height: 50px;
  width: 100%;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;

  a {
    text-decoration: underline;
    transition: all 0.3s;
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      text-decoration: none;
      color: #666;
    }
  }
`;

export const FormFooter = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 445px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  padding: 20px 0;
`;
