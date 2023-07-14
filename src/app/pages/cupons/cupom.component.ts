import { Component } from '@angular/core';
import { Cupom } from 'src/app/model/Cupom';
import { Estabelecimento } from 'src/app/model/estabelecimentos';
import { CupomService } from 'src/app/services/cupom.service';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.component.html',
  styleUrls: ['./cupom.component.css']
})
export class CupomComponent {

  public estabelecimento: Estabelecimento;
  public estabelecimentos$: Observable<Estabelecimento[]> = new Observable();
  public cupons$: Observable<Cupom[]> = new Observable();

  constructor(private cupomService: CupomService,
              private estabelecimentoService: EstabelecimentosService){
  }

  ngOnInit() {
    this.estabelecimentoService.buscarEstabelecimentoPorId(`${localStorage.getItem('idEstabelecimento')}`).subscribe(
      (res) => {
        this.estabelecimento = res;
      }
    );

    this.cupons$ = this.cupomService.buscarCupons();
  };


}
