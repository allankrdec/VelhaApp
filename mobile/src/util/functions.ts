/* eslint-disable no-plusplus */
/**
 * Componente Inicial do aplicativo
 * @module functions
 * @category Util
 */

/* eslint-disable no-restricted-globals */
/* eslint-disable no-promise-executor-return */
import { format, parse } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { tempDir } from '../constants/global';
import { IAuthContextData } from '../hooks/auth';
import TokenExpiredException from './exceptions/TokenExpiredException';

/**
 * Clona um objeto usando JSON
 * @param obj Objeto a ser clonado
 * @returns Clone do objeto enviado via parâmetro
 */
export function cloneObj(obj: any): any {
  if (obj !== undefined && obj !== null) {
    return JSON.parse(JSON.stringify(obj));
  }
  return null;
}

/**
 * Retorna o Offset de um time zone
 * Exemplo: se for fuso de Brasilia, retorna -3, Manaus retorna -4, ...
 *
 * @returns Retorna o offset de um timezone
 */
export function getTimeZoneOffSet(): number {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return offset / 60;
}

/**
 * Adiciona espaçoes à esquerda de uma texto
 *
 * @param text Texto base
 * @param size Quantidade de espaçoes a serem adicionados
 * @returns Retorna uma string com os espaços adicionados
 */
export function padLeft(text: string, size: number): string {
  if (text) {
    return (String('0').repeat(size) + text).substr(size * -1, size);
  }
  return '';
}

/**
 * Gera recebe um objeto de filtros e gera filtros em formato de query params
 * @param filtros Objeto contendo os filtros
 * @param aceitaVazio Flag que indica se o aceita parâmetros vazios ou não
 * @returns
 */
export function geraFiltroHttp(filtros: any, aceitaVazio = true): string {
  if (!filtros) return '';
  let retorno = '';

  const filters = cloneObj(filtros);

  const offset = getTimeZoneOffSet();

  filters.timeZoneOffSet = offset;

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && typeof value === 'string') {
      if (aceitaVazio && value.trim() === '') {
        value = null;
      }
    }

    if (value !== undefined && typeof value === 'boolean') {
      if (aceitaVazio) {
        value = String(value);
      }
    }

    if (value) {
      if (retorno === '') {
        retorno += `?${key}=${value}`;
      } else {
        retorno += `&${key}=${value}`;
      }
    }
  });

  return retorno;
}

/**
 * Devolve uma promisse que se resolve em um determinado de tempo
 *
 * @param ms Tempo em milessegundos
 * @returns Retona uma Promise void
 */
export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Recebe um error e converte em mensagems amigável para o usuário
 * @param error Erro a ser tratado
 */
export function errorHandle(error: any): void {
  // console.log('asdfasd', error);
  let msg = '';
  if (error instanceof TokenExpiredException) {
    // eslint-disable-next-line no-console
    console.log('token expirado');
    return;
  }
  if (typeof error === 'string') {
    msg = error;
  } else if (typeof error === 'object') {
    if (error.tokenExpired) {
      msg = 'Seu acesso expirou, é necessário fazer login';
    } else if (error.response) {
      if (error.response.error && typeof error.response.error === 'string') {
        msg = error.response.data.error;
      } else if (error.response.status === 404) {
        msg = `404 - Recurso não encontrato no servidor.`;
      } else if (error.response.status === 400) {
        msg = '400 - Requisição inválida';
      } else if (error.response.status === 401) {
        msg = '401 - Não autorizado';
      } else if (error.response.status === 405) {
        msg = '405 - Método não permitido';
      } else if (error.response.status === 403) {
        msg = '403 - Você não tem permissão para executar esta ação';
      }
      if (error.response.status === 401) {
        msg = 'É necessário fazer login no sistema.';
      } else if (
        error.response.data &&
        error.response.data.mensagemUsuario &&
        error.response.data.mensagemUsuario !== ''
      ) {
        msg = error.response.data.mensagemUsuario;
      }
    } else if (
      error.name === 'AxiosError' &&
      error.message &&
      typeof error.message === 'string' &&
      error.message.includes('timeout of')
    ) {
      msg =
        'Foi excedido o tempo de espera e o servidor não respondeu.' +
        ' Verifique sua conexão e tente novamente.';
    } else {
      msg = error.toString();
    }
  } else {
    msg = 'Não foi possível processar ação. Verifique sua conexão e tente novamente.';
  }
  if (msg === '') {
    msg = 'Não foi possível processar ação. Verifique sua conexão e tente novamente.';
  }

  if (error?.response?.data?.mensagemDesenvolvedor) {
    // eslint-disable-next-line no-console
    console.log(
      `msg dev: ${error?.response?.data?.mensagemDesenvolvedor}`,
      error?.response?.data.detalhe,
      error?.response?.status
    );
  } else {
    // eslint-disable-next-line no-console
    console.error(`msg dev: ${msg}`);
  }
  Alert.alert('Atenção', msg);
}

