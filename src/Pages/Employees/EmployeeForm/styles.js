import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorContainer = styled.div``;

export const NoInputError = styled.p`
  color: #e81123;
  display: ${({ error }) => (error ? 'block' : 'none')};
`;

export const Form = styled.form`
  display: flex;
  width: 600px;
  padding: 4rem;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 8px solid ${({ color }) => (color ?? '#666')};

  &:hover {
    box-shadow: 0 0 16px -12px ${({ color }) => color};
  }
`;

export const Header = styled.div``;

export const Avatar = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  font-size: 2rem;
  margin-right: 2rem;
  border: 2px solid ${({ color }) => color};
  box-shadow: 0 0 1px ${({ theme }) => (theme.title === 'light' ? '#333' : '#ccc')};
  text-shadow: 0 0 1px ${({ theme }) => (theme.title === 'light' ? '#333' : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
`;

export const Button = styled.button`
  display: none;
`;

export const Body = styled.div`
  display: grid;
  flex: 1;
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  svg {
    min-width: 20px;
  }
`;

export const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  svg {
    min-width: 20px;
  }
`;

export const Address = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  svg {
    min-width: 20px;
  }
`;

export const Phone = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  svg {
    min-width: 20px;
  }
`;

export const Input = styled.input`
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  margin-left: 1rem;
  height: 50px;
  width: 100%;
  border-radius: 4px;
  outline: none;
  background-color: ${({ theme }) => {
    return theme.title === 'light' ? '#fff' : '#ccc';
  }};
  border-color: ${({ error, value }) => (error && !value ? '#e81123' : 'none')};
`;
