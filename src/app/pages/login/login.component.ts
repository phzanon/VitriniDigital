import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/usuario.service';
import { catchError } from 'rxjs';
import { Token } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  logar() {
    if (this.formLogin.invalid) return;
    var usuario = this.formLogin.getRawValue() as IUsuario;

    this.usuarioService.logar(usuario).subscribe((response) => {
      localStorage.setItem('username', usuario.username);
      localStorage.setItem('password', usuario.password);
      localStorage.setItem('token', `${response.access_token}`);
      this.usuarioService.dadosUsuario();
    }, error => {
      this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
        duration: 3000
      });
    })
  }

  recuperarSenha() {
    var usuario = this.formLogin.getRawValue() as IUsuario;
    if (usuario.username.length != 0) {
      this.usuarioService.recuperarSenha(usuario);
      this.snackBar.open('E-mail de recuperação de senha enviado para', usuario.username, {
        duration: 9000
      });
    }
    else {
      this.snackBar.open('E-mail inválido', 'Informe o e-mail no campo E-mail', {
        duration: 6000
      });
    }
  }

  cadastroNovoUsuario() {
    this.usuarioService.cadastroNovoUsuario();
  }
}
