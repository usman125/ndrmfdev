import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthStore } from 'src/app/stores/auth/auth-store';
import { SettingsService } from '../../services/settings.service';
import { CostDetailsStore } from "../../stores/cost-details/cost-details-store";
import {
  PROVINCE,
  DIVISION,
  DISTRICT,
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

  // province: any = PROVINCE;
  // division: any = DIVISION;
  // district: any = DISTRICT;
  // tehsil: any = TEHSIL;
  // uc: any = UC;

  province: any = PROVINCE;
  division: any = [];
  district: any = [];
  tehsil: any = [];
  uc: any = [];

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
      target: [null, Validators.required],
      rfSubmitData: [null],
      province: [null, Validators.required],
      district: [null, Validators.required],
      division: [null, Validators.required],
      tehsil: [null, Validators.required],
      uc: [null, Validators.required],
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
        // EDIT CASE
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


          this.division = DIVISION.filter((c) => {
            if (this.selectedQuarter.province && (c.P_ID === this.selectedQuarter.province.P_ID))
              return c;
          });
          this.district = DISTRICT.filter((c) => {
            if (this.selectedQuarter.division && (c.DIVISION === this.selectedQuarter.division.DIVISION))
              return c;
          });
          this.tehsil = DISTRICT.filter((c) => {
            if (this.selectedQuarter.district && (c.D_ID === this.selectedQuarter.district.D_ID))
              return c;
          });
          this.uc = UC.filter((c) => {
            if (this.selectedQuarter.tehsil && (c.T_ID === this.selectedQuarter.tehsil.T_ID))
              return c;
          });


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
        // PROGRESS CASE
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
      this.clubbed,
      this.clubData ? this.clubData._id : null,
      this.clubData,
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
    if (o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }


  compareProvinceObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.PROVINCE === o2.PROVINCE && o1.P_ID === o2.P_ID;
    }
    return false;
  }
  compareDivisionObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.DIVISION === o2.DIVISION;
    }
    return false;
  }
  compareDistrictObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.D_ID === o2.D_ID && o1.DISTRICT === o2.DISTRICT;
    }
    return false;
  }
  compareTehsilObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.TEHSIL === o2.TEHSIL && o1.T_ID === o2.T_ID;
    }
    return false;
  }
  compareUcObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.UC === o2.UC && o1.UC_ID === o2.UC_ID;
    }
    return false;
  }

  provinceChanged($event) {
    console.log("provinceChanged::---", $event);
    this.district = [];
    this.division = [];
    this.tehsil = [];
    this.uc = [];
    this.division = DIVISION.filter((c) => {
      if (c.P_ID === $event.value.P_ID)
        return c;
    });
    this._form.patchValue({
      'district': null,
      'division': null,
      'tehsil': null,
      'uc': null,
    })
  }
  divisionChanged($event) {
    console.log("divisionChanged::---", $event);
    this.district = [];
    this.tehsil = [];
    this.uc = [];
    this.district = DISTRICT.filter((c) => {
      if (c.DIVISION === $event.value.DIVISION)
        return c;
    });
    this._form.patchValue({
      'district': null,
      'tehsil': null,
      'uc': null,
    })
  }
  districtChanged($event) {
    console.log("districtChanged::---", $event);
    this.tehsil = [];
    this.uc = [];
    this.tehsil = DISTRICT.filter((c) => {
      if (c.D_ID === $event.value.D_ID)
        return c;
    });
    this._form.patchValue({
      'tehsil': null,
      'uc': null,
    })
  }
  tehsilChanged($event) {
    console.log("tehsilChanged::---", $event);
    this.uc = [];
    this.uc = UC.filter((c) => {
      if (c.T_ID === $event.value.T_ID)
        return c;
    });
    this._form.patchValue({
      'uc': null,
    })
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
