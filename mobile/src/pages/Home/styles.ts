/**
 * Página de home
 * @module styles
 * @category Page/Home
 */

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${(props): string => props.theme.colors.background};
`;

export const ContainerTop = styled.View`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
`;

export const Body = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const ContainerMenu = styled.View`
  flex-direction: column;
  margin: 5px;
  padding-top: 37px;
`;
