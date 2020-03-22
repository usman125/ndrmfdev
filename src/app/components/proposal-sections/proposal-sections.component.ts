import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-proposal-sections',
  templateUrl: './proposal-sections.component.html',
  styleUrls: ['./proposal-sections.component.css']
})
export class ProposalSectionsComponent implements OnInit, OnDestroy {

  allSections: any = [];
  Subscription: Subscription = new Subscription();
  displayedColumns: any = ['name', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _proposalSectionsStore: ProposalSectionsStore,
    private _authStore: AuthStore,
    private _router: Router,
  ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this._authStore.setRouteName('PROPOSAL-SECTIONS');
    })
    this.Subscription.add(
      this._proposalSectionsStore.state$.subscribe((data) => {
        this.dataSource = new MatTableDataSource(data.sections);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  editSection(section) {

  }

  goToAdd() {
    this._router.navigate(['add-proposal-section']);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
