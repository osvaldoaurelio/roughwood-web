import { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR as locale } from 'date-fns/locale';
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleUp,
  FaFileAlt,
  FaFileContract,
  FaFileSignature,
  FaFileMedical,
  FaFileExcel,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaUserTie,
} from 'react-icons/fa';

import NotFound from '../../NotFound';
import { LoaderSpinner } from '../../../components';

import { options } from '../../../utils';

import { removeMaterial, showMaterial } from '../../../services/material';

import {
  Container,
  Header,
  Title,
  GoBack,
  ClientName,
  Action,
  Menu,
  MenuTitle,
  SubMenu,
  MenuItem,
  Main,
  Card,
  Name,
  SupplierName,
  Price,
  Description,
  Since,
  Footer,
} from './styles';

const MaterialDetail = () => {
  const params = useParams();
  const history = useHistory();

  const [material, setMaterial] = useState({});
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
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
  }, [params]);

  const handleActiveMenu = useCallback(event => {
    event.stopPropagation();

    if (event.currentTarget.dataset.id === 'menu') {
      setActive(!active);
    } else {
      setActive(false);
    }
  });

  const handleNew = useCallback(() => {
    history.push('/materials/create');
  });

  const handleEdit = useCallback(() => {
    history.push(`/materials/${params.id}/edit`, material);
  });

  const handleRemove = useCallback(async () => {
    const response = await swal({
      title: 'Excluir Material',
      text: `Você está preste a excluir o material: ${material.name}.\nDeseja continuar?`,
      icon: 'warning',
      buttons: ['Não', 'Sim'],
    });

    if (response) {
      setLoading(true);
      setError(null);
      try {
        removeMaterial(params);
        setLoading(false);
        history.replace('/materials');
      } catch ({ response }) {
        setError(response);
      } finally {
        setLoading(false);
      }
    }
  });

  if (error) {
    return <NotFound />;
  }

  return loading ? (
    <Container>
      <LoaderSpinner size={300} />
    </Container>
    ) : (
    <Container onClick={handleActiveMenu}>
      <Header>
        <Title>
          <GoBack onClick={() => history.push('/materials')} title="Todos os materiais">
            <FaAngleLeft size={20} />
            Materiais
          </GoBack>
          <ClientName>{material.name}</ClientName>
        </Title>
        <Action>
          <Menu data-id="menu" onClick={handleActiveMenu}>
            <MenuTitle title="Clique para mais ações">
              <p>Mais ações</p>
              {active ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
            </MenuTitle>
            <SubMenu active={active}>
              <MenuItem
                title="Clique para adicionar um novo material"
                onClick={handleNew}
              >
                <p>Novo</p>
                <FaFileMedical />
              </MenuItem>
              <MenuItem
                title="Clique para editar este material"
                onClick={handleEdit}
              >
                <p>Editar</p>
                <FaFileSignature />
              </MenuItem>
              <MenuItem
                title="Clique para excluir este material"
                onClick={handleRemove}
              >
                <p>Excluir</p>
                <FaFileExcel />
              </MenuItem>
            </SubMenu>
          </Menu>
        </Action>
      </Header>
      <Main>
        <Card
          color={material.is_active ? '#66BB6A' : '#666'}
          title={`Para editar ou ${material.is_active ? 'des' : ''}ativar este material vá em Mais ações > Editar`}
          onClick={handleActiveMenu}
          data-id="menu"
        >
          <Name>
            <FaFileContract size={24} />
            <p>{material.name}</p>
          </Name>
          <SupplierName>
            <FaUserTie size={24} />
            <p>{material.supplier_name}</p>
          </SupplierName>
          <Description>
            <FaFileAlt size={24} />
            <p>{material.description || 'Não informado'}</p>
          </Description>
          <Price>
            <FaFileInvoiceDollar size={24} />
            <p>
              {Intl.NumberFormat('pt-BR', options.REAL).format(material.price)}
            </p>
          </Price>
          <Since>
            <FaCalendarAlt size={24} />
            <p>{material.created_at && `Criado há ${formatDistanceToNow(parseISO(material.created_at), { locale })}`}</p>
          </Since>
          <Since>
            <FaCalendarAlt size={24} />
            <p>{material.updated_at && `Atualizado há ${formatDistanceToNow(parseISO(material.updated_at), { locale })}`}</p>
          </Since>
          <Footer color={material.is_active ? '#66BB6A' : '#666'}>
            <p>{material.is_active ? 'Ativo' : 'Inativo'}</p>
          </Footer>
        </Card>
      </Main>
    </Container>
  );
};

export default MaterialDetail;
