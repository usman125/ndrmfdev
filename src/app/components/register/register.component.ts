import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { ConfirmModelService } from "../../services/confirm-model.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";

export interface DialogData {
  message: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [LoginService, ConfirmModelService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  Subscription: Subscription = new Subscription();
  loading: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _authStore: AuthStore,
    private _confirmModelService: ConfirmModelService,
  ) {
    this._buildRegisterForm();
  }

  _buildRegisterForm() {
    this.registerForm = this._formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
    })
  }

  ngOnInit() {
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.loading = data.auth.apiCall;
      })
    )
  }


  registerUser = (values) => {
    this._authStore.setLoading();
    this._loginService.registerUser(values).subscribe(
      result => {
        console.log("RESULT FROM REGISTER API:--", result);
        this._authStore.removeLoading();
        this.registerForm.reset();
        this.handleClick();
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FROM REGISTER API:--", error);
      }
    )
  }

  handleClick() {
    const options = {
      title: 'Success!',
      message: 'Registartion Received, we will review your application.',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log("CONFIRMED FROM MODEL", confirmed);
      }
    });
  }

}