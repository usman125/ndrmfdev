import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from '../../services/settings.service';
import { pipPopupReplay } from '../../stores/pip-popup-replay';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  _form: FormGroup;
  rfForm: any = null;
  rfSubmitData: any = null;

  constructor(
    private fb: FormBuilder,
    private _settingsService: SettingsService,
    private dialogRef: MatDialogRef<ActivityDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
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
    this._form.controls['procurementHeads'].disable;
    console.log("DATA FROM MODAL:---", this.data);
    if (this.data.available === true) {
      console.log("DATA FROM MODAL:---", this.data.available);
      this._form.patchValue({
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        description: this.data.description,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        ndrmfShare: this.data.ndrmfShare,
        fipShare: this.data.fipShare,
        isProcurement: this.data.isProcurement,
        procurementHeads: this.data.procurementHeads,
        rfSubmitData: this.data.rfSubmitData,
      }, { onlySelf: true });
      if (this.data.rfSubmitData) {
        this.rfSubmitData = typeof (this.data.rfSubmitData) === 'string' ?
          JSON.parse(this.data.rfSubmitData) :
          this.data.rfSubmitData;
      }
    }
    // this.getRfMeta();
  }

  submit() {
    /* if(this._form.invalid){
      return;
    } */

    this.dialogRef.close(this._form.value);
    // this.dialogRef.close({
    //   startDate: this.data.startDate,
    // });
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
    this._form.patchValue({ rfSubmitData: JSON.stringify($event.data) }, { onlySelf: true });
  }
}
