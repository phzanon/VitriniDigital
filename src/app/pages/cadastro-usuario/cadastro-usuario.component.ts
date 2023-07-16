import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { EstabelecimentosService } from 'src/app/services/estabelecimentos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent {

  formCadastro: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private estabelecimentoService: EstabelecimentosService) { }

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
      console.log(response.id);
      localStorage.setItem('id', response.id);
      localStorage.setItem('username', `${usuario.username}`);
      localStorage.setItem('password', `${usuario.password}`);
      this.usuarioService.autenticarUsuario({username: `${localStorage.getItem('username')}`, password: `${localStorage.getItem('password')}`}).subscribe((res) => {
        localStorage.setItem('token', res.access_token);
      });
      this.estabelecimentoService.registrarEstabelecimento();
    }, error => {
      this.snackBar.open('Falha na autenticação', 'Usuário já cadastrado', {
        duration: 3000
      });
      //this.usuarioService.login();
      return;
    });
  }

  inscrever() {
    var usuario = this.formCadastro.getRawValue() as IUsuario;

    console.log(usuario);
  }
}
