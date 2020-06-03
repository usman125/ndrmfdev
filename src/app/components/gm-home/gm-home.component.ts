import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-gm-home',
  templateUrl: './gm-home.component.html',
  styleUrls: ['./gm-home.component.css']
})
export class GmHomeComponent implements OnInit {

  projectStats: any = null;
  apiLoading: boolean = false;

  constructor(
    private _router: Router,
    private _projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getAllProject();
  }

  getAllProject() {
    this.apiLoading = true;
    this._projectService.getAllProjects().subscribe(
      (result: any) => {
        console.log("DM PM ALL PROJECTS:--", result);
        var preCount = 0;
        var extCount = 0;
        var gmCount = 0;
        result.forEach(element => {
          if (element.status === "Extended Appraisal") extCount = extCount + 1;
          if (element.status === "Preliminary Appraisal") preCount = preCount + 1;
          if (element.status === "Marked to GM") gmCount = gmCount + 1;
        });
        this.projectStats = {
          preCount,
          extCount,
          gmCount,
        }
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR DM PM ALL PROJECTS:--", error);
      }
    );
  }

  goToRoute(route) {
    this._router.navigate([route]);
  }

}
