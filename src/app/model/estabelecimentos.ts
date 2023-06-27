import { Endereco } from "./endereco";
import { Portfolio } from "./portfolio";

export interface Estabelecimento {
  id: string;
  idTipoEstabelecimento: number,
  nome: string;
  email: string;
  telefone1: string;
  telefone2: string;
  endereco: Endereco;
  portfolio: Portfolio;
}

export interface EstabelecimentoDto {
  nome: string;
  tipoEstabelecimento: number;
  telefone1: string;
  telefone2: string;
  logradouro: string;
  cep: string;
  complemento: string;
  numero: string;
  pontoReferencia: string;
  cidade: string;
  bairro: string;
  uf: string;
  link: string;
}
