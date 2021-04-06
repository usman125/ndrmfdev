import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { Subscription } from "rxjs";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SettingsService } from "../../services/settings.service";
import { Router } from '@angular/router';
import { setThematicAreaValue } from "../../stores/proposal-forms/proposal-forms-replay";

@Component({
  selector: 'app-proposal-forms',
  templateUrl: './proposal-forms.component.html',
  styleUrls: ['./proposal-forms.component.css']
})
export class ProposalFormsComponent implements OnInit {

  loggedUser: boolean = false;
  toggle: boolean = false;
  editFormFlag: boolean = false;
  apiLoading: boolean = false;

  refreshForm: EventEmitter<any> = new EventEmitter();

  form: any = {};
  secondForm: any = {};
  formValues: any = null;

  displayedColumns = ['name', 'poRef', 'actions'];
  allForms: any = [];

  dataSource: any;

  selectedArea: any = null;

  Subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _proposalFormsStore: ProposalFormsStore,
    private _authStore: AuthStore,
    private _router: Router,
    private _settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Surveys');
    }, 1000);
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.apiLoading = data.auth.apiCall;
      })
    );
    this._authStore.setLoading();
    this._settingsService.getAllThematicAreas().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        // console.log("RESULT FROM THEMATIC AREAS:--", result);
        this._proposalFormsStore.setAllForms(result);
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FROM THEMATIC AREAS:--", error);
      }
    );
    this.Subscription.add(
      this._proposalFormsStore.state$.subscribe(data => {
        this.dataSource = new MatTableDataSource(data.forms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log("DATA FROM ALL THEMATIC AREA:--", data.forms);
      })
    );

  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.formIdentity + index}`;
  }


  editForm(form) {
    // console.log("FORM TO EDIT:---", form);
    setThematicAreaValue(form.id, form.name, form.processOwner, form.enabled);
  }

  onSubmit($event) {
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
