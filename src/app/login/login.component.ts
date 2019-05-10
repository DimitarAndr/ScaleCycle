import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>,private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  user = {
		"username": "",
		"password": "",
		"type": ""
	};
	loginStatud:boolean;
	msgError:string;
	session = {
		"userId":"",
		"userName":"",
		"userLastName":"",
		"userType":"",
		"userState":""
	};
  ngOnInit() {

  }
  onSubmit(){
  	this.http.post('http://localhost/M12/login', this.user).subscribe(data => {
			if (data['error']) {
				this.loginStatud = false;
				this.msgError = data['error'].text;
			}else{
				this.loginStatud = true;
				this.msgError = null;

				this.session.userId = data[0]["Id"];
				this.session.userName = data[0]["Nombre"];
				this.session.userLastName = data[0]["Apellido"];
				this.session.userType = this.user["type"];
				this.session.userState = data[0]["Estado"];
				sessionStorage.setItem('user',JSON.stringify(this.session));
				//console.log(JSON.parse(sessionStorage.getItem('user')));
				if(this.user.type == "1"){
					switch (data[0]["Estado"]) {
						//Client Locked
						case "0":
							//kill all session!!!!!!!!
							this.router.navigateByUrl("/userLocked");
							//OR
							this.loginStatud = true;
							this.msgError = "User Locked";
							break;
						//Client
						case "1":
						this.dialogRef.close();
							sessionStorage.setItem('userState','1');
							this.router.navigateByUrl("/Client");
							break;
						default:
							console.log("Estado desconocido");
							break;
					}
				}else if(this.user.type == "2"){
					switch (data[0]["Estado"]) {
						//Empleado bloqueado
						case "0":
							//kill all session!!!!!!!!
							this.router.navigateByUrl("/userLocked");
							//OR
							this.loginStatud = true;
							this.msgError = "User Locked";
							break;
						//Employee
						case "1":
							sessionStorage.setItem('userState','1');
							this.router.navigateByUrl("/employee");
							break;
						//Administrator
						case "2":
							sessionStorage.setItem('userState','2');
							this.router.navigateByUrl("/administrator");
							break;
						default:
							console.log("Estado desconocido");
							break;
					}
				}
				console.log("Login Correct");
				//sessionStorage.setItem('userState',"1");
			}
		});
  }
}
