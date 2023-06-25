import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService){}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
    });
  }

  onSearch() {
    if (!this.searchForm.valid) return;
    this.router.navigate(['search'], { queryParams: {query: this.searchForm.get('search')?.value}});
  }

  deslogar() {
    this.usuarioService.deslogar();
  }
}
