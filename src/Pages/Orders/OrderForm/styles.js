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
  width: 960px;
  padding: 3rem;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 16px solid ${({ color }) => color};
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

  hr.order-form-hr {
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }
`;

export const ErrorContainer = styled.div``;

export const NoInputError = styled.p`
  color: #e81123;
  display: ${({ error }) => (error ? 'block' : 'none')};
`;

export const FormControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div:not(:first-child) > svg {
    margin-left: 2rem;
  }
`;

export const Employee = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 1rem 0;
  flex: 1;

  label {
    font-size: 1.25rem;
  }

  svg {
    min-width: 20px;

    &:last-child {
      position: absolute;
      color: #000;
      right: 2%;
    }

    &.total-price {
      position: initial;
      margin-left: 1rem;
      color: ${({ theme }) => theme.colors.text};
    }

    &.add-material {
      margin-right: 1rem;
    }
  }
`;

export const Customer = styled(Employee)``;

export const Description = styled(Employee)``;

export const InitialDate = styled(Employee)``;

export const FinalDate = styled(Employee)``;

export const LaborCost = styled(Employee)``;

export const AddMaterial = styled(Employee)`
  display: inline-block;
  text-align: right;
  flex: none;
  margin-left: 5rem;

  p {
    border: 1px solid #3333;
    transition: 0.3s all;
    border-radius: 4px;
    padding: 0.95rem;
    display: inline-block;
    cursor: ${({ cursor }) => cursor ? 'not-allowed' : 'pointer'};

    &:hover {
      color: ${({ cursor }) => cursor ? '' : '#333'};
      background-color: ${({ cursor }) => cursor ? '' : '#ccc'};
      border: 1px solid ${({ cursor }) => cursor ? '' : '#777'};
    }
  }
`;

export const TotalPrice = styled(Employee)`
  justify-content: flex-end;

  label {
    max-width: 800px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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

export const Select = styled.select`
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  margin-left: 1rem;
  height: 50px;
  width: 100%;
  border-radius: 4px;
  outline: none;
  appearance: none;
  background-color: ${({ theme }) => {
    return theme.title === 'light' ? '#fff' : '#ccc';
  }};
  border-color: ${({ error, value }) => (error && !value ? '#e81123' : 'none')};
`;

export const Input = styled.input`
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  margin-left: 1rem;
  height: 50px;
  width: 90%;
  border-radius: 4px;
  outline: none;
  background-color: ${({ theme }) => {
    return theme.title === 'light' ? '#fff' : '#ccc';
  }};
  border-color: ${({ error, value }) => (error && !value ? '#e81123' : 'none')};
`;

