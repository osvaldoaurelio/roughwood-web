import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';

import MaterialsCard from './MaterialsCard';
import { LoaderSpinner } from '../../components';

import { useAuth } from '../../hooks';
import { listMaterials } from '../../services/material';

import { Container, Header, Title, Action, Input, Button, NoMaterialsFound, Body } from './styles';

const Materials = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleListMaterials = useCallback(
    async term => {
      setLoading(true);
      setError(null);

      try {
        const { materials } = await listMaterials(term);
        setMaterials(materials);
      } catch ({ response }) {
        response.data?.error === 'Invalid JWT token' && signOut();
        setError(response);
      } finally {
        setLoading(false);
      }
    }
  );

  useEffect(() => {
    if (!searchTerm) setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      handleListMaterials(searchTerm);
    }, 1000);

    return () => { clearTimeout(delayDebounceFn); };
  }, [searchTerm]);

  const handleSearchTerm = useCallback(({ target }) => {
    setSearchTerm(previous => {
      return previous === searchTerm ? target.value: previous;
    });
  });

  return (
    <Container>
      <Header>
        <Title>Materiais</Title>
        <Action>
          <FaSearch size={20} />
          <Input
            type="text"
            placeholder="Buscar materiais"
            title="Clique para pesquisar materiais"
            value={searchTerm}
            onChange={handleSearchTerm}
          />
          {searchTerm && <FaRegTimesCircle onClick={() => setSearchTerm('')} size={20} title="Limpar" />}
          <Button
            onClick={() => history.push('/materials/create')}
            title="Clique para cadastrar um novo material"
            type="button"
          >
            Novo Material
          </Button>
        </Action>
      </Header>
      <Body>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          materials.length !== 0 ? (
            <MaterialsCard materials={materials} error={error} />
          ) : (
            <NoMaterialsFound>
              Nenhum material encontrado.
              {searchTerm
                ? ' Mude o termo de busca ou limpe o campo para uma nova pequisa.'
                : ' Para cadastrar um material clique no botão Novo Material.'}
            </NoMaterialsFound>
          )
        )}
      </Body>
    </Container>
  );
};

export default Materials;
