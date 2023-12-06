import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Estabelecimento } from 'src/app/model/estabelecimentos';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { CupomService } from 'src/app/services/cupom.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.css']
})
export class EstabelecimentosComponent {

  public estabelecimentos$: Observable<Estabelecimento[]> = new Observable();
  imageSource: any;
  imageUrl: string;

  @ViewChild('id-')
  id?: HTMLElement;

  constructor(private formBuilder: FormBuilder,
              private estabelecimentoService: EstabelecimentosService,
              private cupomService: CupomService,
              private sanitizer: DomSanitizer
              ){}

  ngOnInit(): void {
    this.estabelecimentos$ = this.estabelecimentoService.buscarEstabelecimentos();
    console.log(this.estabelecimentos$);
  }

  verificarId(id: string) {
    localStorage.setItem('idEstabelecimento', id);
    this.estabelecimentoService.mostrarDados();
  }

  redirecionarCupons(id: string) {
    localStorage.setItem('idEstabelecimento', id);
    this.cupomService.redirectExibirCupons();
  }

}
