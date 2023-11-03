/**
 * Módulo contendo constantes globais do App
 * @module global
 * @category Constants
 */

import * as FileSystem from 'expo-file-system';

/**
 * Lista de UFs
 */
export const listaUfs = [
  { label: 'AC', value: 'AC' },
  { label: 'AL', value: 'AL' },
  { label: 'AP', value: 'AP' },
  { label: 'AM', value: 'AM' },
  { label: 'BA', value: 'BA' },
  { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' },
  { label: 'ES', value: 'ES' },
  { label: 'GO', value: 'GO' },
  { label: 'MA', value: 'MA' },
  { label: 'MT', value: 'MT' },
  { label: 'MS', value: 'MS' },
  { label: 'MG', value: 'MG' },
  { label: 'PA', value: 'PA' },
  { label: 'PB', value: 'PB' },
  { label: 'PR', value: 'PR' },
  { label: 'PE', value: 'PE' },
  { label: 'PI', value: 'PI' },
  { label: 'RJ', value: 'RJ' },
  { label: 'RN', value: 'RN' },
  { label: 'RS', value: 'RS' },
  { label: 'RO', value: 'RO' },
  { label: 'RR', value: 'RR' },
  { label: 'SC', value: 'SC' },
  { label: 'SP', value: 'SP' },
  { label: 'SE', value: 'SE' },
  { label: 'TO', value: 'TO' },
];

export const KeysStorage = {
  placar: '@jogavelha:placar',
};

/**
 * Status de controle de telas: </p>
 * stInsert: 'INSER', stUpdate: 'UPDATE', stView: 'VIEW', stSearch: 'SEARCH'
 */
export const StateScreen = {
  stInsert: 'INSER',
  stUpdate: 'UPDATE',
  stView: 'VIEW',
  stSearch: 'SEARCH',
};

/**
 * Máscara telefone
 */
export const TelefoneMask: any = [
  '(',
  /\d/,
  /\d/,
  ')',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

/**
 * Mascara para Inteiro
 */
export const IntegerMask: any = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

/**
 * Pasta temporária usada para salvar arquivos no APP
 */
export const tempDir = `${FileSystem.documentDirectory}/temp`;
