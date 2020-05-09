import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SmeService } from "../../services/sme.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'add-sme',
  templateUrl: './add-sme.component.html',
  styleUrls: ['./add-sme.component.css']
})
export class AddSmeComponent implements OnInit, OnDestroy {

  addSmeForm: FormGroup;
  allUsers: any = [];
  processTypes: string[] = [];
  addingFlag: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _smeService: SmeService,
    private _settingsService: SettingsService,
    private _router: Router,
  ) {
    this._buildAddSmeForm();
  }

  private _buildAddSmeForm() {
    this.addSmeForm = this._formBuilder.group({
      name: [null, Validators.required],
      userRef: [null],
      key: [null],
      formIdentity: [null, Validators.required],
    })
  }

  ngOnInit() {
    this._settingsService.getProcesses().subscribe(
      (result: any) => {
        console.log("ALL PROCESSES:---", result);
        this.processTypes = result;
      },
      error => {
        console.log("ALL PROCESSES ERROR:---", error);
      }
    );
  }

  addSme(values) {
    this.addingFlag = true;
    this._smeService.addSection(
      values
    ).subscribe(
      result => {
        this.addingFlag = false;
        console.log("RSULT AFTER ADDING SME:---", result);
        this.clearForm();
      },
      error => {
        this.addingFlag = false;
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
