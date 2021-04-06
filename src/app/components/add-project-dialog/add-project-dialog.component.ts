import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsStore } from "../../stores/projects/projects-store";
import { SettingsService } from "../../services/settings.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';

export interface ConfirmData {
  cancelText: string;
  confirmText: string;
  message: string;
  title: string;
}

@Component({
  selector: 'add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {

  checked: boolean = false;

  addProjectForm: FormGroup;

  projectTypeSingle = null;
  projectTypeJv = null;
  projectName = null;

  allThematicAreas: any = [];
  thematicAreaId: any = null;
  selectedArea: any = null;

  apiLoading: boolean = false;
  showJvUsers: boolean = false;
  allJvUsers: any = null;

  constructor(
    private _userService: UserService,
    private _settingsService: SettingsService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {
    this._buildAddProjectForm();
  }

  _buildAddProjectForm() {
    this.addProjectForm = this._formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      thematicArea: ['', Validators.required],
      jvUser: [''],
    })
  }

  ngOnInit() {
    this.getThematicAreas();
  }


  getThematicAreas() {
    this.apiLoading = true;
    this._userService.getUserThemticAreas().subscribe(
      (result: any) => {
        // console.log("RESULT FROM THEMATIC:--", result);
        let newArray = [];
        for (let i = 0; i < result.length; i++) {
          newArray.push(result[i].thematicAreaItem);
        }
        this.allThematicAreas = newArray;
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM THEMATIC:--", error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public cancel() {
    this.projectTypeSingle = null;
    this.projectTypeJv = null;
    this.projectName = null;
    this.close(false);
  }
  public close(value) {
    this.projectTypeSingle = null;
    this.projectTypeJv = null;
    this.projectName = null;
    this.dialogRef.close(value);
  }
  public confirm(values) {
    // this._projectsStore.addProject(
    //   this.projectName,
    //   this.projectTypeSingle,
    //   'none',
    // );
    // console.log(values);
    values.thematicAreaName = values.thematicArea.name;
    values.thematicAreaId = values.thematicArea.id;
    values.jvUserID = null;
    this.close(values);
  }

  typeChanged($event) {
    // console.log("TYPE CHANGS:=--", $event);
    if ($event.value === 'jv') {
      this._userService.getAllJvUsers().subscribe(
        (result: any) => {
          // console.log("ALL JV USERS:--", result);
          this.allJvUsers = result;
          this.showJvUsers = true;
          this.addProjectForm.controls['jvUser'].setValidators([Validators.required]);
        },
        (error: any) => {
          console.log("ALL JV USERS:--", error);
        }
      );
    } else {
      this.showJvUsers = false;
      this.addProjectForm.controls['jvUser'].clearValidators();
    }
  }

  jvUsersChanged($event) {
    // console.log("JV USERS CHANGED:--", $event);
  }

  thematicChanged($event) {
    // console.log("THEMATIC CHANGS:=--", $event);
    this.selectedArea = $event.name;
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }


}
