import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersStore } from "../../stores/users/users-store";
import { SmeStore } from "../../stores/sme/sme-store";
import { Subscription, from } from "rxjs";
import { filter } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'add-sme',
  templateUrl: './add-sme.component.html',
  styleUrls: ['./add-sme.component.css']
})
export class AddSmeComponent implements OnInit, OnDestroy {

  addSmeForm: FormGroup;
  allUsers: any = [];
  Subscription: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _userStore: UsersStore,
    private _smeStore: SmeStore,
    private _router: Router,
  ) {
    this._buildAddSmeForm();
  }

  private _buildAddSmeForm() {
    this.addSmeForm = this._formBuilder.group({
      name: ['', Validators.required],
      userRef: [''],
      key: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.Subscription.add(
      this._userStore.state$.subscribe((data) => {
        // this.allUsers = data.users;
        // from(data.users)
        from(data.users).pipe(filter(user => user['role'] === 'sme' && !user['smeRef']))
          .subscribe((user) => {
            console.log(user);
            this.allUsers.push(user);
          }).unsubscribe();
      })
    )
  }

  userChanged($event) {
    console.log("USER CHANGED:--", $event);
  }

  addSme(values) {
    console.log("ADD SME:--", values);
    this._smeStore.addSme(values.name, values.key, values.userRef || null, false);
    this.addSmeForm.reset();
  }

  goBack() {
    this._router.navigate(['/smes']);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
