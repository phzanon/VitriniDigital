import { Endereco } from "./endereco";
import { Portfolio } from "./portfolio";

export interface Estabelecimento {
    id: number;
    nome: string;
    email: string;
    telefone1: string;
    telefone2: string;
    endereco: Endereco;
    portfolio: Portfolio;
}