import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

 constructor(private usuarioService: UsuarioService) {

 }

  ngOnInit(): void {
    this.teste$
  }

  inicio() {
    this.usuarioService.paginaPrincipal();
  }
}
