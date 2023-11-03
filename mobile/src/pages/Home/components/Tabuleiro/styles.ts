import styled from 'styled-components/native';

export const Container = styled.View`
  /* background-color: ${(props): string => props.theme.colors.buttonDanger}; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 80%;
`;

export const ContainerJogavel = styled.View`
  width: 300px;
  height: 300px;

  /* background-color: ${(props): string => props.theme.colors.backgroundDisabled}; */
`;

export const Linha = styled.View`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 300px;

  /* background-color: ${(props): string => props.theme.colors.buttonPressed}; */
`;

export const ContainerBotao = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;

  /* background-color: ${(props): string => props.theme.colors.buttonPrimary}; */
`;
