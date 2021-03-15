import { useEffect, useState } from 'react';

import { LoaderSpinner } from '../../components';
import DashboardCard from './DashBoardCard';

import { useAuth } from '../../hooks';

import { listCustomers } from '../../services/customer';
import { listEmployees } from '../../services/employee';
import { listMaterials } from '../../services/material';
import { listOrders } from '../../services/order';

import { Container, Header, Title, Body, Grid } from './styles';

const Dashboard = () => {
  const { signOut } = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadCustomers = async () => {
    setLoading(true);
    setError(null);

    try {
      const { customers } = await listCustomers();
      setCustomers(customers);
    } catch ({ response }) {
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);

    try {
      const { employees } = await listEmployees();
      setEmployees(employees);
    } catch ({ response }) {
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  const loadMaterials = async () => {
    setLoading(true);
    setError(null);

    try {
      const { materials } = await listMaterials();
      setMaterials(materials);
    } catch ({ response }) {
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const { orders } = await listOrders();
      setOrders(orders);
    } catch ({ response }) {
      response?.data?.error === 'Invalid JWT token' && signOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
    loadEmployees();
    loadMaterials();
    loadOrders();
  }, []);

  const activeMaterials = ({ is_active }) => is_active;

  const inactiveMaterials = ({ is_active }) => !is_active;



  const pendingOrders = ({ status }) => status === 'pending';

  const progressOrders = ({ status }) => status === 'progress';

  const doneOrders = ({ status }) => status === 'done';

  const lateOrders = ({ status }) => status === 'late';

  const invoicedOrders = ({ status }) => status === 'invoiced';

  return (
    <Container>
      <Header>
        <Title>Dashboard</Title>
      </Header>
      <Body>
        {loading ? (
          <LoaderSpinner size={300} />
        ) : (
          <Grid>
            <DashboardCard
              title="Clientes cadastrados"
              qntt={customers.length}
              color="#1de9b6"
              to="/customers"
              error={error}
            />
            <DashboardCard
              title="Funcionários"
              qntt={employees.length}
              color="#3d5afe"
              to="/employees"
              error={error}
            />
            <DashboardCard
              title="Materiais ativos"
              qntt={materials.filter(activeMaterials).length}
              color="#76ff03"
              to="/materials"
              error={error}
            />
            <DashboardCard
              title="Materiais inativos"
              qntt={materials.filter(inactiveMaterials).length}
              color="#76777377"
              to="/materials"
              error={error}
            />
            <DashboardCard
              title="Ordens pendentes"
              qntt={orders.filter(pendingOrders).length}
              color="#FF6F00"
              to="/orders"
              error={error}
            />
            <DashboardCard
              title="Ordens em progresso"
              qntt={orders.filter(progressOrders).length}
              color="#01579B"
              to="/orders"
              error={error}
            />
            <DashboardCard
              title="Ordens concluídas"
              qntt={orders.filter(doneOrders).length}
              color="#1B5E20"
              to="/orders"
              error={error}
            />
            <DashboardCard
              title="Ordens atrasadas"
              qntt={orders.filter(lateOrders).length}
              color="#B71C1C"
              to="/orders"
              error={error}
            />
            <DashboardCard
              title="Ordens faturadas"
              qntt={orders.filter(invoicedOrders).length}
              color="#1A237E"
              to="/orders"
              error={error}
            />
            <DashboardCard
              title="Ordens totais"
              qntt={orders.length}
              color="#5d4037"
              to="/orders"
              error={error}
            />
          </Grid>
        )}
      </Body>
    </Container>
  );
};

export default Dashboard;
