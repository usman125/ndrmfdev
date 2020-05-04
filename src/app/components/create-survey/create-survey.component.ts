import { Component, OnInit, OnDestroy, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
  providers:[]
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

  apiSmeResult: any = [];
  allProcessTypes: any = [];

  Subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _authStore: AuthStore,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _settingsService: SettingsService,
  ) {
    this._buildCreateProfileForm();
  }

  private _buildCreateProfileForm() {
    this.createProfileForm = this._formBuilder.group({
      name: ['', Validators.required],
      passingScore: ['', Validators.required],
      totalScore: ['', Validators.required],
      smeRef: ['', Validators.required],
      type: ['', Validators.required],
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

    this._settingsService.getProcesses().subscribe(
      result => {
        console.log("ALL PROCESSES:---", result);
        this.allProcessTypes = result;
      },
      error => {
        console.log("ALL PROCESSES ERROR:---", error);
      }
    );
  }

  fetchSectons(item) {
    if (item) {
      if (item !== 'QUALIFICATION') {
        this.createProfileForm.patchValue({
          'passingScore': 0,
          'totalScore': 0,
        }, { onlySelf: true })
      }

      this._settingsService.getProcessMeta(item).subscribe(
        (result: any) => {
          console.log("ALL PROCESSES:---", result);
          if (result.sections) {
            this.allSmes = result.sections;
          }else{
            this.allSmes = [];
          }
        },
        error => {
          // this.loadingSection = false;
          console.log("ALL PROCESSES ERROR:---", error);
        }
      );
    }
  }

  toggleBuilder() {
    this.toggle = !this.toggle;
  }

  typeChanged($event) {
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
    this.selectedSme = $event;
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
    values.components = this.form.components
    values.page = this.form.page;
    values.numOfPages = this.form.numPages;
    values.status = 'active';
    values.display = this.form.display;
    this._settingsService.addSectionTemplate(this.selectedSme.id, values).subscribe(
      result => {
        console.log("RESULT FROM ADD SURVEY:--", result);
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
