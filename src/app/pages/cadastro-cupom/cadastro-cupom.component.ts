import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cupom } from 'src/app/model/Cupom';
import { Usuario } from 'src/app/model/Usuario';
import { CupomService } from 'src/app/services/cupom.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-cadastro-cupom',
  templateUrl: './cadastro-cupom.component.html',
  styleUrls: ['./cadastro-cupom.component.css']
})
export class CadastroCupomComponent implements OnInit{

  formCupom: FormGroup;
  user: Usuario;

  constructor(private formBuilder: FormBuilder,
              private cupomService: CupomService,
              private usuarioService: UsuarioService) {
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
    //if(this.formCupom.invalid) return;

    var cupom = this.formCupom.getRawValue() as Cupom;
    /*this.usuarioService.buscarUsuario(`${localStorage.getItem('username')}`, `${localStorage.getItem('password')}`).subscribe(
      (response: Usuario) => {
        console.log(response);
        this.user = response;
      }
    );*/
    cupom.idEstabelecimento = `${localStorage.getItem('idEstabelecimento')}`;
    console.log(cupom);
    //this.cupomService.salvarCupom(cupom);
  }
}
