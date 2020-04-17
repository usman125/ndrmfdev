import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { UsersStore } from "../../stores/users/users-store";
import { SmeStore } from "../../stores/sme/sme-store";
import {
  currentSmeReplay,
  setCurrentSme
} from "../../stores/sme/sme-replay";
import { Subscription, from } from "rxjs";
import { filter } from "rxjs/operators";
import { Router } from "@angular/router";
import { SmeService } from "../../services/sme.service";

@Component({
  selector: 'add-sme',
  templateUrl: './add-sme.component.html',
  styleUrls: ['./add-sme.component.css']
})
export class AddSmeComponent implements OnInit, OnDestroy {

  addSmeForm: FormGroup;
  allUsers: any = [];
  Subscription: Subscription = new Subscription();

  selectedSme: any = null;
  currentUserReplay: any;
  flag: boolean = false;

  formIdentity = ['qualification', 'eligibility']

  constructor(
    private _formBuilder: FormBuilder,
    private _userStore: UsersStore,
    private _smeStore: SmeStore,
    private _smeService: SmeService,
    private _router: Router,
  ) {
    this._buildAddSmeForm();
    this.Subscription.add(
      this._userStore.state$.subscribe((data) => {
        this.allUsers = [];
        from(data.users).pipe(filter(user => user['role'] === 'other'))
          .subscribe((user) => {
            this.allUsers.push(user);
          }).unsubscribe();
        currentSmeReplay.subscribe((data) => {
          this.selectedSme = data;
          console.log("DATA FROM SURRENT SME:--", this.selectedSme);
          if (this.selectedSme.name !== null) {
            this.addSmeForm.patchValue({
              name: this.selectedSme.name,
              key: this.selectedSme.key,
              userRef: this.selectedSme.userRef,
              formIdentity: this.selectedSme.formIdentity,
            }, { onlySelf: true })
            this.flag = true;
          }
        }).unsubscribe();
        // console.log("ALL USERS IN SME:---", data.users);
      })
    )
  }

  private _buildAddSmeForm() {
    this.addSmeForm = this._formBuilder.group({
      name: [null, Validators.required],
      userRef: [null],
      key: [null, Validators.required],
      formIdentity: [null, Validators.required],
    })
  }

  ngOnInit() {
    // this.currentUserReplay = currentSmeReplay.subscribe((data) => {
    //   this.selectedSme = data;
    //   console.log("DATA FROM SURRENT SME:--", this.selectedSme);
    //   if (this.selectedSme.name !== null) {
    //     this.addSmeForm.patchValue({
    //       name: this.selectedSme.name,
    //       key: this.selectedSme.key,
    //       userRef: this.selectedSme.userRef,
    //     }, { onlySelf: true })
    //     // this.addSmeForm.disable()
    //     // this.addSmeForm.controls['userRef'].disable();
    //     this.flag = true;
    //   }
    // }).unsubscribe();
  }



  userChanged($event) {
    console.log("USER CHANGED:--", $event);
  }

  addSme(values) {
    console.log("SME TO ADD:--", values);
    if (this.flag) {
      this._smeService.updateSme(
        values.name,
        values.key,
        values.userRef,
        this.selectedSme.formGenerated,
        values.formIdentity
      ).subscribe(
        result => {
          console.log("RSULT AFTER UPDATING SME:---", result);
          this._smeStore.updateSme(
            values.name,
            values.key,
            values.userRef,
            this.selectedSme.formGenerated,
            this.selectedSme.formIdentity
          );
          if (this.selectedSme.userRef === null && values.userRef !== null) {
            setCurrentSme(values.name, values.key, values.userRef, false, values.formIdentity);
            this._userStore.updateUser(
              values.userRef,
              'sme',
              values.key
            );
          }
        },
        error => {
          console.log("ERROR UPDATING SME:---", error);
        }
      );
    } else {
      this._smeService.addSme(values).subscribe(
        result => {
          console.log("RSULT AFTER ADDING SME:---", result);
          if (values.userRef !== null) {
            this._userStore.updateUser(
              values.userRef,
              "sme",
              values.key
            );
          }
          this._smeStore.addSme(
            values.name,
            values.key,
            values.userRef,
            false,
            values.formIdentity
          );
          this.clearForm();
        },
        error => {
          console.log("ERROR ADDING SME:---", error);
        }
      );
    }
  }

  clearForm() {
    this.addSmeForm.reset();
  }

  goBack() {
    setCurrentSme(null, null, null, false, 'qualification');
    this._router.navigate(['/smes']);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
