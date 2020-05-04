import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from "@angular/router";
import { SurveysService } from "../../services/surveys.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css'],
  providers: [SurveysService]
})

export class SurveysComponent implements OnInit, OnDestroy, AfterViewInit {

  loggedUser: boolean = false;
  toggle: boolean = false;
  editFormFlag: boolean = false;
  loadingSection: boolean = false;

  refreshForm: EventEmitter<any> = new EventEmitter();

  form: any = {};
  secondForm: any = {};
  formValues: any = null;
  listItem: any = null;

  displayedColumns = ['name', 'min', 'max', 'actions'];
  allForms: any = [];

  dataSource: any;
  allProcessTypes: any = null;

  Subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _surveysStore: SurveysStore,
    private _authStore: AuthStore,
    private _router: Router,
    private _surveysService: SurveysService,
    private _settingsService: SettingsService,
  ) { }

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
    this._settingsService.getProcessTemplate(item).subscribe(
      (result: any) => {
        this.loadingSection = false;
        console.log("RESULT FROM ALL TEMPLATES:--", result);
        this.dataSource = result.sections;
        if (this.dataSource) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this.loadingSection = false;
        console.log("RESULT FROM ALL TEMPLATES:--", error);
      }
    );
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.formIdentity + index}`;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;

  }

  toogleForm(form) {
    console.log("FORM TO SHOW:--", form)
    this.toggle = !this.toggle;
    this.secondForm = JSON.parse(form.template);
    // this.secondForm.components = JSON.parse(form.components);
    // this.refreshForm.emit({
    //   form: this.secondForm
    // })
  }

  editForm(form) {
    this.editFormFlag = !this.editFormFlag;
    this.secondForm = JSON.parse(form.template);
    this.refreshForm.emit({
      form: this.secondForm
    })
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

  hideEditForm(){
    this.editFormFlag = false;
  }

}
