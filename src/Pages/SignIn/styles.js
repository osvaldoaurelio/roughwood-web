import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background-color: #fff;
  width: 100%;
  max-width: 445px;
  padding: 2.5rem;
  border-radius: 4px;
  border: 2px solid #cdd4d9;
  box-shadow: 4px 4px rgba(6,41,66,0.1);
`;

export const Title = styled.h1`
  margin-bottom: 2rem;

  img {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  p {
    color: #666;
    text-align: center;
  }
`;

export const ErrorContainer = styled.div``;

export const NotFoundError = styled.p`
  color: #e81123;
  display: ${({ error }) => error ? 'block' : 'none'};
`;

export const NoInputError = styled.p`
  color: #e81123;
  display: ${({ error }) => error ? 'block' : 'none'};
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
  border-color: ${({ error, value }) => error && !value ? '#e81123': 'none'};
`;

export const Button = styled.button`
  background-color: #666;
  color: #fff;
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
  margin-top: 1.5rem;

  a {
    text-decoration: underline;
    transition: all .3s;
    color: #333;

     &:hover {
       text-decoration: none;
       color: #666;
     }
  }
`;

export const FormFooter = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  max-width: 445px;
  text-align: center;
  color: #fff;
  padding: 24px 0;
`;
