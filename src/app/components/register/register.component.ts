import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { ConfirmModelService } from "../../services/confirm-model.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material/dialog';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ConfirmDialogComponent } from "../component-index";

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
    private _matDialog: MatDialog,
    private _confirmModelService: ConfirmModelService,
  ) {
    this._buildRegisterForm();
  }

  _buildRegisterForm() {
    this.registerForm = this._formBuilder.group({
      'firstName': [''],
      'email': [''],
      'username': [''],
      'password': [''],
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

    // const options = {
    //   title: 'Leave page?',
    //   message: 'By leaving this page you will permanently lose your form changes.',
    //   cancelText: 'CANCEL',
    //   confirmText: 'YES, LEAVE PAGE'
    // };

    this._authStore.setLoading();
    this._loginService.registerUser(values).subscribe(
      result => {
        console.log("RESULT FROM REGISTER API:--", result);
        this._authStore.removeLoading();
        this.registerForm.reset();
        // this.openDialog();
        // this._confirmModelService.open(options);
        this.handleClick();
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FROM REGISTER API:--", error);
      }
    )
  }

  // openDialog() {
  //   const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
  //     width: '320px',
  //     data: { message: 'this.comments' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //   });
  // }

  handleClick() {
    const options = {
      title: 'Leave page?',
      message: 'By leaving this page you will permanently lose your form changes.',
      cancelText: 'CANCEL',
      confirmText: 'YES, LEAVE PAGE'
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        // this.saveData();
        console.log("CONFIRMED FROM MODEL", confirmed);
      }
    });
  }


}


// @Component({
//   selector: 'app-confirm-dialog',
//   templateUrl: '../confirm-dialog/confirm-dialog.component.html',
//   styleUrls: ['../confirm-dialog/confirm-dialog.component.css']
// })
// export class ConfirmDialogComponent implements OnInit {

//   checked: boolean = false;

//   constructor(
//     public dialogRef: MatDialogRef<ConfirmDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {
//   }

//   ngOnInit() { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }