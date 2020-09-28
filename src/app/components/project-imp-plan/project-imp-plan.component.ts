import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { Subscription } from 'rxjs';
import { setFormValue, formValuesReplay } from "../../stores/form-values";
import { AuthStore } from '../../stores/auth/auth-store';
import { CostDetailsStore } from '../../stores/cost-details/cost-details-store';
import { PrimaryAppraisalFormsStore } from '../../stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { ProjectService } from '../../services/project.service';
import { ConfirmModelService } from '../../services/confirm-model.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  title: string;
  _id: string,
  children?: FoodNode[];
}
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  title: string;
  level: number;
  _id: string;
}

@Component({
  selector: 'app-project-imp-plan',
  templateUrl: './project-imp-plan.component.html',
  styleUrls: ['./project-imp-plan.component.css'],
  providers: [ConfirmModelService]
})
export class ProjectImpPlanComponent implements OnInit, OnDestroy {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      title: node.title,
      level: level,
      _id: node._id
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  quarters: any = [];
  allCosts: any = [];
  dataCosts: any = [];
  allSubCosts: any = [];
  Subscription: Subscription = new Subscription();

  months: any = null;
  loggedUser: any = null;
  selectedProject: any = null;
  selectedQuarter: any = null;
  apiLoading: boolean = false;

  filterType: any = 'General';
  filterTypes: any = [
    'General',
    'Financial',
    'Procurement',
    'M & E'
  ]

  @Input() show: any = null;
  @Input() proMonths: any = null;

