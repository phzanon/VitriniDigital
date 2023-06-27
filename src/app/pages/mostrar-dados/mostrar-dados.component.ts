import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/model/estabelecimentos';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';

@Component({
  selector: 'app-mostrar-dados',
  templateUrl: './mostrar-dados.component.html',
  styleUrls: ['./mostrar-dados.component.css']
})
export class MostrarDadosComponent implements OnInit{

  public usuarios$: Estabelecimento[] = [];

  constructor(private estabelecimentoService: EstabelecimentosService){}

  ngOnInit(): void {
    var est = this.estabelecimentoService.buscarEstabelecimentoPorId(`${localStorage.getItem('idEstabelecimento')}`).subscribe(
      (res) => {
        this.usuarios$.push(res);
      }
    );
  }

}
