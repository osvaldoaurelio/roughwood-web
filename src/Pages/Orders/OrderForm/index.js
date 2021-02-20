import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FaFileAlt, FaUserCog, FaFileInvoiceDollar, FaUser, FaClipboardList, FaClipboardCheck, FaAngleDown, FaCalculator, FaFile } from 'react-icons/fa';

import { listEmployees } from '../../../services/employee';
import { listCustomers } from '../../../services/customer';

import { LoaderSpinner } from '../../../components';
import { status, options } from '../../../utils';

import ModalMaterials from './ModalMaterials';

import {
  Container,
  Form,
  Button,
  Body,
  ErrorContainer,
  NoInputError,
  Employee,
  Customer,
  Description,
  FormControl,
  InitialDate,
  FinalDate,
  LaborCost,
  AddMaterial,
  TotalPrice,
  TextArea,
  Input,
  Select
} from './styles';

const OrderEdit = ({ order, setOrder, ...props}) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const [showModalMaterials, setShowModalMaterials] = useState(false);
  const [materials, setMaterials] = useState({ total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);

  const loadEmployees = async () => {
    const { employees } = await listEmployees();
    setEmployees(employees);
  };

  const loadCustomers = async () => {
    const { customers } = await listCustomers();
    setCustomers(customers);
  };

  useEffect(() => {
    loadEmployees();
    loadCustomers();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    props.setError(null);

    const [fnName] = Object.keys(props);
    const fn = props[fnName];

    const {
      user_id,
      customer_id,
      description,
      initial_date,
      final_date,
      labor_cost,
      total_price,
      used_materials,
      id,
    } = order;
    if (!customer_id || !initial_date || !final_date || !labor_cost || !total_price) {
      setLoading(false);
      return setError('Preenchimento obrigatório');
    }
    try {
      const { order } = await fn(
        {
          user_id,
          customer_id,
          description,
          initial_date,
          final_date,
          labor_cost,
          total_price,
          used_materials,
        },
        { id },
        );
        setOrder(order);
        setLoading(false);
        history.push(`/orders/${order.id}`);
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

      const total_price = name === 'labor_cost'
        ? +(value.replace(/\D/g, '') * 1.1 + materials.total).toFixed(2) || ''
        : order.total_price;

      setOrder({
        ...order,
        total_price,
        [name]: name === 'labor_cost'
          ? value.replace(/\D/g, '') || ''
          : value,
      });
    }
  );

  return (
    <Container>
      {loading ? (
        <LoaderSpinner size={300} />
      ) : (
        <Form
          color={order?.customer_id
            ? status(order?.status)?.bgColor || status('pending').bgColor
            : '#666'}
          onSubmit={handleFormSubmit}
        >
          <Button type="submit" title="Esse filho da puta tá aki pq nao consegui fazer sem ele" />
          <Body>
            <ErrorContainer>
              <NoInputError error={props.error || error}>{props.error || error}</NoInputError>
            </ErrorContainer>
            <FormControl>
              <Customer
                title={pathname.includes('edit')
                  ? 'Não pode ser alterado'
                  : 'Clique para selecionar um cliente'}
              >
                <FaUser size={24} />
                <Select
                  onChange={handleInputChange}
                  value={order?.customer_id}
                  error={error || props.error}
                  name="customer_id"
                  disabled={pathname.includes('edit')}
                >
                  <option selected disabled value={0}>-- Selecione um cliente --</option>
                  {customers?.map(({ id, name }) => (
                    <option key={`${id}`} value={id}>{name}</option>
                  ))}
                </Select>
                <FaAngleDown size={20} />
              </Customer>
              <Employee title="Clique para selecionar um funcionário">
                <FaUserCog size={24} />
                <Select
                  autoFocus={true}
                  onChange={handleInputChange}
                  value={order?.user_id}
                  name="user_id"
                >
                  <option selected disabled value={0}>-- Selecione um funcionário --</option>
                  {employees?.map(({ id, name }) => (
                    <option key={`${id}`} value={id}>{name}</option>
                  ))}
                </Select>
                <FaAngleDown size={20} />
              </Employee>
            </FormControl>
            <Description title="Digite a descrição da ordem">
              <FaFileAlt size={24} />
              <TextArea
                onChange={handleInputChange}
                value={order?.description}
                name="description"
                placeholder="Descrição"
              >
              </TextArea>
            </Description>
            <FormControl>
              <InitialDate title={pathname.includes('edit')
                  ? 'Não pode ser alterado'
                  : 'Selecione a data inicial da ordem'}
              >
                <FaClipboardList size={24} />
                <Input
                  type="date"
                  name="initial_date"
                  onChange={handleInputChange}
                  value={order?.initial_date && format(parseISO(order?.initial_date), 'yyyy-MM-dd')}
                  error={error || props.error}
                  disabled={pathname.includes('edit')}
                />
              </InitialDate>
              <FinalDate title={pathname.includes('edit')
                  ? 'Não pode ser alterado'
                  : 'Selecione a data final da ordem'}
              >
                <FaClipboardCheck size={24} />
                <Input
                  type="date"
                  name="final_date"
                  onChange={handleInputChange}
                  value={order?.final_date && format(parseISO(order?.final_date), 'yyyy-MM-dd')}
                  error={error || props.error}
                  disabled={pathname.includes('edit')}
                />
              </FinalDate>
              <LaborCost title={pathname.includes('edit')
                  ? 'Não pode ser alterado'
                  : 'Digite o valor da mão de obra'}
              >
                <FaFileInvoiceDollar size={24} />
                <Input
                  onChange={handleInputChange}
                  value={order?.labor_cost}
                  error={error || props.error}
                  name="labor_cost"
                  placeholder="Custo do trabalho"
                  disabled={pathname.includes('edit')}
                />
              </LaborCost>
              <AddMaterial cursor={pathname.includes('edit')}>
                <p
                  title={pathname.includes('edit')
                    ? 'Não pode ser alterado'
                    : 'Clique para adicionar/remover/editar materiais para esta ordem'}
                  disabled={pathname.includes('edit')}
                  onClick={() => setShowModalMaterials(pathname.includes('create'))}
                >
                  Materiais
                </p>
              </AddMaterial>
            </FormControl>
            <hr className="order-form-hr" />
            <TotalPrice title="O valor total da ordem será calculado automaticamente">
              <label>
                {order?.total_price
                  ? Intl.NumberFormat('pt-BR', options.REAL).format(order?.total_price)
                  : 'Valor total'}
              </label>
              <FaCalculator className="total-price" size={24} />
            </TotalPrice>
            <hr className="order-form-hr" />
          </Body>
        </Form>
      )}
      <ModalMaterials
        order={order}
        setOrder={setOrder}
        materials={materials}
        setMaterials={setMaterials}
        showModalMaterials={showModalMaterials}
        setShowModalMaterials={setShowModalMaterials}
      />
    </Container>
  );
};

export default OrderEdit;
