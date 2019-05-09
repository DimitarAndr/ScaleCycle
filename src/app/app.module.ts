import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';


//Ouxiang Lin
import { MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClientProfileComponent } from './client-profile/client-profile.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';

//Dimitar

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ClientProfileComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
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
