import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { CadastroEstabelecimentosComponent } from './pages/cadastro-estabelecimentos/cadastro-estabelecimentos.component';
import { DadosEstabelecimentoComponent } from './pages/dados-estabelecimento/dados-estabelecimento.component';
import { RegistrarEstabelecimentoComponent } from './pages/registrar-estabelecimento/registrar-estabelecimento.component';
import { CupomComponent } from './pages/cupons/cupom.component';
import { CadastroCupomComponent } from './pages/cadastro-cupom/cadastro-cupom.component';
import { MostrarDadosComponent } from './pages/mostrar-dados/mostrar-dados.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-estabelecimento', component: CadastroEstabelecimentosComponent },
  { path: 'estabelecimentos', component: EstabelecimentosComponent },
  { path: 'cupons', component: CupomComponent },
  { path: 'dados-estabelecimento', component: DadosEstabelecimentoComponent},
  { path: 'registrar-estabelecimento', component: RegistrarEstabelecimentoComponent},
  { path: 'cadastro-cupom', component: CadastroCupomComponent},
  { path: 'mostrar-dados', component: MostrarDadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
