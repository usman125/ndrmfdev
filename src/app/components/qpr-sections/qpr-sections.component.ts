import { Component, OnInit, Input } from '@angular/core';
import { QprSectionsStore } from 'src/app/stores/qpr-sections/qpr-sections-store';
import { Subscription } from 'rxjs';
import { QprStore } from 'src/app/stores/qpr/qpr-store';


@Component({
  selector: 'app-qpr-sections',
  templateUrl: './qpr-sections.component.html',
  styleUrls: ['./qpr-sections.component.css']
})
export class QprSectionsComponent implements OnInit {

  loggedUser: any = null;
  Subscription: Subscription = new Subscription();
  qprSections: any = null;
  qprSectionStats: any = null;

  ndrmfDisbursment: any = null;
  ndrmfActual: any = null;
  fipContribution: any = null;
  fipActual: any = null;

  @Input() ndrmfShare = 0;
  @Input() fipShare = 0;
  @Input() quarter: any = 0;

  constructor(
    public _qprSectionsStore: QprSectionsStore,
    public _qprStore: QprStore,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(
      this._qprSectionsStore.state$.subscribe(data => {
        // this.qprSections = [];
        this.qprSections = data.sections.map((c) => {
          return {
            ...c,
            template: typeof (c.template) === 'string' ? JSON.parse(c.template) : c.template
          }
        })
        console.log("QPR SECTIONS:---", this.qprSections, this.quarter, this.ndrmfShare, this.fipShare);
      })
    );
    this.Subscription.add(
      this._qprStore.state$.subscribe(data => {
        // this.qprSections = [];
        console.log("QPR SECTIONS STATS:---", data.stats);
        this.qprSectionStats = data.stats;
      })
    );
  }

  onSubmit($event) {
    console.log("FORM SUBMIT DATA:---", $event);
  }

}
