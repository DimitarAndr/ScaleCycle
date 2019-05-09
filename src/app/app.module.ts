import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';

//Ouxiang Lin
import { MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClientProfileComponent } from './client-profile/client-profile.component';
import { LoginComponent } from './login/login.component';

//Dimitar


const rutas = [
  {path:'', component: HomeComponent},
  {path:'Client', component: ClientProfileComponent},
  //{path: '**', component: 404}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ClientProfileComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(rutas),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule, //Ouxiang
  ],
  entryComponents: [
    LoginComponent //Ouxiang
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
