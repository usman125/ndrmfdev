import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router } from "@angular/router";
import { AccreditationCommentsMatrixStore } from "../../stores/accreditation-comments-matrix/accreditation-comments-matrix-store";
import { Subscription } from "rxjs";
import { AuthStore } from "../../stores/auth/auth-store";
import { shareStoreReplay } from "../../stores/CurrentCommentReplay";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'accreditation-comments-matrix',
  templateUrl: './accreditation-comments-matrix.component.html',
  styleUrls: ['./accreditation-comments-matrix.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate(4000)
      ])
    ]),

    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero, form', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),

    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]

})

export class AccreditationCommentsMatrixComponent implements OnInit, OnDestroy {

  selectedRequest: any = null;
  Subscription: Subscription = new Subscription();
  currentComment: any = [];

  @HostBinding('@pageAnimations')
  public animatePage = true;

  _heroes = [];
  heroTotal = -1;

  constructor(
    private _router: Router,
    private _authStore: AuthStore,
    private _accreditationCommentsMatrixStore: AccreditationCommentsMatrixStore
  ) {
  }

  get heroes() {
    return this._heroes;
  }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName("COMMENTS-MATRIX");
    });
    this.Subscription.add(
      this._accreditationCommentsMatrixStore.state$.subscribe((data) => {
        this.selectedRequest = data.request;
        console.log('REQUEST TO VIEW:--', this.selectedRequest);
      })
    )
    shareStoreReplay.subscribe((c) => {
      this.currentComment = c;
      if (this.currentComment.endDate){
        this._heroes = this.currentComment.comments;
        // console.log("CURRENT COMMENT:--", this.currentComment);
        this.heroTotal = this.currentComment.comments;
      }else{
        this.heroTotal = -1;
      }
    })
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  goBack() {
    this._router.navigate(['/accreditation-requests', { request: true }]);
  }

}
