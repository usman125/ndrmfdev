import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { PrimaryAppraisalFormsStore } from '../../stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { AuthStore } from '../../stores/auth/auth-store';
import * as _ from 'lodash';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  status: string;
  name: string;
  path: string;
  children?: FoodNode[];
}
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  level: number;
  name: string;
  path: string;
  status: string;
}

@Component({
  selector: 'app-project-proposal-files',
  templateUrl: './project-proposal-files.component.html',
  styleUrls: ['./project-proposal-files.component.css']
})
export class ProjectProposalFilesComponent implements OnInit, OnDestroy {


  Subscription: Subscription = new Subscription();

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      path: node.path,
      status: node.status
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _authStore: AuthStore,
  ) { }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
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
        console.log("ALL FILES FROM PROJECT:---", data.selectedProject.files, array);
      })
    )
  }

  getNodeName(name){
    switch(name){
      case 'Upload PC1':
        return 'PC1 Uploads';
      case 'Upload PDRMC':
        return 'PDRMC Uploads';
    }
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

}