/**
 * Exibe uma msg de alerta
 * @param msg Mensagem
 */
export function MessageDialog(msg: string): void {
  Alert.alert('Atenção', msg);
}

/**
 * Valida se uma string contem uma data válida conforme o formado desejado
 * @param strDate String que poderá conter a data
 * @param dateFormat Formato de data a ser usado. Default yyy-MM-dd
 * @returns Retorna True se a data for válida
 */
export function isDate(strDate: string, dateFormat = 'yyyy-MM-dd'): boolean {
  const retorno = parse(strDate, dateFormat, new Date());
  return !!retorno && retorno.toString() !== 'Invalid Date';
}

/**
 * Converte uma string que contem uma data em uma Date
 *
 * @param strDate Data em formato string
 * @param dateFormat Formato da data, default yyyy-MM-dd
 * @returns Retorna um Date gerado pelo parametro enviado
 */
export function strToDate(strDate: string, dateFormat = 'yyyy-MM-dd'): Date | null {
  if (strDate && strDate.length >= 24) {
    return new Date(strDate);
  }
  if (isDate(strDate, dateFormat)) {
    return parse(strDate, dateFormat, new Date());
  }
  return null;
}

/**
 * Formata uma data conforme o dateFormat
 *
 * @param date Data em formato Date ou String
 * @param dateFormat Formato a ser usado, default yyyy-MM-dd
 * @returns Retorna uma string contendo a data formatada.
 */
export function formatDate(date?: Date | string, dateFormat = 'yyyy-MM-dd'): string {
  if (!date) {
    return '';
  }

  if (typeof date === 'string') {
    if (date.length <= 10) {
      date += 'T00:00:00'; // evitar problema com fuso-horário
    }

    date = new Date(date);
  }

  return format(date, dateFormat);
}

/**
 * Cria um Alert do react-native conforme os parâmetros
 * @param title Titulo do Alert
 * @param msg Mensagem a ser exibida
 * @param onConfim Handle para opção de confirmação
 * @param onCancel Handle para opção de cancelamento
 */
export function QuestionDialog(
  title: string,
  msg: string,
  onConfim: () => void,
  onCancel?: () => void
): void {
  Alert.alert(
    title,
    msg,
    [
      {
        text: 'Não',
        onPress: (): void => {
          if (onCancel) {
            onCancel();
          }
        },
      },
      {
        text: 'Sim',
        onPress: (): void => {
          onConfim();
        },
      },
    ],
    {
      cancelable: true,
    }
  );
}

/**
 * Verifica se um val tipo Any é um número válido
 * @param val Valor Any que pode conter o valor numérico
 * @returns Retorna true se o val for um número válido
 */
export function isNumber(val: any): boolean {
  return !isNaN(parseFloat(val)) && isFinite(parseFloat(val));
}

/**
 * Converte uma string contendo número para um numero
 * @param valor Valor a ser convertido
 * @returns Retorna o numero convertido
 */
export function parseNumber(valor: string): number {
  const v = valor.replace('.', '');
  return parseFloat(v.replace(',', '.'));
}

/**
 * Formata um número para string conforme casas decimais
 * @param valor Valor a ser formatado
 * @param casas Número de casas decimais
 * @returns String com número formatado
 */
