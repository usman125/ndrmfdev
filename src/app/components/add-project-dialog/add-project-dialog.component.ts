import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsStore } from "../../stores/projects/projects-store";

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

  projectTypeSingle = null;
  projectTypeJv = null;
  projectName = null;

  constructor(
    private _projectsStore: ProjectsStore,
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {
  }

  ngOnInit() { }

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
  public confirm() {
    this._projectsStore.addProject(
      this.projectName,
      this.projectTypeSingle,
      'none',
      null,
      new Date().toDateString(),
    );
    this.close(
      {
        name: this.projectName,
        type: this.projectTypeSingle,
      }
    );
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }


}
