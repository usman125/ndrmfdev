import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from "@angular/router";
import { SurveysService } from "../../services/surveys.service";

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

  refreshForm: EventEmitter<any> = new EventEmitter();

  form: any = {};
  secondForm: any = {};
  formValues: any = null;

  displayedColumns = ['name', 'smeRef', 'min', 'max', 'actions'];
  allForms: any = [];

  dataSource: any;

  Subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _surveysStore: SurveysStore,
    private _authStore: AuthStore,
    private _router: Router,
    private _surveysService: SurveysService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Surveys');
    }, 1000);

    this._surveysService.getAllSurveys().subscribe(
      result => {
        let surveysArray = []
        console.log("ALL SURVEYS FROM API:--", result['formInfoList']);
        if (result['formInfoList']){ 
          result['formInfoList'].forEach(element => {
            var object = {
              name: element.sectionName,
              smeRef: element.sectionKey,
              formIdentity: element.formIdentity,
              passScore: element.passingScore,
              totalScore: element.totalScore,
              display: element.displayType,
              page: element.page,
              numPages: element.numOfPages,
              components: JSON.parse(element.component),
              // components: element.component !== 'string' ? JSON.parse(element.component) : [],
              // components: element.component !== "string" && element.component ? JSON.parse(element.component) : [],
            }
            surveysArray.push(object)
          });
          this._surveysStore.addAllForms(surveysArray);
        }
      },
      error => {
        console.log("ERROR SURVEYS API:--", error);
      }
    )

    this.Subscription.add(
      this._surveysStore.state$.subscribe(data => {
        this.dataSource = new MatTableDataSource(data.surveys);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.formIdentity + index}`;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  toogleForm(form) {
    console.log("FORM TO SHOW:--", form)
    this.toggle = !this.toggle;
    this.secondForm = form;
    // this.secondForm.components = JSON.parse(form.components);
    // this.refreshForm.emit({
    //   form: this.secondForm
    // })
  }

  editForm(form) {
    this.editFormFlag = !this.editFormFlag;
    this.secondForm = form;
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

  goToAdd(){
    this._router.navigate(['/create-survey']);
  }

}
