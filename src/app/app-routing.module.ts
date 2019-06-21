import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CartComponent} from './cart/cart.component';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {AdminProfileComponent} from './admin-profile/admin-profile.component';
import {RegisterChangeComponent} from './register-change/register-change.component';
import {RegisterComponent} from './register/register.component';
import {RegisterSubmitComponent} from './register-submit/register-submit.component';
import {EventAdminComponent} from './event-admin/event-admin.component';
import {PremiosComponent} from './premios/premios.component';
import {EventListComponent} from './event-list/event-list.component';
import {PremiosSingleComponent} from './premios-single/premios-single.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {ContactosComponent} from './contactos/contactos.component';
import {MapaComponent} from './mapa/mapa.component';
import {EventsComponent} from './events/events.component';
import {SubmitHistoryComponent} from './submit-history/submit-history.component';
import {ChangeHistoryComponent} from './change-history/change-history.component';
import {SettingClientComponent} from './setting-client/setting-client.component';
import {EventHistoryComponent} from './event-history/event-history.component';
import {ClaimListComponent} from './claim-list/claim-list.component';
import {ChartComponent} from './chart/chart.component';
import {AuthAdminGuard} from './guards/auth-admin.guard';
import {ClientProfileComponent} from './client-profile/client-profile.component';
import {EmployeeProfileComponent} from './employee-profile/employee-profile.component';
import {QrcodeComponent} from './qrcode/qrcode.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import {SettingComponent} from './setting/setting.component';
import {AuthClienteGuard} from './guards/auth-cliente.guard';
import {EventDetailComponent} from './event-detail/event-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'Mapa',
    component: MapaComponent
  },
  {
    path: 'Premios',
    component: PremiosComponent
  },
  {
    path: 'premiosSingle/:id',
    component: PremiosSingleComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthClienteGuard]
  },
  {
    path: 'Contactos',
    component: ContactosComponent
  },
  {
    path: 'Client',
    component: ClientProfileComponent,
    canActivate: [AuthClienteGuard]
  },
  {
    path: 'RegisterSubmit',
    component: RegisterSubmitComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'RegisterChange',
    component: RegisterChangeComponent
  },
  {
    path: 'Employee',
    component: EmployeeProfileComponent
  },
  {
    path: 'Admin',
    component: AdminProfileComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'Register',
    component: RegisterComponent
  },
  {
    path: 'activateAccount/:id',
    component: ActivateAccountComponent
  },
  {
    path: 'recoverPassword',
    component: RecoverPasswordComponent
  },
  {
    path: 'recoverPassword/:username',
    component: RecoverPasswordComponent
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'settingClient',
    component: SettingClientComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'EmployeeList',
    component: EmployeeListComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'EventAdmin',
    canActivate: [AuthAdminGuard],
    component: EventAdminComponent
  },
  {
    path: 'ClaimList',
    component: ClaimListComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'SubmitHistory',
    component: SubmitHistoryComponent
  },
  {
    path: 'ChangeHistory',
    component: ChangeHistoryComponent,
    canActivate: [AuthClienteGuard]
  },
  {
    path: 'EventHistory',
    component: EventHistoryComponent
  },
  {
    path: 'EventList',
    component: EventListComponent,
    canActivate: [AuthClienteGuard]
  },
  {
    path: 'Events',
    component: EventsComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: 'qrcode',
    component: QrcodeComponent,
    canActivate: [AuthClienteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
