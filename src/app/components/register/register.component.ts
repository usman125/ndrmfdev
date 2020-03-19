import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Form } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this._buildRegisterForm();
  }

  _buildRegisterForm() {
    this.registerForm = this._formBuilder.group({
      'name': [''],
      'email': [''],
      'password': [''],
    })
  }

  ngOnInit() {
  }


  registerUser = (values) => {
    console.log(values);
  }

}
