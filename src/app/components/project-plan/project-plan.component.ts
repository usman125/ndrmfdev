import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import * as _ from "lodash";
import { CostSummaryStore } from '../../stores/cost-summary/cost-summary-store';
import { Subscription } from "rxjs";
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { SettingsService } from '../../services/settings.service';


export class FoodNode {
  title: string;
  children?: FoodNode[];
  financers: [];
  totalCost: number;
  _id: string;
  procurement: boolean;
  procurementCost: number;
  mainCostId: string;
  rfEntry: boolean;
  rfEntryData: any;
}

/** Flat node with expandable and level information */
export class ExampleFlatNode {
  expandable: boolean;
  procurement: boolean;
  financers: [];
  name: string;
  totalCost: number;
  procurementCost: number;
  level: number;
  _id: string;
  mainCostId: string;
  rfEntry: boolean;
  rfEntryData: any;
}



@Component({
  selector: 'app-project-plan',
  templateUrl: './project-plan.component.html',
  styleUrls: ['./project-plan.component.css'],
  providers: [CostSummaryStore]
})
export class ProjectPlanComponent implements OnInit, OnDestroy, AfterViewInit {
  allFinancers: any = [
    {
      "title": "ndrmf",
      "cost": 0,
      "_id": "cost2020-03-30T10:29:11.96Z",
      "totalCost": 0
    },
    {
      "title": "fip",
      "cost": 0,
      "_id": "cost2020-03-30T10:29:14.93Z",
      "totalCost": 0
    }
  ];
  financer = null;
  allCosts: any = [];
  cost = null;
  allSubCosts: any = [];
  subcost = null;
  totalSummaryCost = 0;
  mainCostId: any = null;
  Subscription: Subscription = new Subscription();
  financersMonthsArray = [];
  nodeLevelMap = {};
  quarters: any = null;
  months: any = null;
  monthsCount: any = 0;
  setMargin: boolean = false;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<ExampleFlatNode>(true /* multiple */);
  procurementCost: number = 0;
  totalCostSummary: number = 0;

  testingCosts = [];

  parentToCheck: any = null;
  dummyCosts: any = [];


  @Input() show: any = null;

  rfForm: any = null;

  options: Object = {
    submitMessage: "",
    disableAlerts: true,
    noAlerts: true
  }

  constructor(
    public _CostSummaryStore: CostSummaryStore,
    public _settingsService: SettingsService,
    // public _checklistDatabase: ChecklistDatabase,
  ) {

    // this.testingCosts = NODES;

    var years = 3;
    var months = 12 * years;
    var quarters = months / 3;
    var quartersObject = {
      title: '',
      months: [],
      totalCost: 0,
      _id: 'quarter' + new Date().toISOString(),
    }
    this.quarters = quarters;
    this.financersMonthsArray = [];
    for (let i = 0; i < months; i++) {
      var monthsData = [];
      var object = {
        title: '',
        financers: [],
        totalCost: 0,
        _id: 'quarter' + new Date().toISOString(),
      }
      var count = 0;
      for (let j = 0; j < 3; j++) {
        var financers = this.allFinancers.map((c) => {
          var object2 = {
            title: c.title,
            cost: c.cost,
            _id: c._id,
            totalCost: c.totalCost,
          }
          return object2;
        })
        object.title = (i + 1).toString();
        object.financers = financers;
      }
      this.financersMonthsArray.push(object);
    }

  }

  getRfMeta() {
    this._settingsService.getProcessTemplate('PROJECT_PROPOSAL').subscribe(
      (result: any) => {
        result.sections.forEach(element => {
          if (element.sectionName === "Results Framework"){
            this.rfForm = JSON.parse(element.template);
            console.log("RESULT FROM TEMPLATES:--", this.rfForm);
          }
        });
      },
      error => {
        console.log("ERROR FROM TEMPLATES:--", error);
      }
    );
  }

