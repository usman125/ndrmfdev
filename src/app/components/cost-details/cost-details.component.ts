import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthStore } from 'src/app/stores/auth/auth-store';
import { SettingsService } from '../../services/settings.service';
import { CostDetailsStore } from "../../stores/cost-details/cost-details-store";
import {
  PROVINCE,
  DISTRICT,
  // DIVISION
  TEHSIL,
  UC,
} from "../../components/uc_data";


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
  selectedIndex: any = 0;

  updateFlag: boolean;

  progressForm: FormGroup;
  clubbed: any = null;
  clubData: any = null;
  clubbedId: any = null;

  // progressData: any = {
  //   generalProgress: null,
  //   generalProgressStatus: null,
  //   financialProgress: null,
  //   financialProgressStatus: null,
  //   financialProgressAmount: null,
  //   procProgress: null,
  //   procProgressStatus: null,
  //   mneProgress: null,
  //   mneProgressStatus: null,
  // };
  progressData: any = null;
  loggedUser: any = null;
  currentQuarter: any = null;

  province: any = PROVINCE;
  district: any = DISTRICT;
  tehsil: any = TEHSIL;
  // uc: any = UC;

  @Output() costUpdated: EventEmitter<any> = new EventEmitter();
  @Output() rfUpdated: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _settingsService: SettingsService,
    private _costDetailsStore: CostDetailsStore,
    private _authStore: AuthStore,
  ) {
    this._buildForm();
    this._buildProgressForm();
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
      target: [null],
      rfSubmitData: [null],
      province: [null],
      district: [null],
      division: [null],
      tehsil: [null],
      uc: [null],
    });
  }

  _buildProgressForm() {
    this.progressForm = this.fb.group({
      generalProgress: [null, Validators.required],
      generalProgressStatus: [null, Validators.required],
      financialProgress: [null, Validators.required],
      financialProgressStatus: [null, Validators.required],
      financialProgressAmount: [null, Validators.required],
      procProgress: [null, Validators.required],
      procProgressStatus: [null, Validators.required],
      mneProgress: [null, Validators.required],
      mneProgressStatus: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(

    );
    this.Subscription.add(
      this._costDetailsStore.state$.subscribe(result => {
        setTimeout(() => { this.selectedIndex = 0; }, 0);
        this.rfSubmitData = null;
        this.selectedQuarter = result.cost.costData;
        this.quarter = result.cost.quarter;
        this.costTitle = result.cost.title;
        this.updateFlag = result.cost.update;
        this.progressData = result.cost.progress;
        this.clubbed = result.cost.clubbed;
        this.clubData = result.cost.clubData;
        console.log("DATA IN COST DETAILS:--", result.cost, this.selectedQuarter);
        if (this.selectedQuarter !== null && this.updateFlag) {
          this._form.patchValue({
            startDate: this.selectedQuarter.startDate,
            endDate: this.selectedQuarter.endDate,
            description: this.selectedQuarter.description,
            latitude: this.selectedQuarter.latitude,
            longitude: this.selectedQuarter.longitude,
            ndrmfShare: !result.cost.clubbed ? this.selectedQuarter.ndrmfShare : result.cost.clubData.ndrmfShare,
            fipShare: !result.cost.clubbed ? this.selectedQuarter.fipShare : result.cost.clubData.fipShare,
            isProcurement: !result.cost.clubbed ? this.selectedQuarter.isProcurement : result.cost.clubData.isProcurement,
            procurementHeads: !result.cost.clubbed ? this.selectedQuarter.procurementHeads : result.cost.clubData.procurementHeads,
            rfSubmitData: this.selectedQuarter.rfSubmitData,
            target: this.selectedQuarter.target ? this.selectedQuarter.target : this.clubbed ? this.clubData.numOfActivities : 1,
            province: this.selectedQuarter.province,
            district: this.selectedQuarter.district,
            division: this.selectedQuarter.division,
            tehsil: this.selectedQuarter.tehsil,
            uc: this.selectedQuarter.uc,
          }, { onlySelf: true });


          if (this.selectedQuarter.rfSubmitData) {
            this.rfSubmitData = typeof (this.selectedQuarter.rfSubmitData) === 'string' ?
              JSON.parse(this.selectedQuarter.rfSubmitData) :
              this.selectedQuarter.rfSubmitData;
          }
          this._authStore.state$.subscribe(data => {
            console.log("CURRENT QUARTER:--", data.auth.currentQuarter);
            this.currentQuarter = data.auth.currentQuarter;
            if ((this.quarter < this.currentQuarter) && this.currentQuarter) {
              this._form.disable({ onlySelf: true });
            } else {
              this._form.enable({ onlySelf: true });
            }
          })
          result.cost.clubbed ? this._form.controls['ndrmfShare'].disable({ onlySelf: true }) : this._form.controls['ndrmfShare'].enable({ onlySelf: true });
          result.cost.clubbed ? this._form.controls['ndrmfShare'].clearValidators() : this._form.controls['ndrmfShare'].setValidators([Validators.required]);
          result.cost.clubbed ? this._form.controls['fipShare'].disable({ onlySelf: true }) : this._form.controls['fipShare'].enable({ onlySelf: true });
          result.cost.clubbed ? this._form.controls['fipShare'].clearValidators() : this._form.controls['fipShare'].setValidators([Validators.required]);
          result.cost.clubbed ? this._form.controls['isProcurement'].disable({ onlySelf: true }) : this._form.controls['isProcurement'].enable({ onlySelf: true });
          // result.cost.clubbed ? this._form.controls['isProcurement'].clearValidators() : null;
          result.cost.clubbed ? this._form.controls['procurementHeads'].disable({ onlySelf: true }) : this._form.controls['procurementHeads'].enable({ onlySelf: true });
        }
        if (!this.updateFlag) {
          if (this.clubbed) {
            this.selectedQuarter.isProcurement = this.clubData.isProcurement;
            this.selectedQuarter.procurementHeads = this.clubData.procurementHeads;
            this._form.patchValue({
              isProcurement: this.clubData.isProcurement,
              procurementHeads: this.clubData.procurementHeads,
            }, { onlySelf: true });
            this._form.controls['isProcurement'].disable({ onlySelf: true });
            this._form.controls['procurementHeads'].disable({ onlySelf: true });
          } else {
            this._form.patchValue({
              isProcurement: this.selectedQuarter.isProcurement,
              procurementHeads: this.selectedQuarter.procurementHeads,
            }, { onlySelf: true });
            this._form.controls['isProcurement'].disable({ onlySelf: true });
            this._form.controls['procurementHeads'].disable({ onlySelf: true });
          }
          this.progressForm.patchValue({
            generalProgress: this.progressData.generalProgress,
            generalProgressStatus: this.progressData.generalProgressStatus,
            financialProgress: this.progressData.financialProgress,
            financialProgressStatus: this.progressData.financialProgressStatus,
            financialProgressAmount: this.progressData.financialProgressAmount,
            procProgress: this.progressData.procProgress,
            procProgressStatus: this.progressData.procProgressStatus,
            mneProgress: this.progressData.mneProgress,
            mneProgressStatus: this.progressData.mneProgressStatus,
          }, { onlySelf: true });
          this._authStore.state$.subscribe(data => {
            console.log("CURRENT QUARTER:--", data.auth.currentQuarter);
            this.currentQuarter = data.auth.currentQuarter;
            if ((this.quarter > this.currentQuarter) && this.currentQuarter) {
              this.progressForm.disable({ onlySelf: true });
            } else {
              this.progressForm.enable({ onlySelf: true });
              if (!this.selectedQuarter.isProcurement) {
                this.progressForm.controls['procProgress'].clearValidators();
                this.progressForm.controls['procProgress'].disable({ onlySelf: true });
                this.progressForm.controls['procProgressStatus'].clearValidators();
                this.progressForm.controls['procProgressStatus'].disable({ onlySelf: true });
              }
              if (this.selectedQuarter.isProcurement) {
                this.progressForm.controls['procProgress'].setValidators([Validators.required]);
                this.progressForm.controls['procProgressStatus'].setValidators([Validators.required]);
                this.progressForm.controls['procProgress'].enable({ onlySelf: true });
                this.progressForm.controls['procProgressStatus'].enable({ onlySelf: true });
              }
              if (this.selectedQuarter.rfSubmitData === null) {
                this.progressForm.controls['mneProgress'].clearValidators();
                this.progressForm.controls['mneProgress'].disable({ onlySelf: true });
                this.progressForm.controls['mneProgressStatus'].clearValidators();
                this.progressForm.controls['mneProgressStatus'].disable({ onlySelf: true });
              }
              if (this.selectedQuarter.rfSubmitData !== null) {
                this.progressForm.controls['mneProgress'].setValidators([Validators.required]);
                this.progressForm.controls['mneProgressStatus'].setValidators([Validators.required]);
                this.progressForm.controls['mneProgress'].enable({ onlySelf: true });
                this.progressForm.controls['mneProgressStatus'].enable({ onlySelf: true });
              }
            }
          })
        }
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
    this.rfUpdated.emit({ 'rfUpdated': JSON.stringify($event.data) });
    // this._form.patchValue({ rfSubmitData: JSON.stringify($event.data) }, { onlySelf: true });
  }


  submit() {
    this._costDetailsStore.setDefaults(
      this.costTitle,
      this.quarter,
      this._form.value,
      this.progressData,
      true,
      false,
      null,
      null,
    );
    this.costUpdated.emit({ 'costUpdated': true });
    // this.rfSubmitData = null;
  }

  submitProgress() {
    console.log("PROGRESS SUBMITTED:---", this.progressForm.value);
    this._costDetailsStore.setDefaults(
      this.costTitle,
      this.quarter,
      this.selectedQuarter,
      this.progressForm.value,
      false,
      false,
      null,
      null,
    );
  }


  compareProcObjects(o1: any, o2: any): boolean {
    // console.log("COMPARE SME:--", o1, o2)
    if (o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
