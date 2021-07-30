import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-sub-project-document-dmpam-tasks',
  templateUrl: './sub-project-document-dmpam-tasks.component.html',
  styleUrls: ['./sub-project-document-dmpam-tasks.component.css']
})
export class SubProjectDocumentDmpamTasksComponent implements OnInit, OnDestroy {

  loggedUser = JSON.parse(localStorage.getItem('user'));

  public displayedColumns = ['assigneedByName', 'docName', 'docNumber', 'fipName', 'status', 'comments', 'action'];
  public dataSource: any = [];
  public apiLoading: boolean = false;
  public Subscription: Subscription = new Subscription();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _projectServices: ProjectService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllRequests();
  }

  getAllRequests() {
    this.apiLoading = true;
    this._projectServices.getSubProjectDmPamTasks().subscribe(
      (result: any) => {
        console.log("RESULT SUB PROJECT DOCUMENT TASKS:---", result);
        this.dataSource = new MatTableDataSource(result.map((c) => {
          return {
            ...c,
            assigneedByName: c.assigneedBy.name
          }
        }));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("RESULT SUB PROJECT DOCUMENT TASKS:---", error);
      }
    );
  }

  applyFilter(event: Event) {
    // console.log("APPLY FIKTER:--", event);
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
    } else if (this.loggedUser.role === 'process owner' || this.loggedUser.role === 'sme' || this.loggedUser.role === 'dm pam') {
      this._router.navigate(['view-sub-project-document', element.subProjectRef]);

    }
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.id}`;
  }

  ngOnDestroy() {

  }

}
