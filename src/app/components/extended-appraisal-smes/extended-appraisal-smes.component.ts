import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExtendedAppraisalSmesStore } from "../../stores/extended-appraisal-smes/extended-appraisal-smes-store";
import { ExtendedAppraisalFormsStore } from "../../stores/extended-appraisal-forms/extended-appraisal-forms-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-extended-appraisal-smes',
  templateUrl: './extended-appraisal-smes.component.html',
  styleUrls: ['./extended-appraisal-smes.component.css']
})
export class ExtendedAppraisalSmesComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  allSmes: any = [];
  allForms: any = [];
  selectedSme: any = null;

  constructor(
    private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    private _extendedAppraisalFormsStore: ExtendedAppraisalFormsStore,
  ) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy() { }
}
