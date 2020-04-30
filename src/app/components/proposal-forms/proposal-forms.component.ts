import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CreateProposalFormService } from "../../services/create-proposal-form.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposal-forms',
  templateUrl: './proposal-forms.component.html',
  styleUrls: ['./proposal-forms.component.css']
})
export class ProposalFormsComponent implements OnInit {

  loggedUser: boolean = false;
  toggle: boolean = false;
  editFormFlag: boolean = false;

  refreshForm: EventEmitter<any> = new EventEmitter();

  form: any = {};
  secondForm: any = {};
  formValues: any = null;

  displayedColumns = ['name', 'smeRef', 'actions'];
  allForms: any = [];

  dataSource: any;

  Subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _proposalFormsStore: ProposalFormsStore,
    private _authStore: AuthStore,
    private _router: Router,
    private _createProposalFormService: CreateProposalFormService,
  ) {
    this.Subscription.add(
      this._proposalFormsStore.state$.subscribe(data => {
        // if (data.forms.length){
        this.dataSource = new MatTableDataSource(data.forms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // }
        console.log("DATA FROM ALL PROPOSAL FROMS:--", data.forms);
      })
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Surveys');
    }, 1000);
    this._createProposalFormService.allForms().subscribe(
      (result) => {
        console.log("RESULT FROM ALL FROMS:--", result.response[0].forms);
        this._proposalFormsStore.setAllForms(result.response[0].forms);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.formIdentity + index}`;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  toogleForm(form) {
    this.toggle = !this.toggle;
    this.secondForm = form;
    this.secondForm.components = JSON.parse(this.secondForm.components);
    this.refreshForm.emit({
      form: this.secondForm
    })
  }

  editForm(form) {
    this.editFormFlag = !this.editFormFlag;
    this.secondForm = form;
    // this.secondForm.components = JSON.parse(form.components);
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

  goToAdd() {
    this._router.navigate(['create-proposal-form']);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
