import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-sme-home',
  templateUrl: './sme-home.component.html',
  styleUrls: ['./sme-home.component.css']
})
export class SmeHomeComponent implements OnInit {

  qualiTaskCount: any = 0;
  Subscription: Subscription = new Subscription();
  apiLoading: boolean = false;
  projectStats: any = null;

  constructor(
    private _accreditationRequestService: AccreditationRequestService,
    private _authStore: AuthStore,
    private _projectService: ProjectService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.apiLoading = data.auth.apiCall;
      })
    );
    this.getQualificationTasks();
    this.getAllProject();
  }

  getQualificationTasks() {
    this._authStore.setLoading();
    this._accreditationRequestService.getSmeTasks().subscribe(
      (result: any) => {
        // console.log("RESULT SME TASKS:--", result);
        // // result.
        // const array: any = result.qualification.map(c => {
        //   const date1: any = new Date();
        //   const date2: any = new Date(c.endDate);
        //   const diffTime = Math.abs(date2 - date1);
        //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        //   console.log(diffTime + " milliseconds");
        //   console.log(diffDays + " days");
        //   return {
        //     ...c,
        //     expiry: diffDays
        //   }
        // });
        console.log("RESULT SME HOME TASKS:--", result);
        let count = 0;
        for (let i = 0; i < result.qualification.length; i++){
          let key = result.qualification[i];
          if (key.status === "Pending"){
            count = count + 1;
          }
        }
        this.qualiTaskCount = count;
        this._authStore.removeLoading();
      },
      error => {
        console.log("ERROR SME HOME TASKS:--", error);
        this._authStore.removeLoading();
      }
    );
  }

  getAllProject() {
    this.apiLoading = true;
    this._projectService.getAllProjects().subscribe(
      (result: any) => {
        console.log("DM PM ALL PROJECTS:--", result);
        var preCount = 0;
        var extCount = 0;
        var urCount = 0;
        result.forEach(element => {
          if (element.status === "Extended Appraisal") extCount = extCount + 1;
          // if (element.status === "Preliminary Appraisal") preCount = preCount + 1;
          // if (element.status === "Under Review") urCount = urCount + 1;
        });
        this.projectStats = {
          preCount,
          extCount,
          urCount,
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
    // if (route === 'accreditation-requests'){
    //   this._router.navigate([route]);
    // }else{
      this._router.navigate([route]);
    // }
  }

}
