import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DepartmentsStore } from 'src/app/stores/departments/departments-store';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  areaName: any = null;
  apiLoading: boolean = false;

  displayedColumns = ['name'];
  allDepartments: any = [];

  dataSource: any;

  selectedArea: any = null;

  Subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _departmentsStore: DepartmentsStore,
    private _settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._departmentsStore.state$.subscribe(data => {
        this.allDepartments = data.departments;
        this.dataSource = new MatTableDataSource(data.departments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.apiLoading = true;
    this._settingsService.getAllDepartments().subscribe(
      (result: any) => {
        console.log("RESULT FROM DEPARTMENTS:--", result);
        this._departmentsStore.addAllDepartments(result);
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM DEPARTMENTS:--", error);
      }
    );
  }

  goToAdd() {
    var object = {
      name: this.areaName
    }
    this.apiLoading = true;
    this._settingsService.addDepartments(object).subscribe(
      result => {
        console.log("RESULT FROM ADDING:--", result);
        this._departmentsStore.addDepartment(this.areaName, null);
        this.apiLoading = false;
        this.areaName = null;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM ADDING:--", error);
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
    this._departmentsStore.addAllDepartments([]);
    this.Subscription.unsubscribe();
  }

}
