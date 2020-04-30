import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  formIdentity = ['qualification', 'eligibility']

  constructor(
    private _formBuilder: FormBuilder,
    private _smeService: SmeService,
    private _router: Router,
  ) {
    this._buildAddSmeForm();
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
  }

  addSme(values) {
    this._smeService.addSme(
      values
    ).subscribe(
      result => {
        console.log("RSULT AFTER ADDING SME:---", result);
        this.clearForm();
      },
      error => {
        console.log("ERROR ADDING SME:---", error);
      }
    );

  }

  clearForm() {
    this.addSmeForm.reset();
  }

  goBack() {
    this._router.navigate(['/smes']);
  }

  ngOnDestroy() {
    // this.Subscription.unsubscribe();
  }

}
