import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AccreditationCommentsMatrixStore } from 'src/app/stores/accreditation-comments-matrix/accreditation-comments-matrix-store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-gia-comments-matrix',
  templateUrl: './gia-comments-matrix.component.html',
  styleUrls: ['./gia-comments-matrix.component.css']
})
export class GiaCommentsMatrixComponent implements OnInit {

  Subscription: Subscription = new Subscription();
  allComments: any = [];
  selectedProjectId: any = null;

  constructor(
    // private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    // private _extendedAppraisalFormsStore: ExtendedAppraisalFormsStore,
    private _accreditationCommentsMatrixStore: AccreditationCommentsMatrixStore,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _location: Location,
  ) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      this.getGiaComments();
    });

    this.Subscription.add(
      this._accreditationCommentsMatrixStore.state$.subscribe(data => {
        // console.log("COMMENTS MATRIX FROM STORE IN COMPOENNT:--", data.comments);
        this.allComments = data.comments;
      })
    );
  }

  getGiaComments() {
    this._projectService.getSingleProject(this.selectedProjectId).subscribe(
      (result: any) => {
        this.allComments = result.gia.reviewsHistory !== null ? result.gia.reviewsHistory : [];
        // console.log("PROJECT DETAILS FROM DATABASE:--", result, this.allComments);
      },
      error => {
        console.log("ERROR DETAILS FROM DATABASE:--", error);
      },
    );
  }

  goBack() {
    this._location.back();
  }


}
