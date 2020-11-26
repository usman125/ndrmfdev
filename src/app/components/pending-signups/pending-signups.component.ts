import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../../services/settings.service";
import { PendingSignupsStore } from "../../stores/pending-signups/pending-signups-store";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-pending-signups',
  templateUrl: './pending-signups.component.html',
  styleUrls: ['./pending-signups.component.css']
})
export class PendingSignupsComponent implements OnInit {

  dataSource: any = null;
  allRequests: any = null;
  displayedColumns = ['firstName', 'lastName', 'email', 'actions'];
  Subscription: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    private _settingsService: SettingsService,
    private _pendingSignupsStore: PendingSignupsStore,
  ) { }

  ngOnInit(): void {
    this.getAllRequests();
    this.Subscription.add(
      this._pendingSignupsStore.state$.subscribe(data => {
        this.dataSource = new MatTableDataSource(data.requests);
      })
    )
  }

  getAllRequests() {
    this._settingsService.getPendingSignups().subscribe(
      (result: any) => {
        console.log("RESULT FROM PENDING REQUESTS:---", result);
        // this.dataSource = result;
        var array = [];
        for (let i = 0; i < result.length; i++) {
          result[i].pending = true;
          array.push(result[i]);
        }
        this._pendingSignupsStore.addAllRequests(array);
      },
      error => {
        console.log("ERROR FROM PENDING REQUESTS:---", error);
      }
    );
  }

  approveUser(element) {
    console.log("USER TO APPROVE:--", element);
    this.loading = true;
    this._settingsService.approveSignup(element.id).subscribe(
      result => {
        this.loading = false;
        console.log("RESULT AFTER APPROVING USER:--", result);
        this._pendingSignupsStore.approveRequest(element.id);
      },
      error => {
        this.loading = false;
        console.log("ERROR AFTER APPROVING USER:--", error);
      }
    );
  }

  applyFilter(event: Event) {
    console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  trackTask(index: number, item): string {
    // console.log("TRACK BY CALLED:---", index, item)
    return `${item.email}`;
  }

}
