import { useCallback, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import {
  Container,
  Form,
  FormFooter,
  Input,
  Title,
  ErrorContainer,
  AlreadyExistError,
  NoInputError,
  Button,
  ActionContainer
} from './styles';

import useAuth from '../../hooks/useAuth';
import LoaderSpinner from '../../components/LoaderSpinner';
import logo from '../../assets/img/logo.png';

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    username: '',
    password: '',
    inputErr: '',
  });
  const { signUp, loading, error } = useAuth();

  const handleInputChange = useCallback(event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value, inputErr: '' });
  }, [values]);

  const handleSignUp = useCallback(event => {
    event.preventDefault();
    const { name, username, password } = values;

    if (name.length < 3) {
      return setValues({ ...values, inputErr: 'Informe um nome com mais de 2 letras' });
    }
    if (username.includes(' ')) {
      return setValues({ ...values, inputErr: 'Não é permitido espaços no Username' });
    }
    if (!username || !password) {
      return setValues({ ...values, inputErr: 'Preenchimento obrigatório' });
    }
    signUp({ name, username, password });
  }, [signUp, values]);

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <Title>
          <img src={logo} alt="logo" />
          <p>Móveis planejados <br />Criar uma nova conta</p>
        </Title>
        <ErrorContainer>
          <AlreadyExistError error={error}>{error?.data.error}</AlreadyExistError>
          <NoInputError error={values.inputErr}>{values.inputErr}</NoInputError>
        </ErrorContainer>
        <Input
          name="name"
          placeholder="Nome"
          title="Digite um Nome"
          type="text"
          error={values.inputErr}
          value={values.name}
          onChange={handleInputChange}
        />
        <Input
          name="username"
          placeholder="Username"
          title="Digite um Username"
          type="text"
          error={values.inputErr}
          value={values.username}
          onChange={handleInputChange}
        />
        <Input
          name="password"
          placeholder="Password"
          title="Digite um Password"
          type="password"
          error={values.inputErr}
          value={values.password}
          onChange={handleInputChange}
        />
        <Button type="submit" title="Clique para criar a conta" disabled={loading}>
          {loading ? <LoaderSpinner title="Aguarde..." /> : "Criar"}
        </Button>
        <ActionContainer>
          <p></p>
          <Link to="/signin" title="Use uma conta existente para entrar no sistema">
            Entrar com uma conta existente
          </Link>
        </ActionContainer>
      </Form>
      <FormFooter>
        <p>Leonardo & Jorge</p>
      </FormFooter>
    </Container>
  );
};

export default SignUp;
