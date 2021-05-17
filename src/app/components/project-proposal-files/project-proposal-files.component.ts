import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { PrimaryAppraisalFormsStore } from '../../stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { AuthStore } from '../../stores/auth/auth-store';
import * as _ from 'lodash';
import { ProjectService } from 'src/app/services/project.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from "file-saver";
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  status: string;
  picByte: any;
  name: string;
  path: string;
  created_by: string;
  children?: FoodNode[];
}
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  level: number;
  name: string;
  path: string;
  status: string;
  created_by: string;
  picByte: any;
}

@Component({
  selector: 'app-project-proposal-files',
  templateUrl: './project-proposal-files.component.html',
  styleUrls: ['./project-proposal-files.component.css']
})
export class ProjectProposalFilesComponent implements OnInit, OnDestroy {


  Subscription: Subscription = new Subscription();

  selectedFile: any = null;
  selectedFileBLOB: any = null;
  @ViewChild('downloadLink') downloadLink;

  loggedUser = JSON.parse(localStorage.getItem('user'));

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      path: node.path,
      status: node.status,
      created_by: node.created_by,
      picByte: node.picByte
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _projectService: ProjectService,
    private _authStore: AuthStore,
    private _domSanitizer: DomSanitizer,
  ) { }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        if (this.loggedUser.role === 'fip') {
          let newArray = [];
          for (let i = 0; i < data.selectedProject.files.length; i++) {
            if (data.selectedProject.files[i].status === 'Offer Letter') {
              newArray.push(data.selectedProject.files[i]);
            }
          }
          var array = _.chain(newArray)
            .groupBy('status')
            .map((val, status) => {
              return {
                children: val,
                name: status,
              }
            })
            .value();
          this.dataSource.data = array;
        } else {
          var array = _.chain(data.selectedProject.files)
            .groupBy('status')
            .map((val, status) => {
              return {
                children: val,
                name: status,
              }
            })
            .value();
          this.dataSource.data = array;
        }
        console.log("ALL FILES FROM PROJECT:---", data.selectedProject.files, array);
      })
    )
  }

  getNodeName(name) {
    switch (name) {
      case 'Upload PC1':
        return 'PC1 Uploads';
      case 'Upload PDRMC Mins':
        return 'PDRMC Mins Uploads';
      case 'Draft':
        return 'Draft Uploads';
      case 'Under Review':
        return 'Under Review Uploads';
      case 'Primary Appraisal':
        return 'Primary Appraisal Uploads';
      case 'Extended Appraisal':
        return 'Extended Appraisal Uploads';
      case 'TAC Meeting':
        return 'TAC Meeting';
      case 'RMC Meeting':
        return 'RMC Meeting';
      case 'BOD Meeting':
        return 'BOD Meeting';
      case 'Offer Letter':
        return 'Offer Letter';
      default:
        return 'Others';
    }
  }

  downloadFile(file) {
    // console.log("FILE TO DOWNLOAD:---", file);
    // let el: HTMLElement = this.downloadLink.nativeElement;
    this.selectedFile = 'data:image/jpeg;base64,' + file.picByte;
    // var url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="

    fetch(this.selectedFile)
      .then(res => res.blob())
      .then(console.log)
    // el.click();
    // this.selectedFile = null;
    // this._projectService.downloadAttachments(file.name, file.path).subscribe(
    //   (result: any) => {

    // this._projectService.downloadAttachments(file.name, file.path).subscribe(
    //   (result: any) => {
    // let blob = new Blob([file.picBytes], { type: 'application/octet-stream' });
    // let url = window.URL.createObjectURL(blob);
    // this.selectedFileBLOB = this._domSanitizer.bypassSecurityTrustUrl(url);
    // var reader = new FileReader();
    // reader.readAsDataURL(blob);
    // reader.onloadend = () => {
    //   console.log("FILE READER COMPLETED")
    //   console.log("REUSLT FROM DOWNLOADING:---", this.selectedFileBLOB, blob, url);
    // }
    //     // let pwa = window.open(url);
    // const url = 'data:image/jpeg;base64,' + file.picBytes;
    // window.open(this.selectedFileBLOB);
    //     console.log("REUSLT FROM DOWNLOADING:---", result);
    //   },
    //   error => {
    //     console.log("REUSLT FROM DOWNLOADING:---", error);
    //   }
    // );

    // this._projectService.downloadAttachments(file.name, file.path).subscribe(
    //   (result: any) => {


    //     var keys = ['name', 'path', 'status', 'picBytes'];
    //     var newArr = result;
    //     var formatted = [],
    //       data = newArr,
    //       cols = keys,
    //       l = cols.length;
    //     for (var i = 0; i < data.length; i++) {
    //       var d = data[i],
    //         o = {};
    //       for (var j = 0; j < l; j++)
    //         o[cols[j]] = d[j];
    //       formatted.push(o);
    //     }

    //     console.log("REUSLT FROM DOWNLOADING:---", result, formatted);

    //     setTimeout(() => {
    //       let el: HTMLElement = this.downloadLink.nativeElement;
    //       this.selectedFile = 'data:image/jpeg;base64,' + formatted[0].picBytes;
    //       this.selectedFileBLOB = formatted[0].name;
    //       el.click();
    //     }, 100);

    //     // this.selectedFile = null;
    //     // this.selectedFileBLOB = null;


    //     // var blob = new Blob([result[3]], { type: 'application/octet-stream' });
    //     // var downloadURL = window.URL.createObjectURL(blob);
    //     // var link = document.createElement('a');
    //     // link.href = downloadURL;
    //     // link.download;
    //     // link.target = '_blank';
    //     // link.click();
    //   },
    //   error => {
    //     console.log("REUSLT FROM DOWNLOADING:---", error);
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

}
