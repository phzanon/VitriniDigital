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

// const routes: Routes = [
//   { path: 'login', component: LoginComponent},
//   {
//     path: '', component: PrincipalComponent
//   },
//   { path: 'estabelecimentos', component: EstabelecimentosComponent,
//     children: [
//       { path: '', component: HomeComponent}
//     ]
//   },
//   { path: 'home', component: HomeComponent, canActivate: [UsuarioAutenticadoGuard],
//     children: [
//       { path: '', component: HomeComponent}
//     ]
//   },
//   { path: 'cadastro-estabelecimento', component: CadastroEstabelecimentosComponent, canActivate: [UsuarioAutenticadoGuard],
//     children: [
//       { path: '', component: HomeComponent}
//     ]
//   },
//   { path: 'dados-estabelecimento', component: DadosEstabelecimentoComponent, canActivate: [UsuarioAutenticadoGuard],
//     children: [
//       { path: '', component: HomeComponent}
//     ]
//   },
//   { path: 'registrar-estabelecimento', component: RegistrarEstabelecimentoComponent, canActivate: [UsuarioAutenticadoGuard],
//     children: [
//       { path: '', component: HomeComponent}
//     ]
//   }
// ];

const routes: Routes = [
  { path: '', redirectTo: '/registrar-estabelecimento', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-estabelecimento', component: CadastroEstabelecimentosComponent },
  { path: 'estabelecimentos', component: EstabelecimentosComponent },
  { path: 'cupons', component: CupomComponent },
  { path: 'dados-estabelecimento', component: DadosEstabelecimentoComponent},
  { path: 'registrar-estabelecimento', component: RegistrarEstabelecimentoComponent},
  { path: 'cadastro-cupom', component: CadastroCupomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
