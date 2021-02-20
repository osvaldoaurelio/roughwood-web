import { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FaFileAlt, FaFileContract, FaFileInvoiceDollar, FaUserTie } from 'react-icons/fa';

import { LoaderSpinner } from '../../../components';

import {
  Container,
  Form,
  Button,
  Body,
  ErrorContainer,
  NoInputError,
  Name,
  SupplierName,
  Description,
  FormControl,
  Price,
  Status,
  TextArea,
  Input,
} from './styles';

const MaterialEdit = ({ material, setMaterial, ...props}) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    props.setError(null);

    const [fnName] = Object.keys(props);
    const fn = props[fnName];

    const { name, price, description, is_active, id } = material;
    if (!name || !price) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { material } = await fn(
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
  };

  const handleInputChange = useCallback(
    ({ target }) => {
      const { name, value } = target;

      setError(null);
      props.setError(null);

      setMaterial({ ...material, [name]: value });
    }
  );

  return (
    <Container>
      {loading ? (
        <LoaderSpinner size={300} />
      ) : (
        <Form
          color={(material?.is_active ?? pathname.includes('create')) ? '#66BB6A' : '#666'}
          onSubmit={handleFormSubmit}
        >
          <Button type="submit" title="Esse filho da puta tá aki pq nao consegui fazer sem ele" />
          <Body>
            <ErrorContainer>
              <NoInputError error={props.error || error}>{props.error || error}</NoInputError>
            </ErrorContainer>
            <Name>
              <FaFileContract size={24} />
              <Input
                autoFocus={true}
                onChange={handleInputChange}
                value={material?.name}
                error={props.error || error}
                name="name"
                placeholder="Nome"
                disabled={pathname.includes('edit')}
                title={pathname.includes('edit')
                  ? 'Não pode ser alterado'
                  : 'Digite o nome do material'}
              />
            </Name>
            <SupplierName>
              <FaUserTie size={24} />
              <Input
                autoFocus={true}
                onChange={handleInputChange}
                value={material?.supplier_name}
                error={props.error || error}
                name="supplier_name"
                placeholder="Nome do fornecedor"
                title="Digite o nome do fornecedor"
              />
            </SupplierName>
            <Description>
              <FaFileAlt size={24} />
              <TextArea
                onChange={handleInputChange}
                value={material?.description}
                name="description"
                placeholder="Descrição"
                title="Digite a descrição do material"
              >
              </TextArea>
            </Description>
            <FormControl>
              <Price>
                <FaFileInvoiceDollar size={24} />
                <Input
                  autoFocus={pathname.includes('edit')}
                  onChange={handleInputChange}
                  value={material?.price}
                  error={error || props.error}
                  name="price"
                  placeholder="Preço"
                  title="Digite o preço do material"
                  />
              </Price>
              <Status title={`Clique para ${material?.is_active ? 'Desa' : 'A'}tivar`}>
                <input
                  id="status"
                  type="checkbox"
                  name="is_active"
                  defaultChecked={(material?.is_active ?? pathname.includes('create'))}
                  checked={(material?.is_active ?? pathname.includes('create'))}
                  onClick={({ target }) => setMaterial({ ...material, is_active: target.checked })}
                />
                <label htmlFor="status">{(material?.is_active ?? pathname.includes('create')) ? 'Desativar': 'Ativar'}</label>
              </Status>
            </FormControl>
          </Body>
        </Form>
      )}
    </Container>
  );
};

export default MaterialEdit;
