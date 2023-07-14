import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/guards/auth.guard';
import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { DadosEstabelecimentoComponent } from './pages/dados-estabelecimento/dados-estabelecimento.component';
import { RegistrarEstabelecimentoComponent } from './pages/registrar-estabelecimento/registrar-estabelecimento.component';
import { CupomComponent } from './pages/cupons/cupom.component';
import { CadastroCupomComponent } from './pages/cadastro-cupom/cadastro-cupom.component';
import { MostrarDadosComponent } from './pages/mostrar-dados/mostrar-dados.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'estabelecimentos', component: EstabelecimentosComponent },
  { path: 'cupons', component: CupomComponent },
  { path: 'dados-estabelecimento', component: DadosEstabelecimentoComponent, canActivate: [AuthGuard]},
  { path: 'registrar-estabelecimento', component: RegistrarEstabelecimentoComponent, canActivate: [AuthGuard]},
  { path: 'cadastro-cupom', component: CadastroCupomComponent, canActivate: [AuthGuard]},
  { path: 'mostrar-dados', component: MostrarDadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
