import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

import MaterialForm from '../MaterialForm';

import { storeMaterial } from '../../../services/material';

import {
  Container,
  Header,
  Title,
  GoBack,
  Name,
  Action,
  Cancel,
  Button,
  Main,
} from './styles';
import { LoaderSpinner } from '../../../components';

const MaterialCreate = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [material, setMaterial] = useState({});

  const handleStoreMaterial = async () => {
    setLoading(true);
    setError(null);

    const { name, supplier_name, price, description, is_active } = material;
    if (!name || !supplier_name || !price) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { material } = await storeMaterial(
        { name, supplier_name, price, description, is_active },
      );
      setMaterial(material);
      setLoading(false);
      history.push(`/materials/${material.id}`);
    } catch ({ response }) {
      setError(response.data?.error || response?.statusText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>
          <GoBack onClick={() => history.push('/materials')} title="Todos os materiais">
            <FaAngleLeft size={20} />
            Materiais
          </GoBack>
          <Name>Novo Material</Name>
        </Title>
        <Action>
          <Cancel onClick={() => history.replace('/materials')} title="Clique para cancelar">
            Cancelar
          </Cancel>
          <Button
            type="button"
            onClick={handleStoreMaterial}
            title="Clique para criar um novo material"
          >
            Salvar
          </Button>
        </Action>
      </Header>
      <Main>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          <MaterialForm
            material={material}
            setMaterial={setMaterial}
            storeMaterial={storeMaterial}
            error={error}
            setError={setError}
          />
        )}
      </Main>
    </Container>
  );
};

export default MaterialCreate;
