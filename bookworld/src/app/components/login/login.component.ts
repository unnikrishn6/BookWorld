import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private user: UserService, private auth: AuthService) { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  Submit() {
    const { username } = this.loginForm.value
    const { password } = this.loginForm.value

    if (this.loginForm.valid) {
      this.user.setUserName(username)

      this.user.login(username, password).subscribe(
        (res: any) => {
          if (res) {
            console.log(res);        //Handle the response from the server
            this.auth.login();

            localStorage.setItem("userID", res.uid)

            if (username == "admin" && password == "admin") {
              const key = prompt("Enter the key")
              if (key == "2408") {
                this.router.navigate(['/admin']);
              }
            }
            else {
              this.router.navigate(['/products']);
            }
          }
        },
        (err: any) => {
          console.log(err)
          alert("Invalid Credentials")
        }
      );
    }
  }
}