export function parseMoney(valor: number, casas: number): string {
  try {
    return valor.toFixed(casas).replace('.', ',');
  } catch (error) {
    return '0,00';
  }
}

/**
 * Extrai a parte da data de um Date. Devolve uma string no formato yyyy-mm-dd
 * @param data Data base que será usada
 * @returns Devolve uma string no formato yyyy-mm-dd
 */
export function extractDateStrFromDate(data: Date): string {
  if (!data) {
    return '';
  }
  if (!data.getTime) {
    return '';
  }
  const strIsoDate = data.toISOString();
  return strIsoDate.substring(0, 10);
}

/**
 * Extrai a parte da hora de um Date. Devolve uma string no formato hh:mm ou hh:mm:ss
 * @param data Data base que será usada
 * @param ignoraSegundos Flag que indica se é para considerar segundos ou não
 * @returns Devolve uma string no formato hh:mm ou hh:mm:ss
 */
export function extractTimeStrFromDate(data: Date | string, ignoraSegundos = false): string {
  if (!data) {
    return '';
  }

  if (typeof data === 'string') {
    return data.substring(11, ignoraSegundos ? 16 : 19);
  }

  if (!data.getTime) {
    return '';
  }
  const strIsoDate = data.toISOString();
  return strIsoDate.substring(11, ignoraSegundos ? 16 : 19);
}

/**
 * Recebe um string contendo apenas números e devolve em formato de CPF
 *
 * @param cpf CPF contendo apenas números
 * @returns Retorna o CPF formatado
 */
export function formataCPF(cpf: string): string {
  // retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, '');

  // realizar a formatação...
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Recebe um string contendo apenas números e devolve em formato de CNPJ
 *
 * @param cnpj CNPJ contendo apenas números
 * @returns Retorna o CNPJ formatado
 */
export function formataCNPJ(cnpj: string): string {
  // retira os caracteres indesejados...
  cnpj = cnpj.replace(/[^\d]/g, '');

  // realizar a formatação...
  return cnpj.replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1 $2 $3/$4-$5');
}

/**
 * Valida CNPJ
 * @param strCNPJ CNPJ a ser validado
 * @param blankValid Flag que define se é para validar CNPJs vazios
 * @returns Retorna true se for valido
 */
export function validaCNPJ(strCNPJ?: string, blankValid = false): boolean {
  if (!strCNPJ && blankValid) {
    return true;
  }

  if (strCNPJ === undefined) {
    return false;
  }

  strCNPJ = strCNPJ.replace(/[^\d]+/g, '');

  if (strCNPJ === '') return false;

  if (strCNPJ.length !== 14) {
    return false;
  }

  // Elimina CNPJs invalidos conhecidos
  if (strCNPJ === '00000000000000') return false;

  // Valida DVs
  let tamanho = strCNPJ.length - 2;
  let numeros = strCNPJ.substring(0, tamanho);
  const digitos = strCNPJ.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  let i;
  for (i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }

  tamanho += 1;
  numeros = strCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1), 10)) {
    return false;
  }

  return true;
}

/**
 * Valida CPF
 * @param strCPF CPF a ser validado
 * @param blankValid Flag que define se é para validar CPFs vazios
 * @returns Retorna true se for valido
 */
export function validaCPF(strCPF: string | undefined | null, blankValid = false): boolean {
  if (!strCPF && blankValid) {
    return true;
  }
  if (!strCPF) {
    return false;
  }

  strCPF = strCPF.replace(/[^\d]+/g, '');
  let Soma;
  let Resto;
  Soma = 0;
  let i;
  if (!strCPF || strCPF === '00000000000' || strCPF === '') return false;

  for (i = 1; i <= 9; i++) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10), 10)) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false;
  return true;
}

/**
 * Cria um Date com horário de 00:00
 *
 * @returns Retorna uma data com horário de 00:00 usando o timezone do servidor
 */
export function newDateOnly(): Date {
  const date = formatDate(new Date(), 'yyyy-MM-dd');
  return new Date(`${date}T${padLeft(getTimeZoneOffSet().toString(), 2)}:00:00.000Z`);
}

