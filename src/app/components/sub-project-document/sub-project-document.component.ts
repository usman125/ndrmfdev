import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ProjectService } from 'src/app/services/project.service';
import { Subscription } from 'rxjs';
import { SubProjectDocStore } from 'src/app/stores/sub-proj-doc/sub-proj-doc-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-project-document',
  templateUrl: './sub-project-document.component.html',
  styleUrls: ['./sub-project-document.component.css']
})
export class SubProjectDocumentComponent implements OnInit, OnDestroy {

  public displayedColumns = ['name', 'startDate', 'endDate', 'status', 'action'];
  public dataSource: any = [];
  public apiLoading: boolean = false;
  public loggedUser: any = null;
  public Subscription: Subscription = new Subscription();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _projectService: ProjectService,
    private _subProjectDocStore: SubProjectDocStore,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(
      this._subProjectDocStore.state$.subscribe(data => {
        this.dataSource = new MatTableDataSource(data.requests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
    this.getAllRequests();
  }

  getAllRequests() {
    if (this.loggedUser.role === 'fip') {
      this._projectService.getPendingSubProjectDoc().subscribe(
        (result: any) => {
          console.log("PENGING SUB PROJ SOC SME:--", result);
          this._subProjectDocStore.addAllRequests(result);
        },
        error => {
          console.log("PENGING SUB PROJ SOC SME:--", error);
        }
      );
    } else if (this.loggedUser.role === 'process owner' || this.loggedUser.role === 'sme') {
      this._projectService.getSubProjectDoc().subscribe(
        (result: any) => {
          console.log("PENGING SUB PROJ SOC PO:--", result);
          this._subProjectDocStore.addAllRequests(result);
        },
        error => {
          console.log("PENGING SUB PROJ SOC PO:--", error);
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

  goToRequest(element) {
    // console.log(element);
    if (this.loggedUser.role === 'fip') {
      this._router.navigate(['fill-sub-project-document', element.id]);
    } else if (this.loggedUser.role === 'process owner' || this.loggedUser.role === 'sme') {
      this._router.navigate(['view-sub-project-document', element.id]);

    }
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.id}`;
  }

  ngOnDestroy() {
    this._subProjectDocStore.addAllRequests([]);
    this.Subscription.unsubscribe();
  }

}
