//components basicos
import { RouterModule, Routes } from '@angular/router';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//imports
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { GoogleMapsModule } from '@angular/google-maps';
import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//nossos components
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PrincipalComponent } from './pages/compartilhado/principal/principal.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { DadosEstabelecimentoComponent } from './pages/dados-estabelecimento/dados-estabelecimento.component';
import { RegistrarEstabelecimentoComponent } from './pages/registrar-estabelecimento/registrar-estabelecimento.component';
import { CadastroEstabelecimentosComponent } from './pages/cadastro-estabelecimentos/cadastro-estabelecimentos.component';

// const routes: Routes = [
//   { path: 'cadastro-cliente', component: DadosEstabelecimentoComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PrincipalComponent,
    EstabelecimentosComponent,
    CadastroEstabelecimentosComponent,
    DadosEstabelecimentoComponent,
    RegistrarEstabelecimentoComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    GoogleMapsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatDividerModule,
    NgbModule,
    // ReactiveFormsModule,
    // RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