/**
 * Cria um Date com horário de 00:00
 *
 * @returns Retorna uma data com horário de 00:00 usando o timezone do servidor
 */
export function newDateTimeEndOnly(): Date {
  const date = formatDate(new Date(), 'yyyy-MM-dd');
  return new Date(`${date}T${padLeft(getTimeZoneOffSet().toString(), 2)}:00:00.000Z`);
}

/**
 * Exclui arquivos temporários do App
 */
export async function deleteTemps(): Promise<void> {
  try {
    await FileSystem.deleteAsync(tempDir, { idempotent: true });
    await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });
  } catch (err) {
    //
  }
}

/**
 * Cria pasta tempo
 */
export async function makeTempDir(): Promise<void> {
  await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });
}

/**
 * Formata numeros no formato pt-BR
 */
export const { format: formatCurr } = new Intl.NumberFormat('pt-BR', {
  // style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export function formatFloat(value: number, digits = 2): string {
  const f = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return f.format(value);
}

/**
 * Valida password
 * @param pawword valor string a ser validado
 * @returns retorna true se o password for válido
 */
export function validatePassword(pawword?: string): boolean {
  if (!pawword) {
    return false;
  }
  let ret = false;
  const charsUpperCase = /[A-Za-z]/;
  // const charsLowerCase = /[a-z]/;
  const charsLowerCase = charsUpperCase;
  const numeros = /[0-9]/;
  // const caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
  const caracteresEspeciais = charsUpperCase;

  if (pawword.length > 10) {
    return ret;
  }

  if (pawword.length < 6) {
    return ret;
  }

  let auxUpperCase = 0;
  let auxLowerCase = 0;
  let auxNumber = 0;
  let auxEspecial = 0;
  for (let i = 0; i < pawword.length; i++) {
    if (charsUpperCase.test(pawword[i])) {
      auxUpperCase++;
    }
    if (charsLowerCase.test(pawword[i])) {
      auxLowerCase++;
    }
    if (numeros.test(pawword[i])) {
      auxNumber++;
    }
    if (caracteresEspeciais.test(pawword[i])) {
      auxEspecial++;
    }
  }

  if (auxUpperCase > 0) {
    if (auxLowerCase > 0) {
      if (auxNumber > 0) {
        if (auxEspecial) {
          ret = true;
        }
      }
    }
  }

  return ret;
}

/**
 * Valida um e-mail
 * @param email E-mail a ser validado
 * @returns retorna True se o e-mail for válido
 */
export function validateEmail(email?: string): boolean {
  if (!email) {
    return false;
  }
  const charsEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  if (charsEmail.test(email)) {
    return true;
  }

  return false;
}

export const downloadImageAndSharing = async (
  url: string,
  fileName: string,
  funcLoadig?: (loading: boolean) => void
): Promise<void> => {
  const fileUri = `${tempDir}/${fileName}`.replaceAll(' ', '-');

  try {
    if (funcLoadig !== undefined) {
      funcLoadig(true);
    }
    await FileSystem.downloadAsync(url.replaceAll(' ', '%20'), fileUri);
  } finally {
    if (funcLoadig !== undefined) {
      funcLoadig(false);
    }
  }

  await Sharing.shareAsync(fileUri);
};

export function RFValueSp(value: number): number {
  return RFValue(value);
  // return value * 1.2;
}

export function arredondaValor(value: number, casasDecimais: number): number {
  if (isNumber(value)) {
    return Number(value.toFixed(casasDecimais));
  }
  return 0;
}

export function verificaTokenExpirado(authContex: IAuthContextData): boolean {
  let retorno = true;
  if (
    !authContex.authInfo.expireIn ||
    authContex.authInfo.expireIn.getTime() < new Date().getTime()
  ) {
    retorno = false;
    Alert.alert(
      'Atenção',
      'Seu login expirou.',
      [
        {
          text: 'OK',
          onPress: async (): Promise<void> => {
            await deleteTemps();
            authContex.doLogout();
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  return retorno;
}
