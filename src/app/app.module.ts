import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';

//Ouxiang Lin
import { MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClientProfileComponent } from './client-profile/client-profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { RegisterSubmitComponent } from './register-submit/register-submit.component';
import { RegisterChangeComponent } from './register-change/register-change.component';
import { Globals } from './globals/globals';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

//Dimitar
import { FooterComponent } from './footer/footer.component';


const rutas = [
  {path:'', component: HomeComponent},
  {path:'Client', component: ClientProfileComponent},
  {path:'RegisterSubmit', component: RegisterSubmitComponent},
  {path:'RegisterChange', component: RegisterChangeComponent},
  {path:'Employee', component: EmployeeProfileComponent},
  {path:'Admin', component: AdminProfileComponent},
  {path:'Register', component: RegisterComponent},
  {path:'activateAccount/:id', component: ActivateAccountComponent},
  {path:'recoverPassword', component: RecoverPasswordComponent},
  {path:'recoverPassword/:username', component: RecoverPasswordComponent},
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
    EmployeeProfileComponent,
    AdminProfileComponent,
    RegisterSubmitComponent,
    RegisterChangeComponent,
    ActivateAccountComponent,
    RecoverPasswordComponent
  ],
  imports: [
    RouterModule.forRoot(rutas),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule, //Ouxiang
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    LoginComponent //Ouxiang
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule {
}
