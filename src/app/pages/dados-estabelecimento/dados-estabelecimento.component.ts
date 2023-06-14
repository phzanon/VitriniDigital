import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { Estabelecimento } from 'src/app/model/estabelecimentos';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dados-estabelecimento',
  templateUrl: './dados-estabelecimento.component.html',
  styleUrls: ['./dados-estabelecimento.component.css']
})
export class DadosEstabelecimentoComponent {
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
 constructor(private usuarioService: UsuarioService) {

 }

  ngOnInit(): void {
    let username = localStorage.getItem("username")?.toString();

    if(username != undefined) {
      var user = this.usuarioService.buscarUsuario(username ,'');
      console.log(user);
      user.subscribe((usuario) => { this.usuarios$.push(usuario)});
      console.log(this.usuarios$);
    }
  }

  inicio() {
    this.usuarioService.paginaPrincipal();
  }
}
