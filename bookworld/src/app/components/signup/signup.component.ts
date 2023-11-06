import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  constructor(private user: UserService) { }

  signForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    pass: new FormControl('', [Validators.required, Validators.minLength(5)]),
    repass: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  submitForm() {
    console.log(this.signForm);

    let { name } = this.signForm.value
    let { pass } = this.signForm.value
    let { repass } = this.signForm.value

    if (this.signForm.valid && pass == repass) {
      this.user.signUp(name, pass).subscribe(
        () => {
          console.log("Success");
          alert("Your account has been created!")
        }
      )
    }
    else if (pass != repass) {
      alert("Check Password and Confirm password")
    }
  }
}