  constructor(
    public dialog: MatDialog,
    public _authStore: AuthStore,
    public _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    public _projectService: ProjectService,
    public _confirmModelService: ConfirmModelService,
    public _costDetailsStore: CostDetailsStore,
  ) {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {

    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.months = data.auth.proMonths;
      })
    );
    this.Subscription.add(
      this._costDetailsStore.state$.subscribe(data => {
        if (data.cost && this.selectedQuarter !== null) {
          this.selectedQuarter.data = data.cost.costData;
        }
      })
    );
    // formValuesReplay.subscribe((data: any) => {
    //   console.log("REPLAY CALLED:--", data);
    //   if (data.form && data.form.length) {
    //     this.allCosts = data.form;
    //     this.allSubCosts = [];
    //     this.allCosts.forEach((c) => {
    //       c.quarters = [];
    //       for (let i = 0; i < Math.ceil(this.months / 3) + 3; i++) {
    //         var object = {
    //           quarter: i + 1,
    //           value: false,
    //           data: null
    //         }
    //         c.quarters.push(object);
    //       }
    //       if (c.mainCostId !== null) {
    //         this.allSubCosts.push(c);
    //       }
    //     });
    //     this.prepareForm();
    //   } else {
    //     this.allCosts = [];
    //   }
    // }).unsubscribe();

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe((data) => {
        this.selectedProject = data.selectedProject;
        if (this.loggedUser.role === 'admin') {
          this.getCostingHeads();
        }
        if (data.selectedProject && this.loggedUser.role !== 'admin') {
          if (data.selectedProject.implementationPlan === null) {
            this.getCostingHeads();
          } else {
            this.allCosts = typeof (data.selectedProject.implementationPlan) === 'string' ?
              JSON.parse(data.selectedProject.implementationPlan) :
              data.selectedProject.implementationPlan;
            this.allSubCosts = [];
            this.allCosts.forEach((c) => {
              if (c.mainCostId !== null)
                this.allSubCosts.push(c);
            });
            this.prepareForm();
          }
        }
        console.log("DATA FROM PIP STORE MANIPULATION:--", data.selectedProject, this.allCosts, this.allSubCosts);
      })
    );
    this.getQuarters();
  }

  getCostingHeads() {
    this._projectService.getCostingHeads().subscribe(
      (result: any) => {
        console.log("DATA BASE RESULTS ALL COSTS:--", result);
        this.allCosts = [];
        // this.allCosts = result;
        for (let i = 0; i < result.length; i++) {
          var cost = {
            title: result[i].name,
            quarters: [],
            _id: result[i].id,
            mainCostId: null,
          }
          for (let i = 0; i < Math.ceil(this.months / 3) + 3; i++) {
            var object = {
              quarter: i + 1,
              value: false,
              data: null
            }
            cost.quarters.push(object);
          }
          this.allCosts.push(cost);
        }
        console.log("RESULT AFTER COSTING HEADS:--", this.allCosts);
        this.prepareForm();
      },
      error => {
        console.log("ERROR AFTER COSTING HEADS:--", error);
      }
    );
  }

  getQuarters() {
    for (let i = 0; i < Math.ceil(this.months / 3) + 3; i++) {
      var object = {
        quarter: i + 1,
        value: false,
        data: null
      }
      this.quarters.push(object);
    }
    console.log("ALL QUARTERS:--", this.quarters);
  }

  addCost() {
    var cost = {
      title: "",
      quarters: [],
      _id: 'cost' + new Date().toISOString(),
      mainCostId: null,
    }
    for (let i = 0; i < Math.ceil(this.months / 3) + 3; i++) {
      var object = {
        quarter: i + 1,
        value: false,
        data: null
      }
      cost.quarters.push(object);
    }
    // console.log("ALL QUARTERS:--", this.quarters);

    this.allCosts.push(cost);
    // console.log("ALL COSTS:--", this.allCosts);
    this.prepareForm();
  }

  addSubCost(mainCostId) {
    // console.log("COST CLICKED:--", mainCostId);
    var subcost = {
      title: "",
      quarters: [],
      _id: 'subcost' + new Date().toISOString(),
      mainCostId: mainCostId,
    }

    for (let i = 0; i < Math.ceil(this.months / 3) + 3; i++) {
      var object = {
        quarter: i + 1,
        value: false,
        data: null
      }
      subcost.quarters.push(object);
    }

    this.allSubCosts.push(subcost);
    this.allCosts.push(subcost);
    // console.log("ALL SUB COSTS:--", this.allSubCosts);
    this.prepareForm();
  }

  prepareForm() {
    var test = _.chain(this.allSubCosts)
      .groupBy('mainCostId')
      .map((val, _id) => {
        return {
          val: val,
          _id: _id,
        }
      })
      .value();
    for (let i = 0; i < this.allCosts.length; i++) {
      for (let j = 0; j < test.length; j++) {
        if (this.allCosts[i]._id === test[j]._id) {
          this.allCosts[i].children = test[j].val;
        }
      }
    }
    var test2 = _.filter(this.allCosts, { mainCostId: null })
    // console.log("ALL COSTS FROM PREPARE FORM:--\n:--", test, test2, this.allCosts, "\nDATA COSTS:--", this.dataCosts);
    this.dataSource.data = test2;
    this.treeControl.expandAll();
  }

  inputChanged(_id, $event) {
    // console.log("INPUT CHANGED:--", _id, $event.target.value);
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === _id) {
        this.allCosts[i].title = $event.target.value;
      }
    }
  }

  removeSubCost(_id) {
    var index = null;
    for (let i = 0; i < this.allSubCosts.length; i++) {
      if (this.allSubCosts[i]._id === _id) {
        index = i;
      }
    }
    // console.log("INDEX IN SUB COST:--", index);
    if (index !== null) {
      this.allSubCosts.splice(index, 1);
    }
    var index = null;
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === _id) {
        index = i;
      }
      delete this.allCosts[i].children;
    }
    // console.log("INDEX IN COST:--", index);
    if (index !== null) {
      this.allCosts.splice(index, 1);
    }
    // console.log("SUB COST TO REMOVE:--", _id,
    //   "\nALL SUB COSTS:--", this.allSubCosts,
    //   "\nALL COSTS:--", this.allCosts);
    this.prepareForm();
  }

  changeQuarterSelection(item, object) {
    console.log("QUARTER CHANGED:--", item, object);
    // this.selectedQuarter = object;
    object.value = !object.value;
    object.data = {
      available: null,
      startDate: null,
      endDate: null,
      description: null,
      latitude: null,
      longitude: null,
      ndrmfShare: null,
      fipShare: null,
      isProcurement: false,
      procurementHeads: [],
      rfSubmitData: null,
    }
  }

  openActivityDetails(item, object) {
    console.log(item, object);
    // this._costDetailsStore.setDefaults(object.data);
    const dialogRef = this.dialog.open(ActivityDetailsComponent, {
      data: {
        available: true,
        startDate: object.data.startDate,
        endDate: object.data.endDate,
        description: object.data.description,
        latitude: object.data.latitude,
        longitude: object.data.longitude,
        ndrmfShare: object.data.ndrmfShare,
        fipShare: object.data.fipShare,
        isProcurement: object.data.isProcurement,
        procurementHeads: object.data.procurementHeads,
        rfSubmitData: object.data.rfSubmitData,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        object.data.startDate = result.startDate;
        object.data.endDate = result.endDate;
        object.data.description = result.description;
        object.data.latitude = result.latitude;
        object.data.longitude = result.longitude;
        object.data.ndrmfShare = result.ndrmfShare;
        object.data.fipShare = result.fipShare;
        object.data.isProcurement = result.isProcurement;
        object.data.procurementHeads = result.procurementHeads;
        object.data.rfSubmitData = JSON.parse(result.rfSubmitData);
      }
    });
  }

  saveCostings() {
    // setFormValue(this.allCosts);
    this.apiLoading = true;
    var object = {
      implementationPlan: JSON.stringify(this.allCosts)
    }
    this._projectService.submitPip(object, this.selectedProject.id).subscribe(
      result => {
        console.log("RESULT ADDING PROJECT IMPLEMENTATION PLAN:--", result);
        const options = {
          title: 'Implementation Plan has been Sumitted!',
          message: 'click "OK" to close',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this.apiLoading = false;
        this._confirmModelService.open(options);
        this._primaryAppraisalFormsStore.addPipToProject(this.allCosts);
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR ADDING PROJECT IMPLEMENTATION PLAN:--", error);
      }
    );
  }

  filterChanged(item) {
    console.log("FILTER CHANGED:--", this.filterType);
  }

  openQuarterDetails(object, item) {
    console.log("OPEN QUARTER DETAILS:--", object, item);
    this.selectedQuarter = object;
    this._costDetailsStore.setDefaults(item.title, object.quarter, object.data);
    document.querySelector('#myTopElement5').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  ngOnDestroy() {
    this._costDetailsStore.setDefaults(null, null, null);
    this.Subscription.unsubscribe();
  }

}
