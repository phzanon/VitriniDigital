import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstabelecimentoDto } from 'src/app/model/estabelecimentos';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';

@Component({
  selector: 'app-registrar-estabelecimento',
  templateUrl: './registrar-estabelecimento.component.html',
  styleUrls: ['./registrar-estabelecimento.component.css']
})
export class RegistrarEstabelecimentoComponent implements OnInit{

  formRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private estabelecimentoService: EstabelecimentosService,
          ) {}

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formRegistro = this.formBuilder.group({
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
      uf: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });
  }

  salvar() {
    if(this.formRegistro.invalid) return;

    var estabelecimentoDto = this.formRegistro.getRawValue() as EstabelecimentoDto;

    this.estabelecimentoService.salvarEstabelecimento(estabelecimentoDto).subscribe((response) => {

    });

    this.estabelecimentoService.redirectDados();
  }
}
