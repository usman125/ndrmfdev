import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { ConfirmModelService } from '../../services/confirm-model.service';
import { DesignationsStore } from '../../stores/designations/designations-store';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css'],
  providers: [ConfirmModelService]
})
export class DesignationsComponent implements OnInit {

  areaName: any = null;
  apiLoading: boolean = false;

  displayedColumns = ['name'];
  allDesignations: any = [];

  dataSource: any;

  selectedArea: any = null;

  Subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _designationsStore: DesignationsStore,
    private _confirmModelService: ConfirmModelService,
    private _settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._designationsStore.state$.subscribe(data => {
        this.allDesignations = data.designations;
        this.dataSource = new MatTableDataSource(data.designations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
    this.getAllDesignations();
  }

  getAllDesignations() {
    this.apiLoading = true;
    this._settingsService.getAllDesignations().subscribe(
      (result: any) => {
        console.log("RESULT FROM DESIGNATIONS:--", result);
        this._designationsStore.addAllDesignations(result);
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM DESIGNATIONS:--", error);
      }
    );
  }

  goToAdd() {
    var object = {
      name: this.areaName
    }
    const options = {
      title: 'Designation added!',
      message: 'OK to exit',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this.apiLoading = true;
    this._settingsService.addDesignations(object).subscribe(
      result => {
        console.log("RESULT FROM ADDING:--", result);
        this._designationsStore.addDesignations(this.areaName, null);
        this._confirmModelService.open(options);
        this.apiLoading = false;
        this.areaName = null;
      },
      error => {
        console.log("ERROR FROM ADDING:--", error);
        this.apiLoading = false;
        options.title = error.error.message;
        this._confirmModelService.open(options);
      }
    )
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.id}+${index}`;
  }

  applyFilter(event: Event) {
    console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._designationsStore.addAllDesignations([]);
    this.Subscription.unsubscribe();
  }

}

