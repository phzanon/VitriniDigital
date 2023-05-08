import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Estabelecimento } from 'src/app/model/estabelecimentos';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.css']
})
export class EstabelecimentosComponent {

  public estabelecimentos$: Estabelecimento[] = [];
  public teste$: Observable<Estabelecimento[]> = new Observable();

  constructor(private formBuilder: FormBuilder,
              private estabelecimentoService: EstabelecimentosService
              ){}

  ngOnInit(): void {
    var est = this.estabelecimentoService.buscarEstabelecimentos();
    est.subscribe(
      (estabelecimento) => {
        this.estabelecimentos$ = (estabelecimento);
      }
    );
    this.teste$ = this.estabelecimentoService.buscarEstabelecimentos();
  }


}
