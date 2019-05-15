import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
// Ouxiang Lin
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ClientProfileComponent} from './client-profile/client-profile.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {FooterComponent} from './footer/footer.component';
// Dimitar
import {AgmCoreModule} from '@agm/core';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {MapaComponent} from './mapa/mapa.component';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {FilterPipeModule} from 'ngx-filter-pipe';
import { PremiosComponent } from './premios/premios.component';

const rutas = [
  {path: '', component: HomeComponent},
  {path: 'Client', component: ClientProfileComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Mapa', component: MapaComponent},
  {path: 'Premios', component: PremiosComponent},
  // {path: '**', component: 404}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ClientProfileComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    MapaComponent,
    PremiosComponent
  ],
  imports: [
    RouterModule.forRoot(rutas),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule, // Ouxiang
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1LqPNfReHlA4RTAU1YOuVKZxTqvCPa0g'
    }),                         // Dimitar
    AgmSnazzyInfoWindowModule,  // Dimitar
    AgmJsMarkerClustererModule, // Dimitar
    FilterPipeModule,           // Dimitar


  ],
  entryComponents: [
    LoginComponent // Ouxiang
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
