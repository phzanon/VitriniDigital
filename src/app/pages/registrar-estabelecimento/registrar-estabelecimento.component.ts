import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstabelecimentoDto } from 'src/app/model/estabelecimentos';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';
import { Router } from '@angular/router';
import { CupomService } from 'src/app/services/cupom.service';

@Component({
  selector: 'app-registrar-estabelecimento',
  templateUrl: './registrar-estabelecimento.component.html',
  styleUrls: ['./registrar-estabelecimento.component.css']
})
export class RegistrarEstabelecimentoComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private estabelecimentoService: EstabelecimentosService,
    private router: Router,
    private cupomService: CupomService
  ) { }

  formRegistro: FormGroup;
  selectedOption: string;
  options = [
    { name: "Acre", value: "AC"},
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

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formRegistro = this.formBuilder.group({
      nome: ['', [Validators.required]],
      tipoEstabelecimento: ['', [Validators.required]],
      telefone1: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      cep: ['', [Validators.required]]
    });
  }

  salvar() {

    if (this.formRegistro.invalid) return;

    var estabelecimentoDto = this.formRegistro.getRawValue() as EstabelecimentoDto;
    estabelecimentoDto.uf = this.selectedOption;
    console.log(estabelecimentoDto);
    this.estabelecimentoService.salvarEstabelecimento(estabelecimentoDto)
                               .subscribe((response) => {
                                localStorage.setItem('idEstabelecimento', response.id)
                               });

    this.cupomService.redirectCadastroCupom();
  }

  voltar() {
    this.router.navigate(['home']);
  }
}
