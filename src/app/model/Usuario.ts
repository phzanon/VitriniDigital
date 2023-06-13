export interface Usuario {
  id: string;
  nome: string;
  sobreNome: string;
  userName: string;
  password: string;
  ativo: string;
  estabelecimento: DadosEstabelecimento
}

export interface DadosEstabelecimento {
  id: string;
  idTipoEstabelecimento: number;
  nome: string;
  telefone1: string;
  telefone2: string;
  endereco: string;
  portfolio: string;
  cupons: string;
}
