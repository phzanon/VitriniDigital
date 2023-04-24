import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  constructor(private usuarioService: UsuarioService) { }
  ngOnInit(): void {
  }
  deslogar(){
    this.usuarioService.deslogar();
  }
}
