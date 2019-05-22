import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
//Ouxiang Lin
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClientProfileComponent} from './client-profile/client-profile.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {EmployeeProfileComponent} from './employee-profile/employee-profile.component';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import {RegisterSubmitComponent} from './register-submit/register-submit.component';
import {RegisterChangeComponent} from './register-change/register-change.component';
import {Globals} from './globals/globals';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import { SettingComponent } from './setting/setting.component';
import { SettingClientComponent } from './setting-client/setting-client.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EventAdminComponent } from './event-admin/event-admin.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ParticipateDetailComponent } from './participate-detail/participate-detail.component';
import { NewEventComponent } from './new-event/new-event.component';
//Dimitar
import {FooterComponent} from './footer/footer.component';
import {AgmCoreModule} from '@agm/core';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {MapaComponent} from './mapa/mapa.component';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
//import {FilterPipeModule} from 'ngx-filter-pipe';
import {PremiosComponent} from './premios/premios.component';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ContactosComponent} from './contactos/contactos.component';
import {MatIconModule} from '@angular/material/icon';
import {Estacion} from './model/Estacion';
import {Premio} from './model/Premio';
import {PremiosChildComponent} from './premios/premios-child/premios-child.component';


const rutas = [
  {path: '', component: HomeComponent},
  {path: 'Mapa', component: MapaComponent},
  {
    path: 'Premios', component: PremiosComponent,
    children: [
      {path: 'detail/:id', component: PremiosChildComponent}
      ]
  },
  {path: 'Contactos', component: ContactosComponent},
  {path: 'Client', component: ClientProfileComponent},
  {path: 'RegisterSubmit', component: RegisterSubmitComponent},
  {path: 'RegisterChange', component: RegisterChangeComponent},
  {path: 'Employee', component: EmployeeProfileComponent},
  {path: 'Admin', component: AdminProfileComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'activateAccount/:id', component: ActivateAccountComponent},
  {path: 'recoverPassword', component: RecoverPasswordComponent},
  {path: 'recoverPassword/:username', component: RecoverPasswordComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'settingClient', component: SettingClientComponent},
  {path: 'EmployeeList', component: EmployeeListComponent},
  {path: 'EventAdmin', component: EventAdminComponent},
  {path: 'recoverPassword/:username', component: RecoverPasswordComponent}
  //{path: '**', component: 404}
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
    PremiosComponent,
    FooterComponent,
    EmployeeProfileComponent,
    AdminProfileComponent,
    RegisterSubmitComponent,
    RegisterChangeComponent,
    ActivateAccountComponent,
    RecoverPasswordComponent,
    SettingComponent,
    SettingClientComponent,
    EmployeeListComponent,
    EventAdminComponent,
    ContactosComponent,
    PremiosChildComponent,
    EventDetailComponent,
    ParticipateDetailComponent,
    NewEventComponent
  ],
  imports: [
    RouterModule.forRoot(rutas),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,             //Ouxiang
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1LqPNfReHlA4RTAU1YOuVKZxTqvCPa0g'
    }),                         // Dimitar
    AgmSnazzyInfoWindowModule,  // Dimitar
    AgmJsMarkerClustererModule, // Dimitar
    //FilterPipeModule,           // Dimitar
    DataTablesModule,
    //FilterPipeModule,           // Dimitar
    ReactiveFormsModule,        // Dimitar
    MatInputModule,             // Dimitar
    MatAutocompleteModule,      // Dimitar
    MatFormFieldModule,         // Dimitar
    MatButtonModule,             // Dimitar
    MatIconModule
  ],
  entryComponents: [
    LoginComponent, // Ouxiang
    EventDetailComponent,
    ParticipateDetailComponent,
    NewEventComponent
  ],
  providers: [Globals, Estacion, Premio],
  bootstrap: [AppComponent]
})
export class AppModule {
}
