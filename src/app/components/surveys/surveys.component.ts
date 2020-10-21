import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from "@angular/router";
import { SurveysService } from "../../services/surveys.service";
import { SettingsService } from "../../services/settings.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
// import { PROCESS_NAME } from "../../constants";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css'],
  providers: [ConfirmModelService]
})

export class SurveysComponent implements OnInit, OnDestroy, AfterViewInit {

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


  editFormFlag: boolean = false;
  loadingSection: boolean = false;


  secondForm: any = {};
  formValues: any = null;
  listItem: any = null;

  displayedColumns = ['name', 'min', 'max', 'actions'];
  allForms: any = [];

  dataSource: any;
  allProcessTypes: any = null;
  allSubProcessTypes: any = null;
  selctedRequest: any = null;
  fetchedSection: any = null;

  allSmes: any = null;
  selectedSme: any = null;

  Subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _surveysStore: SurveysStore,
    private _authStore: AuthStore,
    private _router: Router,
    private _surveysService: SurveysService,
    private _settingsService: SettingsService,
    private _confirmModelService: ConfirmModelService,
    private _formBuilder: FormBuilder,
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

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Surveys');
    }, 1000);

    // this._surveysService.getAllSurveys().subscribe(
    //   result => {
    //     let surveysArray = []
    //     console.log("ALL SURVEYS FROM API:--", result['formInfoList']);
    //     if (result['formInfoList']){ 
    //       result['formInfoList'].forEach(element => {
    //         var object = {
    //           name: element.sectionName,
    //           smeRef: element.sectionKey,
    //           formIdentity: element.formIdentity,
    //           passScore: element.passingScore,
    //           totalScore: element.totalScore,
    //           display: element.displayType,
    //           page: element.page,
    //           numPages: element.numOfPages,
    //           components: JSON.parse(element.component),
    //           // components: element.component !== 'string' ? JSON.parse(element.component) : [],
    //           // components: element.component !== "string" && element.component ? JSON.parse(element.component) : [],
    //         }
    //         surveysArray.push(object)
    //       });
    //       this._surveysStore.addAllForms(surveysArray);
    //     }
    //   },
    //   error => {
    //     console.log("ERROR SURVEYS API:--", error);
    //   }
    // )

    // this.Subscription.add(
    //   this._surveysStore.state$.subscribe(data => {
    //     this.dataSource = new MatTableDataSource(data.surveys);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   })
    // );
    this._settingsService.getProcesses().subscribe(
      result => {
        console.log("RESULT FROM PROCESS:--", result);
        this.allProcessTypes = result;
      },
      error => {
        console.log("ERROR FROM PROCESS:--", error);
      }
    );
  }

  fetchTemplates(item) {
    console.log("PROCESS TO FECT TEMPLATES:--", item);
    this.listItem = item;
    this.loadingSection = true;
    this.toggle = false;
    this.editFormFlag = false;
    this.dataSource = [];
    this._settingsService.getProcessTemplate(item).subscribe(
      (result: any) => {
        this.loadingSection = false;
        console.log("RESULT FROM ALL TEMPLATES:--", result);
        // this.allSmes = result.sections;
        this.fetchSectons(item);
        if (result.sectons !== null) {
          this.dataSource = new MatTableDataSource(result.sections);
          // this.dataSource = result.sections;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.getAllSubProcessTypes(item);
        }
      },
      error => {
        this.loadingSection = false;
        console.log("RESULT FROM ALL TEMPLATES:--", error);
      }
    );
  }

  fetchSubTemplates(item) {
    const options = {
      title: 'Success!',
      message: 'OK. to cancel',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    console.log("PROCESS TO FECT TEMPLATES:--", item);
    this.listItem = item;
    this.loadingSection = true;
    this.toggle = false;
    this.editFormFlag = false;
    this.dataSource = [];
    this._settingsService.getProcessTemplate(item).subscribe(
      (result: any) => {
        this.loadingSection = false;
        console.log("RESULT FROM ALL TEMPLATES:--", result);
        // this.allSmes = result.sections;
        this.fetchSectons(item);
        if (result.sectons !== null) {
          this.dataSource = new MatTableDataSource(result.sections);
          // this.dataSource = result.sections;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.getAllSubProcessTypes(item);
        }
      },
      error => {
        this.loadingSection = false;
        console.log("RESULT FROM ALL TEMPLATES:--", error);
        options.title = error.error.message;
        this._confirmModelService.open(options);
      }
    );
  }

  getAllSubProcessTypes(item) {
    // this.loadingSubSection = true;
    this._settingsService.getSubProcessTypes(item).subscribe(
      (result: any) => {
        // this.loadingSubSection = false;
        console.log("Rsult all sub process types:--", result);
        this.allSubProcessTypes = result;
      },
      error => {
        // this.loadingSubSection = false;
        console.log("Rsult all sub process types:--", error);
      }
    )
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.id + index}`;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;

  }

  toogleForm(form) {
    console.log("FORM TO SHOW:--", form)
    this.selctedRequest = form;
    this.toggle = !this.toggle;
    this.secondForm = JSON.parse(form.template);
    // this.secondForm.components = JSON.parse(form.components);
    // this.refreshForm.emit({
    //   form: this.secondForm
    // })
  }

  editForm(form) {
    this.selctedRequest = form;
    this.editFormFlag = !this.editFormFlag;
    this.secondForm = JSON.parse(form.template);
    console.log("FORM TO EDIT:--", this.secondForm, this.selctedRequest);
    let macthedEntry = null;
    // this.fetchSectons(this.selctedRequest.processType);
    for (let i = 0; i < this.allSmes.length; i++) {
      if (this.allSmes[i].id === this.selctedRequest.id) {
        console.log("THIS ENTRY MATCHED:--", this.allSmes[i]);
        macthedEntry = this.allSmes[i];
        break;
      }
    }
    this.patchForm(macthedEntry);
    this.refreshForm.emit({
      form: this.secondForm
    })
  }

  patchForm(sme) {
    this.selectedSme = sme;
    this.createProfileForm.patchValue({
      name: this.secondForm.name,
      passingScore: this.secondForm.passingScore || 0,
      totalScore: this.secondForm.totalScore || 0,
      smeRef: sme,
      type: this.secondForm.display,
      formIdentity: this.listItem,
    }, { onlySelf: true });

  }

  fetchSectons(item) {
    if (item) {
      this.createProfileForm.patchValue({ 'smeRef': null }, { onlySelf: true });
      if (item !== 'QUALIFICATION') {
        this.createProfileForm.patchValue({
          'passingScore': 0,
          'totalScore': 0,
        }, { onlySelf: true })
      }
      this.allSmes = [];
      this._settingsService.getProcessMeta(item).subscribe(
        (result: any) => {
          console.log("ALL PROCESSES:---", result);
          if (result.sections) {
            this.allSmes = result.sections;
          }
        },
        error => {
          console.log("ALL PROCESSES ERROR:---", error);
        }
      );
    }
  }

  applyFilter(event: Event) {
    console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit($event) {
    this.formValues = $event.data;
    // console.log("EVENT FROM FORM:---", $event.data);
    // this.refreshForm.emit({
    //   form: this.form
    // })
  }

  goBack() {
    this.toggle = !this.toggle;
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  goToAdd() {
    this._router.navigate(['/create-survey']);
  }

  hideEditForm() {
    this.editFormFlag = false;
    this.fetchTemplates(this.listItem);
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


  // FORM BUILDER
  smeChanged($event) {
    this.selectedSme = $event;
    console.log("SME CHANGED:--", this.selectedSme);
  }

  typeChanged($event) {
    console.log('Type changed:--', $event);
    this.formType = $event;
    if ($event === 'wizard') {
      this.secondForm.display = 'wizard';
      this.secondForm.page = 0;
      this.secondForm.numPages = 1;
    } else {
      this.secondForm.display = 'form';
      this.secondForm.page = 0;
      this.secondForm.numPages = 0;
    }
    this.refreshForm.emit({
      form: this.secondForm
    })
  }

  saveForm(values) {
    values.components = this.secondForm.components
    values.page = this.secondForm.page;
    values.numOfPages = this.secondForm.numPages;
    console.log("UPADTED FORM VALUES:--", values, this.secondForm);
    const options = {
      title: 'Success!',
      message: 'Form has been updated',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this._settingsService.addSectionTemplate(this.selectedSme.id, values).subscribe(
      result => {
        console.log("RESULT FROM UPDATE SURVEY FORM:--", result);
        this.refreshForm.emit({
          form: this.secondForm
        });
        this._confirmModelService.open(options);
      },
      error => {
        console.log("ERROR FROM ADD SURVEY:--", error);
      }
    );


  }

  PROCESS_NAME(name) {
    switch (name) {
      case 'ELIGIBILITY':
        return 'Eligibility';
      case 'QUALIFICATION':
        return 'Qualification';
      case 'ACCREDITATION_QUESTIONNAIRE':
        return 'Accreditation Questionnaire';
      case 'PROJECT_PROPOSAL':
        return 'Project Proposal';
      case 'PRELIMINARY_APPRAISAL':
        return 'Preliminary Appraisal';
      case 'EXTENDED_APPRAISAL':
        return 'Extended Appraisal';
      case 'GIA':
        return 'GIA';
      case 'GIA_CHECKLIST':
        return 'GIA Checklist';
      case 'SUB_PROJECT_DOCUMENT':
        return 'Sub Project Document';
      default:
        return name;
    }
  }

}
