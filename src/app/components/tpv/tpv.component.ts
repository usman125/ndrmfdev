import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModelService } from '../../services/confirm-model.service';
import { ProjectService } from '../../services/project.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../services/file-upload-service.service';


@Component({
  selector: 'app-tpv',
  templateUrl: './tpv.component.html',
  styleUrls: ['./tpv.component.css'],
  providers: [ConfirmModelService, FileUploadService]
})
export class TpvComponent implements OnInit {

  loggedUser = JSON.parse(localStorage.getItem('user'));
  apiLoading: boolean = false;
  selectedProjectId: any = null;
  allRequests: any = [];

  currentTask: any = null;
  completedChecklist: any = [];
  // : any = [];

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  @Input() accept = '*/*';

  @ViewChild('myInput')
  myInputVariable: ElementRef;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _confirmModelService: ConfirmModelService,
    private _fileUploadService: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.apiLoading = true;
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      console.log("TPV REF FOR PROPOSAL:--", this.selectedProjectId);
      this.getProjectClosureDetails();
    });
  }

  getProjectClosureDetails() {
    this._projectService.getTpvRequestsByProposalId(this.selectedProjectId).subscribe(
      (result: any) => {
        this.allRequests = result.sort((a, b) => (a.orderNum > b.orderNum) ? 1 : ((b.orderNum > a.orderNum) ? -1 : 0))
        console.log("ALL TPV ON PROPOSAL:--", this.allRequests);
        this.getCurrentTask();
        this.apiLoading = false;
      },
      error => {
        console.log("ALL TPV ON PROPOSAL:--", error);
      }
    );
  }

  getCurrentTask() {
    for (let i = 0; i < this.allRequests.length; i++) {
      if (this.allRequests[i].generalFields === null) {
        this.currentTask = this.allRequests[i];
        break;
      }
    }
    for (let i = 0; i < this.allRequests.length; i++) {
      if (this.allRequests[i].generalFields !== null) {
        this.completedChecklist.push(this.allRequests[i]);
      }
    }
    console.log("CURRENT ASK IS:********", this.currentTask, this.completedChecklist);
  }


  // ******** FIEL UPLOAD CODE ************

  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(quarter): void {
    this.message = [];

    if (this.selectedFiles) {

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i], quarter);
        if (i === this.selectedFiles.length + 1)
          this.selectedFiles['item'] = null;
      }
    }

  }

  upload(idx: number, file: File, type): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this._fileUploadService.uploadTpvFiles(file, this.currentTask.id, type).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // this.fileInfos = this._fileUploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          // this.fileInfos = this._fileUploadService.getFiles();
        }
      );
    }
  }

  uploadFile() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      this.selectedFiles = fileUpload.files;
      console.log("THIS SELECUED FILES ARE:---", this.selectedFiles);
    };
    fileUpload.click();

  }

  goToNextStage() {
    this.apiLoading = true;
    const options = {
      title: '',
      message: '',
      confirmText: 'OK',
      cancelText: 'OK',
      add: true,

    }
    let body = {
      data: this.currentTask.generalFields,
      requestId: this.selectedProjectId
    }
    console.log("RESULT AFTER SUBMITTING TASK:-", body);

    this._projectService.submitTpvTask(this.currentTask.id, body).subscribe(
      (result: any) => {
        options.title = result.message;
        this._confirmModelService.open(options);
        this._confirmModelService.confirmed().subscribe(confirmed => {
          this.currentTask.status = 'Completed';
          this.message = [];
          this.progressInfos = [];
          this.selectedFiles = null;
          this.getCurrentTask();
          this.myInputVariable.nativeElement.value = "";
          this.apiLoading = false;
        })
        console.log("RESULT AFTER SUBMITTING TASK:-", result);
      },
      error => {
        console.log("RESULT AFTER SUBMITTING TASK:-", error);
      }
    );

  }


}
