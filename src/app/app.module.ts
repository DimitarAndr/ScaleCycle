import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavMainComponent} from './navbar/nav-main/nav-main.component';
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
import {SettingComponent} from './setting/setting.component';
import {SettingClientComponent} from './setting-client/setting-client.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EventAdminComponent} from './event-admin/event-admin.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {ParticipateDetailComponent} from './participate-detail/participate-detail.component';
import {NewEventComponent} from './new-event/new-event.component';
import {ClaimListComponent} from './claim-list/claim-list.component';
import {ClaimDetailComponent} from './claim-detail/claim-detail.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {SubmitHistoryComponent} from './submit-history/submit-history.component';
import {ChangeHistoryComponent} from './change-history/change-history.component';
import {EventHistoryComponent} from './event-history/event-history.component';
import {SubmitDetailComponent} from './submit-detail/submit-detail.component';
import {EventListComponent} from './event-list/event-list.component';
import {QrcodeComponent} from './qrcode/qrcode.component';
import {QRCodeModule} from 'angularx-qrcode';
import {FooterComponent} from './footer/footer.component';
import {AgmCoreModule} from '@agm/core';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {MapaComponent} from './mapa/mapa.component';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {PremiosComponent} from './premios/premios.component';
import {MatAutocompleteModule, MatInputModule} from '@angular/material';
import {ContactosComponent} from './contactos/contactos.component';
import {Estacion} from './model/Estacion';
import {Premio} from './model/Premio';
import {PremiosSingleComponent} from './premios-single/premios-single.component';
import {CartComponent} from './cart/cart.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EventsComponent} from './events/events.component';
import {ToastrModule} from 'ngx-toastr';
import {ChartComponent} from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import {NavAdminComponent} from './navbar/nav-admin/nav-admin.component';
import {Participation} from './model/Participation';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMainComponent,
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
    PremiosSingleComponent,
    CartComponent,
    ClaimListComponent,
    ClaimDetailComponent,
    EventDetailComponent,
    NewEventComponent,
    ParticipateDetailComponent,
    EmployeeDetailComponent,
    SubmitHistoryComponent,
    ChangeHistoryComponent,
    EventHistoryComponent,
    SubmitDetailComponent,
    EventListComponent,
    EventsComponent,
    ClaimListComponent,
    EventsComponent,
    ChartComponent,
    QrcodeComponent,
    NavAdminComponent

  ],
  imports: [
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
    DataTablesModule,
    ReactiveFormsModule,        // Dimitar
    MatInputModule,             // Dimitar
    MatAutocompleteModule,      // Dimitar
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    ChartsModule,
    QRCodeModule

  ],
  entryComponents: [
    LoginComponent, // Ouxiang
    EventDetailComponent,
    NewEventComponent,
    ClaimDetailComponent,
    ParticipateDetailComponent,
    EmployeeDetailComponent,
    SubmitDetailComponent
  ],

  providers: [Globals, Estacion, Premio],
  bootstrap: [AppComponent]
})
export class AppModule {
}
