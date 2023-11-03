/* eslint-disable import/no-extraneous-dependencies */
/**
 * Módulo styled components usados em todo APP
 * @module StyledComponents
 * @category Components
 */
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { RFValueSp } from '../../util/functions';
import TextSp from '../TextSp';

/**
 * Usado como container de linha que recebe itens a serem agrupados em linha
 */
export const ContainerLinhaLabel = styled.View`
  flex-direction: column;
  padding: 5px;
  padding-bottom: 0;
  padding-top: 0;
`;

/**
 * Usado como container de linha que recebe itens a serem agrupados em linha
 */
export const ContainerLinha = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

/**
 * Usado como container de linha que recebe itens a serem agrupados em linha
 */
export const ContainerLinhaMinima = styled.View`
  flex-direction: row;
`;

/**
 * Usado como container de linha dupla que agrupa elementos em linha, e tem um heigth de 55px
 */
export const ContainerLinhaDupla = styled.View`
  min-height: ${RFValueSp(55)}px;

  flex-direction: row;
  margin-bottom: 5px;
`;

/**
 * Componente Header usado nas paginas do APP
 */
export const Header = styled.View`
  height: ${RFValueSp(85)}px;
  background-color: ${(props): string => props.theme.colors.tabBar};

  /* background-color: #f5a044; */

  padding-top: ${Platform.OS === 'ios'
    ? Constants.statusBarHeight
    : Constants.statusBarHeight - 5}px;
`;

/**
 * Componente Title usado nas paginas do APP
 */
export const Title = styled(TextSp)`
  color: ${(props): string => props.theme.colors.titleLigth};
  font-size: ${RFValueSp(20)}px;
  font-family: ${(props): string => props.theme.fonts.PoppinsBold};
`;

/**
 * Componente TitleLogin usado nas paginas do APP
 */
export const TitleLogin = styled(TextSp)`
  color: ${(props): string => props.theme.colors.titleLigth};
  font-size: ${RFValueSp(24)}px;
  /* font-weight: bold; */
  font-family: 'Poppins-Bold';
`;

/**
 * Componente delimitador usado como espaçamento entre componentes
 */
export const ViewDelimitador = styled.View`
  flex: 1;
  margin: 10px 4px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${(props): string => props.theme.colors.textDisabled};
`;

export const ContainerDegrade = styled(LinearGradient)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

export const LinhaDetalhe = styled.View`
  width: 100%;
  height: 5px;
  background-color: ${(props): string => props.theme.colors.highlight};
`;
