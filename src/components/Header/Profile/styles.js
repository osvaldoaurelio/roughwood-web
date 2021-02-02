import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`;

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  padding: 2px;
  border-radius: 50%;
  border: 2px solid #eee;
`;

export const TextContainer = styled.div``;

export const TextRule = styled.p`
  margin: .5rem 0;
  text-align: center;
  font-weight: 400;
  font-size: 18px;
`;

export const TextName = styled(TextRule)`
  font-weight: 900;
  font-size: 16px;
`;
