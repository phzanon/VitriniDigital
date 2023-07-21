import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router) { }

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
    localStorage.clear();
    if (this.formLogin.invalid) return;
    var usuario = this.formLogin.getRawValue() as IUsuario;

    this.usuarioService.autenticarUsuario(usuario).subscribe((response) => {
      localStorage.setItem('username', usuario.username);
      localStorage.setItem('password', usuario.password);
      localStorage.setItem('token', `${response.access_token}`);
      localStorage.setItem('login', 'OK');
      this.router.navigate(['home']);
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
