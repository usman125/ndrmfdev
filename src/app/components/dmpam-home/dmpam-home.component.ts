import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dmpam-home',
  templateUrl: './dmpam-home.component.html',
  styleUrls: ['./dmpam-home.component.css']
})
export class DmpamHomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getAllProject();
  }

  getAllProject(){
    this._projectService.getAllProjects().subscribe(
      result => {
        console.log("DM PM ALL PROJECTS:--", result);
      },
      error => {
        console.log("ERROR DM PM ALL PROJECTS:--", error);
      }
    );
  }

  goToRoute(route){
    this._router.navigate([route]);
  }

}
