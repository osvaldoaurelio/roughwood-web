import { useEffect, useRef, useState } from 'react';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';

import { listActiveMaterials } from '../../../../services/material';

import { options } from '../../../../utils';

import {
  Container,
  CloseBtn,
  CardMaterials,
  FormMaterials,
  SelectMaterials,
  Buttons,
  AddMaterials,
  CloseModal,
  TableMaterial,
  ListMaterials,
  TotalMaterials,
} from './styles';

const ModalMaterials = (props) => {
  const selectHTML = useRef();

  const [materials, setMaterials] = useState([]);
  const [stockMaterials, setStockMaterials] = useState([]);
  const [selectMaterials, setSelectMaterials] = useState([]);

  const closeModalMaterials = () => {
    props.setShowModalMaterials(false);
  };

  const handleAddMaterials = () => {
    const { selectedOptions } = selectHTML.current;
    const newSelectMaterials = selectMaterials;

    [...selectedOptions].forEach(({ value }) => {
      newSelectMaterials.push(...stockMaterials?.filter(({ id }) => id == value));
      setStockMaterials(previous => previous.filter(({ id }) => id != value));
    });

    setSelectMaterials(newSelectMaterials);

    const total = selectMaterials?.reduce((previous, { total }) => total + previous, 0);
    props.setMaterials({ total });
    props.setOrder({
      ...props.order,
      total_price: props.order.labor_cost
        ? props.order.labor_cost * 1.1 + total
        : 0 + total,
      used_materials: newSelectMaterials?.map(({ id, qntt }) => ({
        stock_material_id: id,
        quantity: qntt,
      })),
    });
  };

  const handleQntt = ({ id, name, qntt, price, sign = '+' }) => {
    const newSelectMaterials = [];

    qntt = sign === '+' ? ++qntt : --qntt;
    if (!qntt) {
      newSelectMaterials.push(...selectMaterials.filter(s => id !== s.id));
      setStockMaterials([
        ...stockMaterials,
        { id, name, price, qntt: 1, total: price }
      ].sort(
        (a, b) => (a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1)
      ));
    } else {
      newSelectMaterials.push(
        ...selectMaterials.filter(s => id !== s.id),
        {
          ...selectMaterials.find(s => id === s.id),
          qntt,
          total: qntt * price,
        },
      );
    }

    setSelectMaterials(newSelectMaterials);

    const total = newSelectMaterials?.reduce((previous, { total }) => total + previous, 0);
    props.setMaterials({ total });
    props.setOrder({
      ...props.order,
      total_price: props.order.labor_cost
        ? props.order.labor_cost * 1.1 + total
        : 0 + total,
      used_materials: newSelectMaterials?.map(({ id, qntt }) => ({
        stock_material_id: id,
        quantity: qntt,
      })),
    });
  };

  useEffect(() => {
    const loadMaterials = async () => {
      const { materials } = await listActiveMaterials();
      setMaterials(materials);
      setStockMaterials(materials?.map(
        ({ id, name, price}) => ({ id, name, price, qntt: 1, total: price })
      ));
    };

    loadMaterials();
  }, []);

  useEffect(() => {
    const closeOnEscape = ({ keyCode }) => {
      if (keyCode !== 27) return;
      closeModalMaterials();
    };

    window?.document.addEventListener('keyup', closeOnEscape);

    return () => {
      window?.document.removeEventListener('keyup', closeOnEscape);
    };
  }, []);

  return (
    <Container active={props.showModalMaterials}>
      <CloseBtn title="Fechar" active={props.showModalMaterials} onClick={closeModalMaterials} >
        <FaTimes size={32} />
      </CloseBtn>

      <CardMaterials color={'#66BB6A'}>
        <FormMaterials>
          <SelectMaterials
            autoFocus={true}
            title="Selecione os materiais a serem usados nesta ordem"
            multiple={true}
            ref={selectHTML}
          >
            {stockMaterials?.map(({ id, name }) => (
              <option key={`${id}`} value={id}>{name}</option>
            ))}
          </SelectMaterials>
          <Buttons>
            <AddMaterials
              title="Clique para adicionar material"
              onClick={handleAddMaterials}
            >
              Adicionar material
            </AddMaterials>
            <CloseModal
              title="Clique para fechar este modal"
              onClick={closeModalMaterials}
            >
              Fechar
            </CloseModal>
          </Buttons>
        </FormMaterials>
        <hr />
        <TableMaterial>
          <ListMaterials>
            <table>
              {selectMaterials?.sort(
                (a, b) => (a.name?.toLowerCase() > b.name?.toLowerCase() ? 1 : -1)
              ).map(
                ({ id, name, price, qntt, total }) => (
                  <tr key={`${id}`}>
                    <td title={name}>{name}</td>
                    <td title={Intl.NumberFormat('pt-BR', options.REAL).format(price)}>
                      {Intl.NumberFormat('pt-BR', options.REAL).format(price)}
                    </td>
                    <td>
                      <FaMinus
                        size={12}
                        onClick={() => handleQntt({ id, name, qntt, price, sign: '-' })}
                        title="Clique para diminuir a quantidade desse material"
                      />
                      <p title={qntt}>{qntt}</p>
                      <FaPlus
                        size={12}
                        onClick={() => handleQntt({ id, name, qntt, price })}
                        title="Clique para aumentar a quantidade desse material"
                      />
                    </td>
                    <td title={Intl.NumberFormat('pt-BR', options.REAL).format(total)}>
                      {Intl.NumberFormat('pt-BR', options.REAL).format(total)}
                    </td>
                  </tr>
                ))
              }
            </table>
          </ListMaterials>
          <TotalMaterials>
            <p>Valor materiais</p>
            <p title={Intl.NumberFormat('pt-BR', options.REAL).format(props.materials.total)}>
              {Intl.NumberFormat('pt-BR', options.REAL).format(props.materials.total)}
            </p>
          </TotalMaterials>
        </TableMaterial>
      </CardMaterials>

    </Container>
  );
};

export default ModalMaterials;
