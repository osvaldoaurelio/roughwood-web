import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  width: 600px;
  padding: 4rem;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 8px solid ${({ color }) => color};
  opacity: ${({ color }) => (color === '#66BB6A' ? 1 : 0.6)};
  max-height: 80vh;
  overflow-y: auto;

  &:hover {
    box-shadow: 0 0 16px -12px ${({ color }) => color};
  }
`;

export const Button = styled.button`
  display: none;
`;

export const Body = styled.div`
  display: grid;
  flex: 1;
`;

export const ErrorContainer = styled.div``;

export const NoInputError = styled.p`
  color: #e81123;
  display: ${({ error }) => (error ? 'block' : 'none')};
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

export const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  svg {
    min-width: 20px;
  }
`;

export const FormControl = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  svg {
    min-width: 20px;
  }
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  position: relative;
  cursor: pointer;

  input[type=checkbox] {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  label {
    cursor: pointer;
    padding: 0 1rem;
    font-size: 1.25rem;
  }
`;

export const TextArea = styled.textarea`
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  margin-left: 1rem;
  height: 50px;
  width: 100%;
  border-radius: 4px;
  outline: none;
  resize: vertical;
  min-height: 128px;
  background-color: ${({ theme }) => {
    return theme.title === 'light' ? '#fff' : '#ccc';
  }};
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
