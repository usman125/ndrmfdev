import { Component, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { setFormValue, formValuesReplay } from "../../stores/form-values";

@Component({
  selector: 'app-pip',
  templateUrl: './pip.component.html',
  styleUrls: ['./pip.component.css']
})
export class PipComponent {
  _form: FormGroup;

  @Input()
  viewOnly: any = false;
  formGroups: any = null;

  // formGroups: any = [

  //   {
  //     "name": "First Entry",
  //     "groups": [
  //       {
  //         "name": "First entry 1.1",
  //         "quarters": {
  //           "Q1": false,
  //           "Q2": false,
  //           "Q3": false,
  //           "Q4": false,
  //           "Q5": false,
  //           "Q6": false,
  //           "Q7": false,
  //           "Q8": false,
  //         },
  //         "groups": []
  //       },
  //       {
  //         "name": "First entry 1.2",
  //         "quarters": [],
  //         "groups": []
  //       }
  //     ],
  //     "quarters": {
  //       "Q1": false,
  //       "Q2": false,
  //       "Q3": false,
  //       "Q4": false,
  //       "Q5": false,
  //       "Q6": false,
  //       "Q7": false,
  //       "Q8": false,
  //       "data1": {
  //         "description": "",
  //         "endDate": "",
  //         "fipShare": "",
  //         "isProcurement": false,
  //         "latitude": "",
  //         "longitude": "",
  //         "ndrmfShare": "",
  //         "procurementHeads": "",
  //         "rfSubmitData": "",
  //         "startDate": "",
  //       }
  //     }
  //   },
  //   {
  //     "name": "Test entry",
  //     "groups": [],
  //     "quarters": {
  //       "Q1": false,
  //       "Q2": false,
  //       "Q3": true,
  //       "data3": {
  //         "startDate": "",
  //         "endDate": "",
  //         "description": "",
  //         "latitude": "",
  //         "longitude": "",
  //         "ndrmfShare": "",
  //         "fipShare": "",
  //         "isProcurement": false,
  //         "procurementHeads": "",
  //         "rfSubmitData": ""
  //       }
  //     }
  //   },
  //   {
  //     "name": "Test entry 2",
  //     "groups": [],
  //     "quarters": {
  //       "Q1": true,
  //       "Q2": false,
  //       "Q3": false,
  //       "data1": {
  //         "startDate": "",
  //         "endDate": "",
  //         "description": "",
  //         "latitude": "",
  //         "longitude": "",
  //         "ndrmfShare": "",
  //         "fipShare": "",
  //         "isProcurement": false,
  //         "procurementHeads": "",
  //         "rfSubmitData": ""
  //       }
  //     }
  //   },
  //   {
  //     "name": "third entry",
  //     "groups": [
  //       {
  //         "name": "third entry 1.1",
  //         "groups": [
  //           {
  //             "name": "third entry 1.2",
  //             "quarters": {
  //               "Q1": false,
  //               "Q2": false,
  //               "Q3": false,
  //               "Q4": false,
  //               "Q5": false,
  //               "Q6": false,
  //               "Q7": false,
  //               "Q8": false
  //             },
  //             "groups": []
  //           }
  //         ],
  //         "quarters": {
  //           "Q1": false,
  //           "Q2": false,
  //           "Q3": false,
  //           "Q4": false,
  //           "Q5": false,
  //           "Q6": false,
  //           "Q7": false,
  //           "Q8": false
  //         }
  //       }
  //     ],
  //     "quarters": {
  //       "Q1": false,
  //       "Q2": false,
  //       "Q3": false,
  //       "Q4": false,
  //       "Q5": false,
  //       "Q6": false,
  //       "Q7": false,
  //       "Q8": false,
  //     }
  //   }
  // ];



  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    formValuesReplay.subscribe((data: any) => {
      this.formGroups = data.form.groups;
      console.log("FORM VALUES PIP:---", this.formGroups);
    }).unsubscribe();
    this._createForm();
  }

  _addGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        groups: []
      })
    );
  }

  _addFormGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        groups: [this.formGroups]
      })
    );
  }

  _delete(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  get _groupsFormArray(): FormArray {
    return this._form.get("groups") as FormArray;
  }

  private _createForm() {
    if (this.formGroups !== null) {
      console.log("VIEW ONLY:--", this.viewOnly);
      this._form = this.fb.group({
        // groups: this.fb.array(this.formGroups.groups)
        groups: this.fb.array([])
      });
      this._addFormGroup();
    } else {
      console.log("VIEW ONLY:--", this.viewOnly);
      this._form = this.fb.group({
        // groups: this.fb.array(this.formGroups.groups)
        groups: this.fb.array([])
      });
    }
    // this._groupsFormArray.push(this.formGroups['groups']);
    // this._addFormGroup();
  }

  pipSubmit() {
    console.log("PIP SUBMITTED:--", this._form.value);
    setFormValue(this._form.value);
  }

  formEntryClicked(i) {
    console.log("INDEX OF FORM CLICKED:---", i);
  }
}