import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dmpam-home',
  templateUrl: './dmpam-home.component.html',
  styleUrls: ['./dmpam-home.component.css']
})
export class DmpamHomeComponent implements OnInit {

  projectStats: any = null;
  apiLoading: boolean = false;

  constructor(
    private _router: Router,
    private _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getAllProject();
  }

  getAllProject(){
    this.apiLoading = true;
    this._projectService.getAllProjects().subscribe(
      (result: any) => {
        console.log("DM PM ALL PROJECTS:--", result);
        var preCount = 0;
        var extCount = 0;
        result.forEach(element => {
          if (element.status === "Extended Appraisal") extCount = extCount + 1;
          if (element.status === "Preliminary Appraisal") preCount = preCount + 1;
        });
        this.projectStats = {
          preCount,
          extCount
        }
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR DM PM ALL PROJECTS:--", error);
      }
    );
  }

  goToRoute(route){
    this._router.navigate([route]);
  }

}