import { Cupom } from "./Cupom";

export interface Endereco {
  id: number;
  logradouro: string;
  cep: string;
  complemento: string;
  numero: string;
  pontoReferencia: string;
  cidade: string;
  bairro: string;
  uf: string;
  latitude: number;
  longitude: number;
}
