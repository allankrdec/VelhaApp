/**
 * Modulo contendo interfaces e types
 * @module Interface/Type
 * @category Interface/Type
 */

import { UsuarioModel } from '../models';

/**
 * Definição para os tipos possíveis de Buttom
 */
export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'danger-ligth'
  | 'success'
  | 'success-ligth'
  | 'secondary-ligth';

/**
 * Interface usada com dados de versão da API
 */
export interface IApiInfo {
  versionNumber: number;
  version: string;
  appPedidoRestrito?: string;
  appPedidoRestritoClientes?: string;
}

/**
 * Interface que representa dados da API e dados do usuário autenticado
 */
export interface IAuthInfo {
  isAuthenticated: boolean;
  usuario?: UsuarioModel | null;
  email?: string;
  token?: string;
  expireIn?: Date;
  expireInH?: string;
  roles?: string[];
  apiInfo?: IApiInfo;
}

/**
 * Interface que representa obj de configuracao de login
 */

export interface ILoginStorage {
  salvarSenha: boolean;
  email: string;
  senha: string;
}

export interface ITitulo {
  titulo: string;
  dataEmissao: Date;
  dataVencimento: Date;
  statusParcela: string;
  pedido: string;
  valor: number;
  valorDesconto: number;
  valorJuro: number;
  valorRecebido: number;
  valorReceber: number;
}

export interface IPedido {
  dataEmissao: Date;
  pedCliente: string;
  dataProducao?: Date;
  dataEntrega?: Date;
  pecas: Date;
  pedido: string;
  valor: number;
  status: string;
  agendaRetira?: boolean;
}

export interface IItemPedido {
  id: string;
  nrOf: string;
  descricao: string;
  altura: number;
  largura: number;
  statusItem: string;
  qtdeRomaneios: number;
  valorTotal?: number;
  qtde?: number;
  qtdePecas?: number;
}

export interface IGaleria {
  id: number;
  idTipo: number;
  idCliente: number;
  nomeArquivo: string;
  dataHoraCriacao: Date;
  fantasiaCliente: string;
  url: string;
  descricao: string;
  showImagem?: boolean;
}

export interface IRomaneio {
  id: number;
  romaneio: number;
  idCliente: number;
  data: Date;
  arquivo: string;
  nomeArquivo: string;
}

export interface IMensagem {
  codigo: number;
  dataHoraCriacao: Date;
  dataHoraEntrega: Date | null;
  dataHoraLida: Date | null;
  mensagem: string;
  codigoUsuario: number;
}

export interface IItemPedidoNovo {
  altura: number;
  aplicacao?: string;
  caixilhoFuracao?: string;
  codigoCalculo?: string;
  cor?: number;
  corte?: string;
  valorCusto: number;
  dataEntrega?: string;
  descricao: string;
  diametro?: number;
  espessura?: number;
  fator?: number;
  fatorCond?: number;
  favorConvVenda?: number;
  folgaAltura?: number;
  folgaLargura?: number;
  forno?: string;
  forno2?: string;
  furacao?: string;
  numeroItem?: number;
  jato?: string;
  laminacao?: string;
  laminado?: string;
  lapidacaoLamin?: string;
  largura?: number;
  marcacao?: string;
  otimizacao?: string;
  processo?: string;
  codigo: string;
  qtdePecas: number;

  qtde: number;
  qtdeM2: number;
  tabelaPreco?: number;
  transacao?: number;
  unidade?: string;
  valor: number;
  valorPraticado?: number;
  valorReal?: number;
  valorSemAcrescimo?: number;
  valorTotal: number;
  areaMinima?: number;
  tipo: string;
  peso?: number;
  pesoLiquido?: number;

  precoVenda1?: number;
  precoVenda2?: number;
  precoVenda3?: number;
  precoVenda4?: number;
  precoVenda5?: number;
  precoVenda6?: number;
  alturaArredondada?: number;
  larguraArredondada?: number;
}

export interface IPedidoNovo {
  numeroPedido?: string;
  dataEmissao: Date;
  codigoCliente?: number;
  codigoUsuario?: number;
  numeroPedidoCliente?: string;
  entregaRetira?: string;
  previsaoEntrega?: Date | null;
  valorSubtotal?: number;
  valorTotalProdutos?: number;
  valorTotal?: number;
  valorTotalCusto?: number;
  totalPeso?: number;
  totalM2?: number;
  codigoModeloNf?: string;

  itens: IItemPedidoNovo[];
}

export interface IFiliais {
  codigo?: number;
  razaoSocial?: string;
  cnpj?: string;
  descricao?: string;
  apelido?: string;
}
