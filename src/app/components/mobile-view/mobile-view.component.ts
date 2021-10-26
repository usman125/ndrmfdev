import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ProjectService } from '../../services/project.service';
import { AuthStore } from '../../stores/auth/auth-store';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.css']
})
export class MobileViewComponent implements OnInit {

  constructor(
    private _authStore: AuthStore,
    private _router: Router,
    // private _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    // this._projectService.getAllProjects().subscribe(result => {
    //   console.log("ALL PROJECTS ARE:--", result);
    // })
  }

  logOut() {
    localStorage.removeItem('user');
    this._authStore.setLoginState(false);
    this._authStore.closeSideNav();
    this._router.navigate(['/login']);
  }

}
