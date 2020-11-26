import { LoginService } from './../services/login.service';
import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from "moment";
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
@Component({
  selector: 'app-grievance-registration',
  templateUrl: './grievance-registration.component.html',
  styleUrls: ['./grievance-registration.component.css']
})
export class GrievanceRegistrationComponent implements OnInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  @Input() accept = 'file/*';
  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
   myDate = new Date().toISOString();

   formatteddate = moment(this.myDate).format("DD-MM-YYYY  HH:mm");
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 300,

  };

  public registrationForm: FormGroup;
   testUser: any;
   files: any = [];
  constructor(private formBuilder: FormBuilder,
    private loginservices: LoginService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,) {
    this.grievanceFormBuilder();
  }
ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  ngOnInit(): void {
  }
  uploadFile() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });

      }
      // this.uploadFiles();
      console.log("Uploaded Files:---", this.files);

        const fd = new FormData();
     fd.append(this.param, this.files["data"]);
      console.log("fd", fd)


    };
    fileUpload.click();
  }
  goBack() {
    this._router.navigate(['login']);
  }
  grievanceFormBuilder() {
    this.registrationForm = this.formBuilder.group({
      'address': ['', [Validators.required]],
      'cnic':['', [Validators.required]],
      'complainantName':['', [Validators.required]],
      'complainantSignature':[''],
      'complaintAgainstPersonOrDepartment':[''],
      'complaintCategory':['', [Validators.required]],
      'complaintDateTime':[''],
      'complaintLocation':[''],
      'complaintStatus':[''],
      'complaintSubLocation':[''],
      'consultantName':['', [Validators.required]],
      'contactNo':[''],
      'email':['', [Validators.email]],
      'gender':[''],
      'organizationName':[''],
      'shortDescFectorCausingProblem':[''],
      'shortDescription':[''],
      'vendor':['']
    })
  }
  get fc() {
    return this.registrationForm.controls;
  }

registerGrievanceUser(){
  if(!this.fc.cnic.value){
    console.log("cnic value", this.fc.cnic.value )
    return;
  }
  let complaintToSendData = {
    "address": this.fc.address.value,
    "cnic": this.fc.cnic.value,
    "complainantName": this.fc.complainantName.value,
    "complainantSignature": this.fc.complainantSignature.value,
    "complaintAgainstPersonOrDepartment": this.fc.complaintAgainstPersonOrDepartment.value,
    "complaintCategory": this.fc.complaintCategory.value,
    "complaintDateTime": this.myDate,
    "complaintLocation": this.fc.complaintLocation.value,
    "complaintSubLocation":this.fc.complaintSubLocation.value,
    "consultantName": this.fc.consultantName.value,
    "email": this.fc.email.value,
    "organizationName": this.fc.organizationName.value,
    "shortDescFectorCausingProblem": this.fc.shortDescFectorCausingProblem.value,
    "shortDescription":this.fc.shortDescription.value,
    "vendor": this.fc.vendor.value,


  }
  console.log("registerd Complaint", complaintToSendData)
  this.loginservices.reggisterComplaint(complaintToSendData).subscribe(
    res => {
console.log("hitting successfully",res)
const options = {
  title: 'Successfully  added!',
  message: 'OK to exit',
  cancelText: 'CANCEL',
  confirmText: 'OK',
  add: true,
  confirm: false,
};
this._confirmModelService.open(options);
this._router.navigate(['login']);
    },
    _err => {
      var error = _err.json();
   console.log(error)
    }
  )
}
}
