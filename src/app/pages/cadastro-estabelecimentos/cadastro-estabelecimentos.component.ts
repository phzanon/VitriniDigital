import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-estabelecimentos',
  templateUrl: './cadastro-estabelecimentos.component.html',
  styleUrls: ['./cadastro-estabelecimentos.component.css']
})
export class CadastroEstabelecimentosComponent {

  formCadastro: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formCadastro = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  cadastrarNovoUsuario() {
    if(this.formCadastro.invalid) return;

    var usuario = this.formCadastro.getRawValue() as IUsuario;
    this.usuarioService.cadastrarNovoUsuario(usuario).subscribe((response) => {
      if(!response.sucesso) {
        this.snackBar.open('Falha no cadastro de usuario');
        this.usuarioService.login();
      }
    })
  }

  inscrever() {
    var usuario = this.formCadastro.getRawValue() as IUsuario;

    console.log(usuario);
  }
}
