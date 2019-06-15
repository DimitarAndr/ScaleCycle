import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialogRef} from '@angular/material';
import {Globals} from '../globals/globals';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(public dialogRef: MatDialogRef<LoginComponent>, private route: ActivatedRoute,
              private http: HttpClient, private router: Router, private  authService: AuthenticationService,
              private globals: Globals, private toastr: ToastrService) {
  }


  @ViewChild('loginForm')
  loginForm: NgForm;

  onSubmit() {

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password).subscribe(user => {
      if (user[0] && user[0].username === username && user[0].password === password) {
        localStorage.setItem('user', JSON.stringify(user));

        if (user[0].role === 'Cliente') {
          this.router.navigate(['/SubmitHistory']);
          this.dialogRef.close();
        }
        if (user[0].role === 'Admin') {
          this.router.navigate(['/Admin']);
          this.dialogRef.close();
        }
      } else {
        this.toastr.warning('Invalid Username or Password');
      }
    }, () => this.toastr.warning('Invalid Username or Password'));

  }

}
