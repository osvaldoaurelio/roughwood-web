import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks';
import logo from '../../assets/img/logo.png';

import {
  Container,
  Form,
  FormFooter,
  Input,
  Title,
  ErrorContainer,
  NotFoundError,
  NoInputError,
  Button,
  ActionContainer,
} from './styles';

const SignIn = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    inputErr: '',
  });
  const { signIn, error } = useAuth();

  const handleInputChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setValues({ ...values, [name]: value, inputErr: '' });
    },
    [values]
  );

  const handleSignIn = useCallback(
    event => {
      event.preventDefault();
      const { username, password } = values;

      if (username.includes(' ')) {
        return setValues({
          ...values,
          inputErr: 'Não é permitido espaços no Username',
        });
      }
      if (!username || !password) {
        return setValues({ ...values, inputErr: 'Preenchimento obrigatório' });
      }
      signIn({ username, password });
    },
    [signIn, values]
  );

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <Title>
          <img src={logo} alt="logo" />
          <p>
            Móveis planejados <br />
            Entrar no sistema
          </p>
        </Title>
        <ErrorContainer>
          <NotFoundError error={error}>{error?.data.error}</NotFoundError>
          <NoInputError error={values.inputErr}>{values.inputErr}</NoInputError>
        </ErrorContainer>
        <Input
          autoFocus={true}
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
        <Button type="submit" title="Clique para entrar no sistema">
          Entrar
        </Button>
        <ActionContainer>
          <p title="Ainda não implementado">Esqueceu sua senha?</p>
          <Link to="/signup" title="Crie uma conta para entrar no sistema">
            Criar uma conta
          </Link>
        </ActionContainer>
      </Form>
      <FormFooter>
        <p>Leonardo & Jorge</p>
      </FormFooter>
    </Container>
  );
};

export default SignIn;
