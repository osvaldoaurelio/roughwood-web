import { useHistory } from 'react-router-dom';

import {
  Main,
  Card,
  Header,
  Avatar,
  Body,
  Title,
} from './styles';

const DashBoardCard = ({ title, qntt, color, to, error }) => {
  const history = useHistory();

  return (
    <Main>
      {error ? (
        <>
          <div>Error status: {error.status}</div>
          <div>Error message: {error.data.message || error.statusText}</div>
        </>
        ) : (
          <Card
            color={color}
            onClick={() => history.push(to)}
            title="Clique para mais detalhes"
          >
            <Body>
              <Title>{title}</Title>
              <Header>
                <Avatar color={color}>{qntt}</Avatar>
              </Header>
            </Body>
          </Card>
      )}
    </Main>
  );
};

export default DashBoardCard;
