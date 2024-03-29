import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/model/Usuario';
import { Estabelecimento } from 'src/app/model/estabelecimentos';
import { CupomService } from 'src/app/services/cupom.service';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dados-estabelecimento',
  templateUrl: './dados-estabelecimento.component.html',
  styleUrls: ['./dados-estabelecimento.component.css']
})
export class DadosEstabelecimentoComponent {

  formDadosEstabelecimento: FormGroup;
  selectedOption: string;
  options = [
    { name: "Acre", value: "AC" },
    { name: "Alagoas", value: "AL" },
    { name: "Amapá", value: "AP" },
    { name: "Amazonas", value: "AM" },
    { name: "Bahia", value: "BA" },
    { name: "Ceará", value: "CE" },
    { name: "Brasília", value: "DF" },
    { name: "Espirito Santo", value: "ES" },
    { name: "Goiás", value: "GO" },
    { name: "Maranhão", value: "MA" },
    { name: "Mato Grosso do Sul", value: "MS" },
    { name: "Mato Grosso", value: "MT" },
    { name: "Minas Gerais", value: "MG" },
    { name: "Pará", value: "PA" },
    { name: "Paraíba", value: "PB" },
    { name: "Paraná", value: "PR" },
    { name: "Pernambuco", value: "PE" },
    { name: "Piauí", value: "PI" },
    { name: "Rio de Janeiro", value: "RJ" },
    { name: "Rio Grande do Norte", value: "RN" },
    { name: "Rio Grande do Sul", value: "RS" },
    { name: "Rondônia", value: "RO" },
    { name: "Roraima", value: "RR" },
    { name: "Santa Catarina", value: "SC" },
    { name: "São Paulo", value: "SP" },
    { name: "Sergipe", value: "SE" },
    { name: "Tocantins", value: "TO" },
    { name: "Selecione", value: "" }
  ]

  public usuarios$: Usuario[] = [];
  public estabelecimento: Estabelecimento;

  constructor(private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private cupomService: CupomService,
    private estabelecimentoService: EstabelecimentosService) {
  }

  ngOnInit(): void {

    let username = localStorage.getItem("username")?.toString();

    if (username != undefined) {
      var user = this.usuarioService.buscarUsuario(username, '');
      //console.log(user);
      user.subscribe((usuario) => {
        console.log(usuario);
        this.usuarios$.push(usuario);
        localStorage.setItem('idUsuario', `${usuario.id}`);
        localStorage.setItem('idEstabelecimento', `${usuario.estabelecimento.id}`);
        this.criarForm(usuario);
        this.estabelecimento = usuario.estabelecimento;
      });
    }
  }

  inicio() {
    this.usuarioService.paginaPrincipal();
  }

  criarForm(est: Usuario) {
    this.formDadosEstabelecimento = this.formBuilder.group({
      nome: [est.estabelecimento.nome, [Validators.required]],
      tipoEstabelecimento: [est.estabelecimento.idTipoEstabelecimento, [Validators.required]],
      telefone1: [est.estabelecimento.telefone1, [Validators.required]],
      telefone2: [est.estabelecimento.telefone2, [Validators.required]],
      logradouro: [est.estabelecimento.endereco.logradouro, [Validators.required]],
      //cep: [est.estabelecimento.endereco.cep, [Validators.required]],
      complemento: [est.estabelecimento.endereco.complemento, [Validators.required]],
      numero: [est.estabelecimento.endereco.numero, [Validators.required]],
      pontoReferencia: [est.estabelecimento.endereco.pontoReferencia, [Validators.required]],
      cidade: [est.estabelecimento.endereco.cidade, [Validators.required]],
      bairro: [est.estabelecimento.endereco.bairro, [Validators.required]],
      uf: [est.estabelecimento.endereco.uf, [Validators.required]]
    });
  }

  cadastrarCupom() {
    this.cupomService.redirectCadastroCupom();
  }

  atualizarCadastro() {
    var estabelecimento = this.formDadosEstabelecimento.getRawValue();
    console.log(this.estabelecimento);
    let estAtualizado = this.estabelecimento;
    estAtualizado.nome = estabelecimento.nome;
    estAtualizado.idTipoEstabelecimento = estabelecimento.idTipoEstabelecimento;
    estAtualizado.telefone1 = estabelecimento.telefone1;
    estAtualizado.telefone2 = estabelecimento.telefone2;
    estAtualizado.endereco.logradouro = estabelecimento.logradouro;
    //estAtualizado.endereco.cep = estabelecimento.cep;
    estAtualizado.endereco.complemento = estabelecimento.complemento;
    estAtualizado.endereco.numero = estabelecimento.numero;
    estAtualizado.endereco.pontoReferencia = estabelecimento.pontoReferencia;
    estAtualizado.endereco.cidade = estabelecimento.cidade;
    estAtualizado.endereco.uf = this.selectedOption;

    estAtualizado.portfolio.id = 213;
    estAtualizado.idTipoEstabelecimento = 1;

    console.log(estAtualizado);

    this.estabelecimentoService.atualizarEstabelecimento(estAtualizado);
    //timeout(3000);
    //location.reload();
  }
}
