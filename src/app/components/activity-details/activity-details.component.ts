import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  _form: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<ActivityDetailsComponent>) { }

  ngOnInit(): void {
    this._form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      ndrmfShare: ['', Validators.required],
      fipShare: ['', Validators.required],
      isProcurement: [false],
      procurementHeads: ['']
    })
  }

  submit(){
    /* if(this._form.invalid){
      return;
    } */

    this.dialogRef.close(this._form.value);
  }
}
