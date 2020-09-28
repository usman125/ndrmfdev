import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../services/settings.service';
import { CostDetailsStore } from "../../stores/cost-details/cost-details-store";

@Component({
  selector: 'app-cost-details',
  templateUrl: './cost-details.component.html',
  styleUrls: ['./cost-details.component.css']
})
export class CostDetailsComponent implements OnInit, OnDestroy {

  _form: FormGroup;
  selectedQuarter: any = null;
  rfSubmitData: any = null;
  rfForm: any = null;
  Subscription: Subscription = new Subscription();

  quarter: any = null;
  costTitle: any = null;

  constructor(
    private fb: FormBuilder,
    private _settingsService: SettingsService,
    private _costDetailsStore: CostDetailsStore,
  ) {
    this._buildForm();
  }

  _buildForm() {
    this._form = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      description: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      ndrmfShare: [null, Validators.required],
      fipShare: [null, Validators.required],
      isProcurement: [false],
      procurementHeads: [null],
      rfSubmitData: [null],
    });
  }

  ngOnInit(): void {
    this.Subscription.add(
      this._costDetailsStore.state$.subscribe(result => {
        console.log("DATA IN COST DETAILS:--", result.cost, this.selectedQuarter);
        this.rfSubmitData = null;
        this.selectedQuarter = result.cost.costData;
        this.quarter = result.cost.quarter;
        this.costTitle = result.cost.title;
        if (this.selectedQuarter !== null) {
          // console.log("DATA FROM MODAL:---", this.data.available);
          this._form.patchValue({
            startDate: this.selectedQuarter.startDate,
            endDate: this.selectedQuarter.endDate,
            description: this.selectedQuarter.description,
            latitude: this.selectedQuarter.latitude,
            longitude: this.selectedQuarter.longitude,
            ndrmfShare: this.selectedQuarter.ndrmfShare,
            fipShare: this.selectedQuarter.fipShare,
            isProcurement: this.selectedQuarter.isProcurement,
            procurementHeads: this.selectedQuarter.procurementHeads,
            rfSubmitData: this.selectedQuarter.rfSubmitData,
          }, { onlySelf: true });
          if (this.selectedQuarter.rfSubmitData) {
            this.rfSubmitData = typeof (this.selectedQuarter.rfSubmitData) === 'string' ?
              JSON.parse(this.selectedQuarter.rfSubmitData) :
              this.selectedQuarter.rfSubmitData;
          }
          // if (this.selectedQuarter.startDate === null)
        }
        // this.getRfMeta();
      })
    );
  }

  getRfMeta() {
    this._settingsService.getProcessTemplate('PROJECT_PROPOSAL').subscribe(
      (result: any) => {
        result.sections.forEach(element => {
          if (element.sectionName === "Results Framework") {
            this.rfForm = JSON.parse(element.template);
            console.log("RESULT FROM TEMPLATES:--", this.rfForm);
          }
        });
      },
      error => {
        console.log("ERROR FROM TEMPLATES:--", error);
      }
    );
  }

  onTabChanged($event) {
    console.log("tab changed:--", $event);
    if ($event.index === 3) {
      this.getRfMeta();
    }
  }

  onSubmit($event) {
    console.log("RESULT FRAMEWORK SUBMITTED:---", $event);
    this.rfSubmitData = $event.data;
    this._form.patchValue({ rfSubmitData: $event.data }, { onlySelf: true });
    // this._form.patchValue({ rfSubmitData: JSON.stringify($event.data) }, { onlySelf: true });
  }


  submit() {
    this._costDetailsStore.setDefaults(this.costTitle, this.quarter, this._form.value);
    // this.rfSubmitData = null;
  }


  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
