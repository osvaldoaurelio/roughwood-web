import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

import NotFound from '../../NotFound';
import MaterialForm from '../MaterialForm';
import { LoaderSpinner } from '../../../components';

import { showMaterial, updateMaterial } from '../../../services/material';

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

const MaterialEdit = () => {
  const params = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [material, setMaterial] = useState({});

  const handleUpdateMaterial = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { name, price, description, is_active, id } = material;
    if (!name || !price) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { material } = await updateMaterial(
        { name, price, description, is_active },
        { id },
      );
      setMaterial(material);
      setLoading(false);
      history.push(`/materials/${material.id}`);
    } catch ({ response }) {
      setError(response.data?.error || response?.statusText);
    } finally {
      setLoading(false);
    }
  });

  const handleShowMaterial = async () => {
    setLoading(true);
    setError(null);

    try {
      const { material } = await showMaterial(params);
      setMaterial(material);
    } catch ({ response }) {
      setError(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleShowMaterial();

    return () => setMaterial({});
  }, []);

  if (error?.status === 404) {
    return <NotFound />;
  }

  return (
    <Container>
      {loading ? (
        <LoaderSpinner size={300} />
      ) : (
        <Header>
          <Title>
            <GoBack onClick={() => history.push('/materials')} title="Todos os materiais">
              <FaAngleLeft size={20} />
              Materiais
            </GoBack>
            <Name>Editar Material: {material.name}</Name>
          </Title>
          <Action>
            <Cancel onClick={() => history.replace(`/materials/${params.id}`)} title="Clique para cancelar">
              Cancelar
            </Cancel>
            <Button
              type="button"
              onClick={handleUpdateMaterial}
              title="Clique para salvar as alterações deste material"
            >
              Salvar
            </Button>
          </Action>
        </Header>
      )}
      <Main>
        <MaterialForm
          material={material}
          setMaterial={setMaterial}
          updateMaterial={updateMaterial}
          error={error}
          setError={setError}
        />
      </Main>
    </Container>
  );
};

export default MaterialEdit;