  private _transformer = (node: FoodNode, level: number) => {

    // const existingNode = this.nestedNodeMap.get(node);
    // const flatNode = existingNode && existingNode.name === node.title
    //   ? existingNode
    //   : new ExampleFlatNode();
    // flatNode.name = node.title;
    // flatNode.level = level;
    // flatNode.expandable = !!node.children;
    // flatNode.totalCost = node.totalCost,
    //   flatNode.financers = node.financers,
    //   flatNode._id = node._id,
    //   flatNode.mainCostId = node.mainCostId,
    //   flatNode.procurement = node.procurement,
    //   flatNode.procurementCost = node.procurementCost || 0,
    //   this.flatNodeMap.set(flatNode, node);
    // this.nestedNodeMap.set(node, flatNode);
    // return flatNode;
    return {
      totalCost: node.totalCost,
      financers: node.financers,
      _id: node._id,
      mainCostId: node.mainCostId,
      procurement: node.procurement,
      procurementCost: node.procurementCost || 0,
      name: node.title,
      level: level,
      rfEntry: node.rfEntry,
      rfEntryData: node.rfEntryData,
      expandable: !!node.children && true,
    };
  }

  ngOnInit(): void {
    this.getRfMeta();
    // this.Subscription.add(
    // this._CostSummaryStore.state$.subscribe((data) => {
    // console.log("DATA FROM STORE:--", data.costs);
    // this.dataSource.data = data.costs;
    // this.treeControl.expandAll();
    //   })
    // );
  }

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ExampleFlatNode, FoodNode>();
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<FoodNode, ExampleFlatNode>();
  /** A selected parent node to be inserted */
  selectedParent: ExampleFlatNode | null = null;
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );

  getChildren = (node: FoodNode): FoodNode[] => node.children;
  getLevel = (node: ExampleFlatNode) => node.level;
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;



  mainCostChanged($event) {
    // for (let i = 0; i < this.allCosts.length; i++) {
    //   if ($event === this.allCosts[i]._id) {
    //     console.log("SELECTED COST:---", this.allCosts[i]);
    //     break;
    //   }
    // }
  }


  AddFinancer() {
    this.allFinancers.push({
      title: this.financer,
      cost: 0,
      _id: 'cost' + new Date().toISOString(),
      totalCost: 0,
    });
    for (let i = 0; i < this.allCosts.length; i++) {
      var obejct = {
        title: this.financer,
        cost: 0,
        _id: 'cost' + new Date().toISOString(),
        totalCost: 0,
      }
      this.allCosts[i].financers.push(obejct);
    }
    this.financer = null;
  }

  AddCost() {
    var cost = {
      title: this.cost,
      financers: [],
      _id: 'cost' + new Date().toISOString(),
      totalCost: 0,
      procurement: false,
      procurementCost: 0,
      showChildren: true,
      mainCostId: null,
      showInput: true,
      rfEntry: false,
      rfEntryData: null,
    }
    var allArray = [];
    for (let i = 0; i < this.financersMonthsArray.length; i++) {
      var test2 = {
        title: '',
        financers: [],
        totalCost: 0,
        _id: '',
      }
      var financers = [];
      for (let j = 0; j < this.financersMonthsArray[i].financers.length; j++) {
        var test = {
          title: this.financersMonthsArray[i].financers[j].title,
          cost: this.financersMonthsArray[i].financers[j].cost,
          _id: this.financersMonthsArray[i].financers[j]._id,
          totalCost: this.financersMonthsArray[i].financers[j].totalCost,
        }
        financers.push(test);
      }
      test2.title = this.financersMonthsArray[i].title;
      test2.financers = financers;
      test2.totalCost = this.financersMonthsArray[i].totalCost;
      test2._id = this.financersMonthsArray[i]._id;
      allArray.push(test2);
    }
    cost.financers = allArray;
    // this.allCosts.forEach(c => {
    //   // return {
    //   //   ...c,
    //   //   rfEntry: c.rfEntry,
    //   //   rfEntryData: c.rfEntryData,
    //   // }
    //   cost.
    // })
    this.allCosts.push(cost);
    this.cost = null;
    this.prepareForm(cost);
  }

  AddSubcost() {
    var subcost = {
      title: this.subcost,
      financers: [],
      totalCost: 0,
      procurement: false,
      procurementCost: 0,
      showChildren: true,
      _id: 'subcost' + new Date().toISOString(),
      mainCostId: this.mainCostId,
      showInput: true,
      rfEntry: false,
      rfEntryData: null,
    }

    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.mainCostId === this.allCosts[i]._id) {
        this.allCosts[i].showInput = false;
        this.allCosts[i].totalCost = 0;
        if (this.allCosts[i].procurement) {
          this.allCosts[i].procurement = false;
          this.allCosts[i].procurementCost = 0;
          this.totalProcurementCost();
        }
        if (this.allCosts[i].rfEntry) {
          this.allCosts[i].rfEntry = this.allCosts[i].rfEntry;
          this.allCosts[i].rfEntryData = this.allCosts[i].rfEntryData;
          this.totalProcurementCost();
        }
        if (this.allCosts[i].mainCostId) {
          this.fixParentCosts(this.allCosts[i]);
        }
        break;
      }
    }

    var allArray = [];
    for (let i = 0; i < this.financersMonthsArray.length; i++) {
      var test2 = {
        title: '',
        financers: [],
        totalCost: 0,
        _id: '',
      }
      var financers = [];
      for (let j = 0; j < this.financersMonthsArray[i].financers.length; j++) {
        var test = {
          title: this.financersMonthsArray[i].financers[j].title,
          cost: this.financersMonthsArray[i].financers[j].cost,
          _id: this.financersMonthsArray[i].financers[j]._id,
          totalCost: this.financersMonthsArray[i].financers[j].totalCost,
        }
        financers.push(test);
      }
      test2.financers = financers;
      test2.title = this.financersMonthsArray[i].title;
      test2.totalCost = this.financersMonthsArray[i].totalCost;
      test2._id = this.financersMonthsArray[i]._id;
      allArray.push(test2);
    }
    this.subcost = null;
    this.mainCostId = null;
    subcost.financers = allArray;
    this.allSubCosts.push(subcost);
    this.allCosts.push(subcost);
    this.prepareForm(subcost);

    // this.costChnaged(subcost, null);
  }

  fixParentCosts(cost) {
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === cost.mainCostId) {
        this.allCosts[i].procurementCost = 0;
        this.allCosts[i].totalCost = 0;
        if (this.allCosts[i].mainCostId) {
          this.fixParentCosts(this.allCosts[i])
        } else {
          this.allCosts[i].procurementCost = this.allCosts[i].totalCost;
        }
      }
    }
  }


  prepareForm(subcost) {
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
    console.log("ALL COSTS FROM PREPARE FORM:--\n:--", test2, this.allCosts);
    this.dataSource.data = test2;
    this.treeControl.expandAll();
    this.dummyCosts = test2;
    this.allParentTotal();
  }

  checkParentTotal(node) {
    var parentTotal = 0;
    var mainNode = null;
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === node._id) {
        mainNode = this.allCosts[i];
      }
      if (this.allCosts[i].mainCostId === node._id) {
        parentTotal = parentTotal + this.allCosts[i].totalCost;
      }
    }
    node.totalCost = parentTotal;
    mainNode.totalCost = parentTotal;
    // console.log("NODE TO ADDED:--", node, mainNode);
    if (node.mainCostId) {
      var mainNode2 = this.getParentNode(node);
      // console.log("NODE 2 TO ADDED:--", mainNode2);
      this.checkParentTotal(mainNode2);
    }
  }

  costChnaged(node, item) {
    let result = this.search(node._id, this.allCosts);
    var count = 0;
    for (let i = 0; i < result.financers.length; i++) {
      for (let j = 0; j < result.financers[i].financers.length; j++) {
        count = count + parseInt(result.financers[i].financers[j].cost);
      }
    }
    node.totalCost = count;
    result.totalCost = count;

    if (node.procurement) {
      node.procurementCost = count;
      result.procurementCost = count;
      this.findProcuremntCost(node);
      // this.totalProcurementCost();
    }

    var leafTotal = 0;
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i].mainCostId === result.mainCostId) {
        leafTotal = leafTotal + this.allCosts[i].totalCost;
      }
    }

    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === result.mainCostId) {
        let result = this.search(this.allCosts[i]._id, this.allCosts);
        result.totalCost = leafTotal;
        this.allCosts[i].totalCost = leafTotal;
        break;
      }
    }

    var parent = this.getParentNode(node);
    if (parent) {
      parent.totalCost = leafTotal;
      if (parent.mainCostId) {
        var parent2 = this.getParentNode(parent);
        this.calculateParentTotal(parent2);
      }
    }
    this.allParentTotal();

  }

  calculateParentTotal(parent) {
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === parent._id) {
        var allCount = 0;
        var procurementCount = 0;
        if (this.allCosts[i].children) {

          for (let j = 0; j < this.allCosts[i].children.length; j++) {
            allCount = allCount + this.allCosts[i].children[j].totalCost;
          }
          parent.totalCost = allCount;
          this.allCosts[i].totalCost = allCount;
        }
      }
    }
    if (parent.mainCostId) {
      var parent2 = this.getParentNode(parent);
      this.calculateParentTotal(parent2);
    }
  }

  getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  search(title, parent) {
    const stack = [parent];
    while (stack.length) {
      const node = stack.pop();
      let i = 0;
      while (i < node.length) {
        if (node[i]._id === title) return node[i];
        i++;
      }
      node.children && stack.push(...node.children);
    }
    return stack.pop() || null;
  }

  getDivider(i) {
    if ((i + 1) % 4 === 0) {
      this.setMargin = true;
      return true;
    }
    this.setMargin = false;
    return false;
  }
  getMonth(i) {
    if ((i + 1) % 2 === 0) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  ngAfterViewInit() {
    // this.tree.treeControl.expandAll();
  }


  // /** Whether all the descendants of the node are selected. */
  // descendantsAllSelected(node: ExampleFlatNode): boolean {
  //   const descendants = this.treeControl.getDescendants(node);
  //   const descAllSelected = descendants.every(child =>
  //     this.checklistSelection.isSelected(child)
  //   );
  //   return descAllSelected;
  // }

  // /** Whether part of the descendants are selected */
  // descendantsPartiallySelected(node: ExampleFlatNode): boolean {
  //   const descendants = this.treeControl.getDescendants(node);
  //   const result = descendants.some(child => this.checklistSelection.isSelected(child));
  //   return result && !this.descendantsAllSelected(node);
  // }

  // /** Toggle the to-do item selection. Select/deselect all the descendants node */
  // todoItemSelectionToggle(node: ExampleFlatNode): void {
  //   this.checklistSelection.toggle(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   this.checklistSelection.isSelected(node)
  //     ? this.checklistSelection.select(...descendants)
  //     : this.checklistSelection.deselect(...descendants);

  //   // Force update for the parent
  //   descendants.every(child =>
  //     this.checklistSelection.isSelected(child)
  //   );
  //   this.checkAllParentsSelection(node);
  // }

  // /* Checks all the parents when a leaf node is selected/unselected */
  // checkAllParentsSelection(node: ExampleFlatNode): void {
  //   let parent: ExampleFlatNode | null = this.getParentNode(node);
  //   while (parent) {
  //     this.checkRootNodeSelection(parent);
  //     parent = this.getParentNode(parent);
  //   }
  // }

  // /** Check root node checked state and change it accordingly */
  // checkRootNodeSelection(node: ExampleFlatNode): void {
  //   const nodeSelected = this.checklistSelection.isSelected(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   const descAllSelected = descendants.every(child =>
  //     this.checklistSelection.isSelected(child)
  //   );
  //   if (nodeSelected && !descAllSelected) {
  //     this.checklistSelection.deselect(node);
  //   } else if (!nodeSelected && descAllSelected) {
  //     this.checklistSelection.select(node);
  //   }
  // }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: ExampleFlatNode): void {
    node.procurement = !node.procurement;
    // console.log("NODE TO ADD IN PROCUREMENT:---", node);
    this.findProcuremntCost(node);
    // this.checklistSelection.toggle(node);
    // this.checkAllParentsSelection(node);
  }
  
  rfEntryToggle(node: ExampleFlatNode): void {
    node.rfEntry = !node.rfEntry;
    // var result = this.getParentCost(node);
    // result.rfEntry = node.rfEntry;
    // result.rfEntryData = node.rfEntryData;
    for (let i=0; i<this.allCosts.length; i++){
      if (this.allCosts[i]._id === node._id){
        this.allCosts[i].rfEntry = node.rfEntry;
        this.allCosts[i].rfEntryData = node.rfEntryData;
         console.log("NODE TO ADD IN LINK RF:---", node, this.allCosts[i]);
      }
    }
    // if (node.rfEntry === true){
    //   node.rfEntry = false;
    // }else{
    //   node.rfEntry = true;
    // }
    // this.findProcuremntCost(node);
    // this.checklistSelection.toggle(node);
    // this.checkAllParentsSelection(node);
  }


  findProcuremntCost = (node) => {
    var result = null;
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === node._id) {
        if (!node.procurement) {
          node.procurementCost = 0;
          this.allCosts[i].procurementCost = 0;
        }
        this.allCosts[i].procurement = node.procurement;
        this.calculateProcurement(node);
        // console.log("COST BE ADDED:--", this.allCosts[i], node.procurement);
        break;
      }
    }
  }


  calculateProcurement(node) {
    var procurementCost = 0;
    var parent = this.getParentCost(node);
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i].procurement) {
        procurementCost = procurementCost + this.allCosts[i].totalCost;
        this.allCosts[i].procurementCost = this.allCosts[i].totalCost;
      }
    }

    if (parent) {
      parent.procurementCost = this.getChildProcurementCosts(parent);
    }
    var testNode = this.getParentNode(node);
    if (testNode) {
      testNode.procurementCost = parent.procurementCost
    } else {
      if (parent) parent.procurementCost = 0
    }
    this.procurementCost = procurementCost;
  }


  // fixParentProcure(parent, node){
  //   var testNode = this.getParentNode(node);
  //   if (testNode) {
  //     testNode.procurementCost = parent.procurementCost
  //     var testNode2 = this.getParentNode(testNode2);
  //     this.fixParentProcure()
  //   } else {
  //     parent.procurementCost = 0
  //   }
  // }

  getParentCost(cost) {
    var result = null;
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === cost.mainCostId) {
        result = this.allCosts[i];
      }
    }
    return result;
  }

  getChildProcurementCosts(cost) {
    var result = [];
    var count = 0;
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i].mainCostId === cost._id) {
        count = count + this.allCosts[i].procurementCost;
      }
    }
    return count;
  }

  totalProcurementCost() {
    var result = 0;
    for (let i = 0; i < this.allCosts.length; i++) {
      console.log(this.allCosts[i].title, this.allCosts[i].procurementCost)
      if (this.allCosts[i].procurement) {
        result = result + this.allCosts[i].procurementCost;
      }
    }
    this.procurementCost = result;
  }


  allParentTotal() {
    const stack = [this.dummyCosts];
    let count = 0;
    while (stack.length) {
      const node = stack.pop();
      let i = 0;
      while (i < node.length) {
        count = count + node[i].totalCost;
        i++;
      }
      node.children && stack.push(...node.children);
    }
    // console.log("ALL PARENTS COUNT:--", count);
    this.totalCostSummary = count;
    return stack.pop() || null;
  }

  onSubmit($event, node){
    console.log("RF SUBMITTED:---", $event);
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === node._id) {
        // this.allCosts[i].rfEntry = node.rfEntry;
        this.allCosts[i].rfEntryData = $event.data;
        node.rfEntryData = $event.data;
        console.log("NODE TO ADD IN LINK RF:---", node, this.allCosts[i]);
      }
    }
  }
}


