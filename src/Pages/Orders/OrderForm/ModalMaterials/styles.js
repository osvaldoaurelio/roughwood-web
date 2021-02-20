import styled from 'styled-components';

export const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
  display: ${({ active }) => active ? 'flex' : 'none'};
  visibility: ${({ active }) => active ? 'visibility' : 'hidden'};
  background-color: ${({ theme }) => theme.title === 'light' ? '#0007' : '#fff7'};
`;

export const CloseBtn = styled.div`
  top: 0;
  right: 0;
  cursor: pointer;
  padding: 0.75rem;
  position: absolute;
  align-items: center;
  transition: 0.3s all;
  justify-content: center;
  display: ${({ active }) => active ? 'flex' : 'none'};
  visibility: ${({ active }) => active ? 'visibility' : 'hidden'};

  &:hover {
    opacity: 0.6;
  }
`;

export const CardMaterials = styled.div`
  position: relative;
  display: flex;
  border-radius: 4px;
  border: 1px solid #666;
  width: 65vw;
  max-height: 65vh;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 8px solid ${({ color }) => color};

  &:hover {
    box-shadow: 0 0 4px ${({ color }) => color};
  }
`;

export const FormMaterials = styled.div`
  flex: 2;
  flex-direction: column;
  padding: 2rem;
`;

export const SelectMaterials = styled.select`
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  height: 196px;
  width: 100%;
  border-radius: 4px;
  outline: none;
`;

export const Buttons = styled.div`
  font-size: 1.4rem;
  margin-top: 2rem;
`;

export const AddMaterials = styled.div`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 1rem;
  border: 1px solid #777;
  border-radius: 4px;
  transition: 0.3s all;
  background-color: ${({ theme }) => theme.colors.secondary };

  &:hover {
    opacity: 0.6
  }
`;

export const CloseModal = styled(AddMaterials)`
  background-color: ${({ theme }) => theme.colors.background };
`;

export const TableMaterial = styled.div`
  padding: 2rem;
  flex: 3;
`;

export const ListMaterials = styled.div`
  height: 45vh;
  overflow-y: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    tr {
      transition: 0.3s all;

      td {
        padding: 0.5rem;
        font-size: 1.125rem;

        &:nth-child(1) {
          max-width: 184px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &:nth-child(3) {
          text-align: center;
          display: flex;
          align-items: center;

          svg {
            cursor: pointer;

            &:active {
              opacity: 0.4;
            }
          }

          p {
            margin: 0 0.25rem;
            max-width: 32px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        &:nth-child(2),
        &:nth-child(4) {
          text-align: right;
          max-width: 100px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      &:nth-child(2n) {
        background-color: ${({ theme }) => theme.title === 'light' ? '#0002' : '#fff2'};
      }

      &:hover {
        background-color: ${({ theme }) => theme.title === 'light' ? '#0004' : '#fff4'};
      }
    }
  }
`;

export const TotalMaterials = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;

  p + p {
    max-width: 280px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
