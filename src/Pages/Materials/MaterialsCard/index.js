import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Main,
  Card,
  Body,
  MaterialName,
  MaterialPrice,
  MaterialDescription,
  MaterialFooter,
} from './styles';

const MaterialsCard = ({ materials, error }) => {
  const history = useHistory();

  const handleRedirect = useCallback(({ id }) => {
    history.push(`/materials/${id}`);
  });

  return (
    <Main>
      {error ? (
        <>
          <div>Error status: {error.status}</div>
          <div>Error message: {error.data.message || error.statusText}</div>
        </>
        ) : (
          materials.map((material) => (
            <Card
              color={material.is_active ? '#66BB6A' : '#666'}
              onClick={() => handleRedirect(material)}
              key={`${material.id}`}
              title={material.description}
            >
              <Body>
                <MaterialName>
                  <p>{material.name}</p>
                </MaterialName>
                <MaterialDescription>
                  <p>{material.description || 'Não informado'}</p>
                </MaterialDescription>
                <MaterialPrice>
                  <p>
                    {Intl.NumberFormat('pt-BR', {
                      style: 'currency', currency: 'BRL'
                    }).format(material.price)}
                  </p>
                </MaterialPrice>
                <MaterialFooter color={material.is_active ? '#66BB6A' : '#666'}>
                  <p>{material.is_active ? 'Ativo' : 'Inativo'}</p>
                </MaterialFooter>
              </Body>
            </Card>
        ))
      )}
    </Main>
  );
};

export default MaterialsCard;
