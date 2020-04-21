import { Component, OnInit, OnDestroy, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from "../../stores/auth/auth-store";
import { SurveysStore } from '../../stores/surveys/surveys-store';
import { SmeStore } from "../../stores/sme/sme-store";
import { SmeService } from "../../services/sme.service";
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SurveysService } from "../../services/surveys.service";
import { ConfirmModelService } from "../../services/confirm-model.service";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
  providers: [SurveysService, ConfirmModelService, SmeService]
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
    numPages: 2
  };

  @ViewChild('json') jsonElement?: ElementRef;
  secondForm: any = {};

  allForms: any = [];
  allSmes: any = [];
  selectedSme: any = null;

  apiSmeResult = [];

  Subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _surveysStore: SurveysStore,
    private _authStore: AuthStore,
    private _smeStore: SmeStore,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _surveysService: SurveysService,
    private _smeService: SmeService,
    private _confirmModelService: ConfirmModelService,
  ) {
    this._buildCreateProfileForm();
  }

  private _buildCreateProfileForm() {
    this.createProfileForm = this._formBuilder.group({
      name: ['', Validators.required],
      passScore: ['', Validators.required],
      totalScore: ['', Validators.required],
      smeRef: ['', Validators.required],
      type: ['qualification', Validators.required],
      formIdentity: ['', Validators.required],
    })
  }

  onChange(event) {
    if (this.jsonElement) {
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    }
    this.refreshForm.emit({
      form: event.form
    });
  }

  ngOnInit() {
    this.formType = 'form';
    setTimeout(() => {
      this._authStore.setRouteName('Create-Survey');
    });

    this.getAllSmes();

    this.Subscription.add(
      this._smeStore.state$.subscribe(data => {
        this.allSmes = data.smes;
        console.log("ALL SMES:---", data.smes);
      })
    );
    // this.Subscription.add(
    //   this._surveysStore.state$.subscribe(data => {
    //     // this.allSmes = data.surveys;
    //     console.log("ALL SURVEYS:---", data.surveys);
    //   })
    // );
    // Formio.setProjectUrl('http://localhost:9000/form');
  }

  toggleBuilder() {
    this.toggle = !this.toggle;
  }


  getAllSmes() {
    this._smeService.getAllSmes().subscribe(
      result => {
        let smesArray = [];
        console.log("RESULT FROM ALL SMES:---", result);
        if (result['sectionInfos']) {
          this.apiSmeResult = result['sectionInfos'];
          result['sectionInfos'].forEach(element => {
            var object = {
              name: element.sectionName,
              userRef: element.username,
              formGenerated: element.formGenerated,
              key: element.sectionKey,
            }
            if (element.formIdentity === 'qualification' && !element.formGenerated)
              smesArray.push(object);
          });
        }
        this._smeStore.addAllSmes(smesArray);
      },
      error => {
        console.log("ERROR FROM ALL SMES:---", error);
      }
    );
  }


  identityChanged($event) {
    let smesArray = [];
    if ($event === 'eligibilty') {
      this.apiSmeResult.forEach(element => {
        var object = {
          name: element.sectionName,
          userRef: element.userName,
          formGenerated: element.formGenerated,
          key: element.sectionKey,
          formIdentity: element.formIdentity,
        }
        if (element.formIdentity === 'eligibilty' && !element.formGenerated)
          smesArray.push(object);
      });
      this.createProfileForm.patchValue({ 'smeRef': null, 'totalScore': 0, 'passScore': 0 }, { onlySelf: true })
    }
    if ($event === 'qualification') {
      this.apiSmeResult.forEach(element => {
        var object = {
          name: element.sectionName,
          userRef: element.userName,
          formGenerated: element.formGenerated,
          key: element.sectionKey,
          formIdentity: element.formIdentity,
        }
        if (element.formIdentity === 'qualification' && !element.formGenerated)
          smesArray.push(object);
      });
      this.createProfileForm.patchValue({ 'smeRef': null, 'totalScore': null, 'passScore': null }, { onlySelf: true })
    }
    this._smeStore.addAllSmes(smesArray);
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
    for (let i = 0; i < this.allSmes.length; i++) {

      if (this.allSmes[i].key === $event) {
        this.selectedSme = this.allSmes[i];
        break;
      }
    }
    console.log("SME CHANGED:--", this.selectedSme);
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
    // console.log("FORM TO SAVE:--", values, "\nform", this.form);
    values.components = this.form.components;
    values.page = this.form.page;
    values.numOfPages = this.form.numPages;
    values.status = 'active';
    values.display = this.form.display;
    console.log("VALUES TO UPDATE SECTION:--", {
      name: this.selectedSme.name,
      key: values.smeRef,
      userRef: this.selectedSme.userRef,
      formGenerated: true
    });
    this._surveysService.addSurvey(values).subscribe(
      result => {
        console.log("RESULT FROM ADD SURVEY:--", result, {
          name: this.selectedSme.name,
          smeRef: values.smeRef,
          userRef: this.selectedSme.userRef,
          formGenerated: true,
          formIdentity: this.selectedSme.formIdentity,
        });
        this._smeService.updateSme(
          this.selectedSme.name,
          values.smeRef,
          this.selectedSme.userRef,
          true,
          this.selectedSme.formIdentity
        ).subscribe(
          result => {
            console.log("RSULT AFTER UPDATING SME:---", result);
            this._surveysStore.addForm(
              values.name,
              values.smeRef,
              values.passScore,
              values.totalScore,
              values.type,
              this.form.page,
              'submit',
              this.form.numPages,
              JSON.stringify(this.form.components)
            )
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
            this.getAllSmes();
          },
          error => {
            console.log("ERROR UPDATING SME:---", error);
          }
        );
      },
      error => {
        console.log("ERROR FROM ADD SURVEY:--", error);
      }
    );


  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }


  goBack() {
    this._router.navigate(['/surveys']);
  }

}
