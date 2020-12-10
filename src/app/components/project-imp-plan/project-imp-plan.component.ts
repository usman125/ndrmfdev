import { Component, OnDestroy, OnInit, Input, EventEmitter } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { Observable, Subscription } from 'rxjs';
import { setFormValue, formValuesReplay } from "../../stores/form-values";
import { AuthStore } from '../../stores/auth/auth-store';
import { CostDetailsStore } from '../../stores/cost-details/cost-details-store';
import { PrimaryAppraisalFormsStore } from '../../stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { ProjectService } from '../../services/project.service';
import { ConfirmModelService } from '../../services/confirm-model.service';
import { FormBuilder, FormGroup } from '@angular/forms';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  title: string;
  clubbed: boolean;
  clubId: string;
  _id: string,
  children?: FoodNode[];
}
/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  clubbed: boolean;
  clubId: string;
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
      clubbed: node.clubbed,
      clubId: node.clubId,
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
  selectedActivity: any = null;
  apiLoading: boolean = false;

  filterType: any = 'General';
  filterTypes: any = [
    'General',
    'Financial',
    'Procurement',
    'M & E'
  ];

  viewType: any = "update";

  @Input() show: any;
  @Input() detailBtn: any;
  @Input() proMonths: any = null;
  // @Input() giaFilter: any = null;
  @Input()
  giaProcFilter: Observable<any>;

  quarterSelection: any = null;

  clubs: any = [];
  clubForm: FormGroup;

  totalClubsCount: any = 0;
  totalUnClubbedEntriesCount: any = 0;

  selectedClub: any = null;

  constructor(
    public dialog: MatDialog,
    public _authStore: AuthStore,
    public _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    public _projectService: ProjectService,
    public _confirmModelService: ConfirmModelService,
    public _costDetailsStore: CostDetailsStore,
    public _fb: FormBuilder,
  ) {
    this._createVlubForm();
  }

  _createVlubForm() {
    this.clubForm = this._fb.group({
      title: [null],
      fipShare: [null],
      ndrmfShare: [null],
      isProcurement: [false],
      procurementHeads: [null],
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    console.log("SHOW FOR PIP:----", this.show);
    if (this.show) {
      this.filterType = this.show;
    }
    // this.Subscription.add(
    //   this.giaProcFilter.subscribe(({data}) => {
    //     console.log("GIA FILTER IN COMPONENT:--", data);
    //   })
    // );

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    // this.viewType = 'progress';
    if (this.loggedUser.role !== 'fip') {
      this.viewType = 'progress';
    }
    if (this.loggedUser.role === 'fip') {
      this.viewType = 'update';
    }
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.quarters = [];
        this.months = data.auth.proMonths;
        console.log("****MONTHS IN PROJECT IMPLEMENTATION PLAN*****\n", data);
        setTimeout(() => {
          this.getQuarters();
        });
      })
    );
    this.Subscription.add(
      this._costDetailsStore.state$.subscribe(data => {
        if (data.cost && this.selectedQuarter !== null) {
          if (data.cost.update) {
            console.log("****UPDATE DATA*****\n", data);
            this.selectedQuarter.data = data.cost.costData;
            // this.calculateActivityTotal();
          } else {
            console.log("****UPDATE PROGRESS*****\n", data);
            this.selectedQuarter.progress = data.cost.progress;
          }
        }
      })
    );
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe((data) => {
        this.selectedProject = data.selectedProject;
        if (this.selectedProject) {
          if (this.loggedUser.role === 'fip' && this.selectedProject.status === 'Checklist to FIP') {
            this.viewType = 'progress';
          }
        }
        if (this.loggedUser.role === 'admin') {
          this.getCostingHeads();
        }
        if (data.selectedProject && this.loggedUser.role !== 'admin') {
          if (data.selectedProject.implementationPlan === null) {
            this.getCostingHeads();
          } else {
            this.clubs = typeof (data.selectedProject.implementationPlan) === 'string' ?
              (JSON.parse(data.selectedProject.implementationPlan)).clubs :
              data.selectedProject.implementationPlan.clubs;
            this.allCosts = typeof (data.selectedProject.implementationPlan) === 'string' ?
              (JSON.parse(data.selectedProject.implementationPlan)).costs :
              data.selectedProject.implementationPlan.costs;
            this.allSubCosts = [];
            // if (this.allCosts) {

            this.allCosts.forEach((c) => {
              this.selectedActivity = c;
              this.calculateActivityTotal(null);
              if (c.mainCostId !== null)
                this.allSubCosts.push(c);
            });
            // }
            // this.addClubsCount();
            this.getClubsCount();
            this.getClubActivitiesCount();
            this.selectedActivity = null;
            this.prepareForm();
          }
          console.log("DATA FROM PIP STORE MANIPULATION:--", data.selectedProject, this.allCosts, this.allSubCosts, this.clubs);
        }
      })
    );

  }

  addClubsCount() {
    for (let i = 0; i < this.clubs.length; i++) {
      let key1 = this.clubs[i];
      key1.numOfActivities = 0;
      for (let j = 0; j < this.allCosts.length; j++) {
        let key2 = this.allCosts[j];
        if (key2.clubbed && key2.clubId === key1._id) {
          key1.numOfActivities = key1.numOfActivities + 1
        }
      }
    }
    console.log("COUBS AFTER COUNT:--", this.clubs);
  }

  getCostingHeads() {
    this._projectService.getCostingHeads().subscribe(
      (result: any) => {
        console.log("DATA BASE RESULTS ALL COSTS:--", result);
        this.allCosts = [];
        // this.allCosts = result;
        // let costs = JSON.parse(result.costs);
        // let clubs = JSON.parse(result.clubs);
        for (let i = 0; i < result.length; i++) {
          var cost = {
            title: result[i].name,
            quarters: [],
            _id: result[i].id,
            mainCostId: null,
            clubbed: false,
            clubId: null
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
      clubbed: false,
      clubId: null
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
      clubbed: false,
      clubId: null
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
    const options = {
      title: 'This quarter is over!',
      message: 'click "OK" to close',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };

    if (this.quarterSelection > object.quarter) {
      this._confirmModelService.open(options);
    } else {

      object.value = !object.value;
      let club = null;
      if (item.clubbed) {
        club = this.getClub(item.clubId);
        club ? item.totalCost = (club.fipShare + club.ndrmfShare) : null;
        item.quarters = item.quarters.map((c) => {
          if (c.quarter === object.quarter) {
            return {
              ...c,
              data: {
                ...c.data,
                available: null,
                startDate: null,
                endDate: null,
                description: null,
                latitude: null,
                longitude: null,
                ndrmfShare: club ? club.ndrmfShare : null,
                fipShare: club ? club.fipShare : null,
                isProcurement: club ? club.isProcurement : false,
                procurementHeads: club ? club.procurementHeads : null,
                rfSubmitData: null,
                tehsil: null,
                district: null,
                uc: null,
                city: null
              }
            }
          }
          return c;
        })
      } else {
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
          tehsil: null,
          district: null,
          uc: null,
          city: null
        }
      }
      // this.clearCostDetails();
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
        tehsil: object.data.tehsil,
        district: object.data.district,
        uc: object.data.uc,
        city: object.data.city,

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
        object.data.tehsil = result.tehsil;
        object.data.district = result.district;
        object.data.uc = result.uc;
        object.data.city = result.city;
      }
    });
  }

  saveCostings() {
    // setFormValue(this.allCosts);
    this.apiLoading = true;
    if (this.loggedUser.role === 'admin') {
      // for (let i = 0; i < this.allCosts.length; i++) {
      //   let object = {
      //     "glCode": this.allCosts[i].glCode,
      //     "name": this.allCosts[i].title
      //   }
      //   console.log("KEY TO SAVE:--", object);
      // var object 
      this._projectService.addCostingHeads(this.allCosts).subscribe(
        result => {
          this.apiLoading = false;
          console.log("RESULT ADDING COSTING HEADS:--", result);
        },
        error => {
          this.apiLoading = false;
          console.log("ERROR ADDING COSTING HEADS:--", error);
        }
      );
      // }
    } else {
      var object = {
        // implementationPlan: JSON.stringify({ costs: this.allCosts, clubs: this.clubs })
        implementationPlan: JSON.stringify({ costs: this.allCosts, clubs: this.clubs })
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
          this._primaryAppraisalFormsStore.addPipToProject(this.allCosts, this.clubs);
        },
        error => {
          this.apiLoading = false;
          console.log("ERROR ADDING PROJECT IMPLEMENTATION PLAN:--", error);
        }
      );
    }
  }

  filterChanged(item) {
    console.log("FILTER CHANGED:--", this.filterType);
  }

  openQuarterDetails(object, item) {
    console.log("OPEN QUARTER DETAILS:--", object, item);
    this.selectedQuarter = object;
    this.selectedActivity = item;
    // this.set
    this._costDetailsStore.setDefaults(
      item.title,
      object.quarter,
      object.data,
      null,
      true,
      item.clubbed || false,
      item.clubId || null,
      this.getClubData(item.clubId) || null,
    );
    document.querySelector('#myTopElement5').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  openProgressDetails(object, item) {
    console.log("OPEN QUARTER DETAILS:--", object, item);
    // this.selectedQuarter = object;
    if (!object.progress) {
      object.progress = {
        generalProgress: null,
        generalProgressStatus: null,
        financialProgress: null,
        financialProgressStatus: null,
        financialProgressAmount: null,
        procProgress: null,
        procProgressStatus: null,
        mneProgress: null,
        mneProgressStatus: null,
      }
    }
    this.selectedQuarter = object;
    this._costDetailsStore.setDefaults(
      item.title,
      object.quarter,
      object.data,
      object.progress,
      false,
      item.clubbed || false,
      item.clubId || null,
      this.getClubData(item.clubId) || null,
    );
    document.querySelector('#myTopElement5').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  calculateActivityTotal($event) {
    var activityCount = 0;
    var club = null;
    if (this.selectedActivity.clubbed === false) {
      for (let i = 0; i < this.selectedActivity.quarters.length; i++) {
        var key = this.selectedActivity.quarters[i];
        if (key.data) {
          console.log("SHARES:---", key.data.fipShare, key.data.ndrmfShare);
          activityCount = activityCount + key.data.ndrmfShare + key.data.fipShare
        }
      }
      this.selectedActivity.totalCost = activityCount;
    } else {
      club = this.getClub(this.selectedActivity.clubId);
      this.selectedActivity.totalCost = club ? club.ndrmfShare + club.fipShare : null;
    }

    console.log("CALCULATE TOTAL FOR ACTIVITY:---", this.selectedActivity, $event, activityCount);
  }

  getClubData(id) {
    for (let i = 0; i < this.clubs.length; i++) {
      if (this.clubs[i]._id === id) {
        return this.clubs[i];
        break;
      }

    }
  }

  quarterSelectionChange($event) {
    console.log("QUARTER SELCTION CHANGED:---", parseInt($event.target.value));
    setTimeout(() => {
      this._authStore.setCurrentQuarter(parseInt($event.target.value));
    });
    // this._costDetailsStore.setDefaults(null, null, null, null, true);
  }

  ngOnDestroy() {
    this._costDetailsStore.setDefaults(
      null,
      null,
      null,
      null,
      true,
      false,
      null,
      null
    );
    this.Subscription.unsubscribe();
  }

  clearCostDetails() {
    this._costDetailsStore.setDefaults(
      null,
      null,
      null,
      null,
      true,
      false,
      null,
      null
    );
  }

  addNewClub(values) {
    var object = {
      title: values.title,
      ndrmfShare: values.ndrmfShare,
      fipShare: values.fipShare,
      isProcurement: values.isProcurement,
      procurementHeads: values.procurementHeads,
      _id: new Date().toISOString(),
      randomColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
      numOfActivities: 0,
    }
    this.clubs.push(object);
    console.log("ALL CLUBS:--", this.clubs);
    this.clubForm.reset();
  }

  clubEntry(cost, clubItem) {
    cost.clubbed = true;
    cost.clubId = clubItem._id;
    clubItem.numOfActivities = clubItem.numOfActivities + 1;
    for (let i = 0; i < this.allCosts.length; i++) {
      let key = this.allCosts[i];
      if (key._id === cost._id) {
        key.clubbed = true;
        key.clubId = clubItem._id;
        key.quarters = key.quarters.map(element => {
          if (element.value) {
            return {
              ...element,
              data: {
                ...element.data,
                fipShare: clubItem.fipShare,
                ndrmfShare: clubItem.ndrmfShare,
                isProcurement: clubItem.isProcurement,
                procurementHeads: clubItem.procurementHeads,
              }
            }
          }
          return element;
        });
        this.selectedActivity = key;
        this.calculateActivityTotal(null);
        break;
      }
    }
    this.clearCostDetails();
    console.log("CLUB ENTRY:---", cost, clubItem);
  }
  
  unClubEntry(cost, clubItem) {
    cost.clubbed = false;
    let club = this.getClub(cost.clubId);
    club.numOfActivities = club.numOfActivities - 1;
    cost.clubId = null;
    console.log("CLUB ENTRY:---", cost, clubItem, club);
    for (let i = 0; i < this.allCosts.length; i++) {
      let key = this.allCosts[i];
      if (key._id === cost._id) {
        key.clubbed = false;
        key.clubId = null;
        key.totalCost = 0;
        key.quarters = key.quarters.map(element => {
          if (element.value) {
            return {
              ...element,
              data: {
                ...element.data,
                fipShare: null,
                ndrmfShare: null,
                isProcurement: false,
                procurementHeads: [],
              }
            }
          }
          return element;
        });
        break;
      }
    }
    this.clearCostDetails();
  }

  getClubColor(clubId) {
    let color = null;
    if (this.clubs) {
      for (let i = 0; i < this.clubs.length; i++) {
        let key = this.clubs[i];
        if (clubId === key._id) {
          // console.log("CLUB CALLED:--", key, clubId);
          color = key.randomColor;
          break;
        }
      }
      return color;
    }
  }

  getClubTitle(clubId) {
    let title = null;
    if (this.clubs) {
      for (let i = 0; i < this.clubs.length; i++) {
        let key = this.clubs[i];
        if (clubId === key._id) {
          // console.log("CLUB CALLED:--", key, clubId);
          title = key.title;
          break;
        }
      }
      return title;
    }
  }

  getClub(clubId) {
    let club = null;
    if (this.clubs) {
      for (let i = 0; i < this.clubs.length; i++) {
        let key = this.clubs[i];
        if (clubId === key._id) {
          // console.log("CLUB CALLED:--", key, clubId);
          club = key;
          break;
        }
      }
      return club;
    }
  }

  getClubsCount() {
    let clubsCount = 0;
    for (let i = 0; i < this.clubs.length; i++) {
      let key = this.clubs[i];
      if (key.numOfActivities > 0) {
        clubsCount = clubsCount + (key.fipShare + key.ndrmfShare);
      }
    }
    console.log("ALL CLUBS COUNT:--", clubsCount);
    this.totalClubsCount = clubsCount;
  }

  getClubActivitiesCount() {
    let unClubActivitiesCount = 0;
    let unClubEntries = [];
    for (let i = 0; i < this.allCosts.length; i++) {
      let key = this.allCosts[i];
      if (!key.children && !key.clubbed) {
        unClubEntries.push(key);
        unClubActivitiesCount = unClubActivitiesCount + key.totalCost;
      }
    }
    console.log("ALL NON CLUBBED ENTRIES COUNT:--", unClubActivitiesCount, unClubEntries);
    this.totalUnClubbedEntriesCount = unClubActivitiesCount;
  }

  selectClub(item) {
    if (this.selectedClub === null) {
      this.selectedClub = item;
    } else {
      if (this.selectedClub._id === item._id)
        this.selectedClub = null;
      else
        this.selectedClub = item;
    }
    console.log("SEELCTED CLUB:--", this.selectedClub);
  }

}
