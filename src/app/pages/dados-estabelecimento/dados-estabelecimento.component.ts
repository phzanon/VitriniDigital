import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { Estabelecimento } from 'src/app/model/estabelecimentos';
import { CupomService } from 'src/app/services/cupom.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dados-estabelecimento',
  templateUrl: './dados-estabelecimento.component.html',
  styleUrls: ['./dados-estabelecimento.component.css']
})
export class DadosEstabelecimentoComponent {

  formDadosEstabelecimento: FormGroup;


  public teste$ = [{
    "id":2,
    "nome":"string",
    "email":"user@example.com",
    "telefone1":"string",
    "telefone2":"string",
    "endereco":{
       "id":3,
       "logradouro":"string",
       "cep":"string",
       "complemento":"string",
       "numero":"string",
       "pontoReferencia":"string",
       "cidade":"string",
       "bairro":"string",
       "uf":"ss",
       "latitude":"string",
       "longitude":"string"
    },
    "portfolio":null
 }];

 public usuarios$: Usuario[] = [];
 public teste2$: Observable<Usuario[]> = new Observable();
 constructor(private usuarioService: UsuarioService,
  private formBuilder: FormBuilder,
  private cupomService: CupomService) {

 }

  ngOnInit(): void {
    this.criarForm();
    let username = localStorage.getItem("username")?.toString();

    if(username != undefined) {
      var user = this.usuarioService.buscarUsuario(username ,'');
      console.log(user);
      user.subscribe((usuario) => {
        this.usuarios$.push(usuario);
        localStorage.setItem('idUsuario', `${usuario.id}`);
        localStorage.setItem('idEstabelecimento', `${usuario.estabelecimento.id}`);
      });
      console.log(this.usuarios$);
    }
  }

  inicio() {
    this.usuarioService.paginaPrincipal();
  }

  criarForm() {
    this.formDadosEstabelecimento = this.formBuilder.group({
      nome: ['', [Validators.required]],
      tipoEstabelecimento: ['', [Validators.required]],
      telefone1: ['', [Validators.required]],
      telefone2: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      pontoReferencia: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      uf: ['', [Validators.required]]
    });
  }

  cadastrarCupom() {
    this.cupomService.redirectCadastroCupom();
  }
}
