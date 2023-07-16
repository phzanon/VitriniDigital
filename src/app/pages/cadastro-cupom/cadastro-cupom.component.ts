import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cupom } from 'src/app/model/Cupom';
import { Usuario } from 'src/app/model/Usuario';
import { CupomService } from 'src/app/services/cupom.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-cupom',
  templateUrl: './cadastro-cupom.component.html',
  styleUrls: ['./cadastro-cupom.component.css']
})
export class CadastroCupomComponent implements OnInit{

  formCupom: FormGroup;
  user: Usuario;

  today = new Date();
  changedDate = '';
  pipe = new DatePipe('en-US');
  dataValidade = new Date();

  constructor(private formBuilder: FormBuilder,
              private cupomService: CupomService,
              private usuarioService: UsuarioService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.criarForm();
  }

  criarForm() {
    this.formCupom = this.formBuilder.group({
      dataValidade: ['', [Validators.required]],
      desconto: ['', [Validators.required]],
      descricao: ['', [Validators.required]]
    });
  }

  salvarCupom() {
    if(this.formCupom.invalid) return;

    this.usuarioService.autenticarUsuario(
      {
        "username": `${localStorage.getItem('username')}`,
        "password": `${localStorage.getItem('password')}`
      }
    ).subscribe((response) => {
    });

    var cupom = this.formCupom.getRawValue() as Cupom;

    cupom.idEstabelecimento = `${localStorage.getItem('idEstabelecimento')}`;
    cupom.dataValidade = cupom.dataValidade + "T00:00"
    console.log(cupom);
    this.cupomService.salvarCupom(cupom);
    this.snackBar.open('Cupom', 'Cupom Cadastrado com sucesso', {
      duration: 3000
    });
  }
}
