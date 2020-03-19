import { Component, OnInit, OnDestroy, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from "../../stores/auth/auth-store";
import { SurveysStore } from '../../stores/surveys/surveys-store';
import { SmeStore } from "../../stores/sme/sme-store";
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
})
export class CreateSurveyComponent implements OnInit {

  createProfileForm: FormGroup;

  loggedUser: boolean = false;
  toggle: boolean = false;

  formName: any = '';
  formType: any = '';
  passScore: any = null;
  totalScore: any = null;
  smeRef: any = '';
  refreshForm: any = new EventEmitter();

  public form: any = {
    components: [],
    display: "form",
    page: 0,
    refreshOn: "submit",
    numPages: 2
  };

  @ViewChild('json') jsonElement?: ElementRef;
  secondForm: any = {};

  allForms: any = [];
  allSmes: any = [];

  Subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _surveysStore: SurveysStore,
    private _authStore: AuthStore,
    private _smeStore: SmeStore,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
  ) {
    this._buildCreateProfileForm();
  }

  private _buildCreateProfileForm() {
    this.createProfileForm = this._formBuilder.group({
      name: ['', Validators.required],
      passScore: ['', Validators.required],
      totalScore: ['', Validators.required],
      smeRef: ['', Validators.required],
      type: ['', Validators.required],
    })
  }

  onChange(event) {
    // if (this.jsonElement) {
    //   this.jsonElement.nativeElement.innerHTML = '';
    //   this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    // }
    this.refreshForm.emit({
      form: event.form
    });
  }

  ngOnInit() {
    this.formType = 'form';
    setTimeout(() => {
      this._authStore.setRouteName('Create-Survey');
    });
    this.Subscription.add(
      this._smeStore.state$.subscribe(data => {
        this.allSmes = data.smes;
        console.log("ALL SMES:---", data.smes);
      })
    );
    this.Subscription.add(
      this._surveysStore.state$.subscribe(data => {
        // this.allSmes = data.surveys;
        console.log("ALL SURVEYS:---", data.surveys);
      })
    );
  }

  toggleBuilder() {
    this.toggle = !this.toggle;
  }


  typeChanged($event) {
    // console.log("TYPE CHANGED:--", $event);
    if ($event === 'wizard') {
      this.form.display = 'wizard';
      this.form.page = 0;
      this.form.numPages = 1;
    } else {
      this.form.display = 'form';
      this.form.page = 0;
      this.form.numPages = 0;
    }
    this.refreshForm.emit({
      form: this.form
    })
  }
  smeChanged($event) {
    console.log("SME CHANGED:--", $event);
  }

  openSnackBar() {
    this._snackBar.open('Please enter form name!', 'done', {
      duration: 2000,
    });
  }

  onSubmit($event) {
    this.secondForm = $event.data;
    console.log("EVENT FROM FORM:---", this.secondForm);
  }

  saveForm(values) {
    console.log("FORM TO SAVE:--", values, "\nform", this.form);
    // console.log("FORM TO SAVE:--", 
    // "\nname", this.formName, 
    // "\ntype", this.formType, 
    // "\nform", this.form
    // );
    // if (this.formName) {
      this._surveysStore.addForm(
        values.name,
        values.smeRef,
        values.passScore,
        values.totalScore,
        values.type,
        this.form.page,
        'submit',
        this.form.numPages,
        this.form.components
      )
    // } else {
      // this.openSnackBar();
    // }
    // this._smeStore.updateUserRef(values.smeRef, values.email);
    this._smeStore.updateFormGenrated(values.smeRef);
    this.createProfileForm.reset();
    this.form = {
      components: [],
      display: "form",
      page: 0,
      refreshOn: "submit",
      numPages: 2
    };
    this.refreshForm.emit({
      form: this.form
    });
  }

  ngOnDestroy() {
  }

}
