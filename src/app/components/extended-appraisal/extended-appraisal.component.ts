import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ExtendedAppraisalSmesStore } from "../../stores/extended-appraisal-smes/extended-appraisal-smes-store";
import { ExtendedAppraisalFormsStore } from "../../stores/extended-appraisal-forms/extended-appraisal-forms-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-extended-appraisal',
  templateUrl: './extended-appraisal.component.html',
  styleUrls: ['./extended-appraisal.component.css']
})
export class ExtendedAppraisalComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  allSmes: any = [];
  allForms: any = [];
  selectedSme: any = null;

  @Output() showAddBtn: any = false;
  @Output() viewType: string = 'extapp';

  constructor(
    private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    private _extendedAppraisalFormsStore: ExtendedAppraisalFormsStore,
  ) { }

  ngOnInit(): void {
    // this.Subscription.add(
    //   this._extendedAppraisalFormsStore.state$.subscribe((data) => {
    //     this.allForms = data.extendedAppraisalForms;
    //   })
    // );
    // this.Subscription.add(
    //   this._extendedAppraisalSmesStore.state$.subscribe((data) => {
    //     this.allSmes = data.sections;
    //     for (let i = 0; i < this.allSmes.length; i++) {
    //       for (let j = 0; j < this.allForms.length; j++) {
    //         if (this.allForms[j].smeRef === this.allSmes[i].key) {
    //           this.allSmes[i].form = this.allSmes[j];
    //         } else {
    //           this.allSmes[i].form = null;
    //         };
    //       };
    //     };
    //   })
    // );
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }


}
