import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Injectable } from '@angular/core';
import * as _ from "lodash";
import { CostSummaryStore } from '../../stores/cost-summary/cost-summary-store';
import { Subscription } from "rxjs";
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
// import { NODES } from './../tree/mock-nodes';

export class FoodNode {
  title: string;
  children?: FoodNode[];
  financers: [];
  totalCost: number;
  _id: string;
  procurement: boolean;
  procurementCost: number;
  mainCostId: string;
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
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<FoodNode[]>([]);

  get data(): FoodNode[] { return this.dataChange.value; }

  constructor() {
    // this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    // const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    // this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): FoodNode[] {
    return Object.keys(obj).reduce<FoodNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FoodNode();
      node.title = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.title = value;
        }
      }
      // console.log("VALUE FROM BUILD TREE:---", node, accumulator);

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: FoodNode, cost: any) {
    if (parent && parent.children) {
      parent.children.push(cost as FoodNode);
      this.dataChange.next(this.data);
    }
  }

  setParentNode(parent: FoodNode) {
    var result = this.data;
    result.push(parent);
    this.dataChange.next(result);
  }

  setState(nextState): void {
    this.dataChange.next(nextState);
  }

  updateItem(node: FoodNode, name: string) {
    node.title = name;
    this.dataChange.next(this.data);
  }
}


@Component({
  selector: 'app-project-plan',
  templateUrl: './project-plan.component.html',
  styleUrls: ['./project-plan.component.css'],
  providers: [CostSummaryStore, ChecklistDatabase]
})
export class ProjectPlanComponent implements OnInit, OnDestroy, AfterViewInit {
  allFinancers: any = [
    {
      "title": "ndrmf",
      "cost": 0,
      "_id": "cost2020-03-30T10:29:11.964Z",
      "totalCost": 0
    },
    {
      "title": "fip",
      "cost": 0,
      "_id": "cost2020-03-30T10:29:14.293Z",
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
  dummyCosts: FoodNode[] = [];
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

  constructor(
    public _CostSummaryStore: CostSummaryStore,
    public _checklistDatabase: ChecklistDatabase,
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
    for (let i = 0; i < quarters; i++) {
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
      expandable: !!node.children && true,
    };
  }

  ngOnInit(): void {
    this.Subscription.add(
      this._CostSummaryStore.state$.subscribe((data) => {
        // console.log("DATA FROM STORE:--", data.costs);
        // this.dataSource.data = data.costs;
        // this.treeControl.expandAll();
      })
    );
    this.Subscription.add(
      this._checklistDatabase.dataChange.subscribe((data) => {
        // this.dataSource.data = data;
        console.log("DATA AFTER ADDING SUBSCRIPTION:---", this.dataSource);
        this.testingCosts = data;
        // this.treeControl.expandAll();
      })
    );
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
    console.log("MAIN COST ID:---", this.mainCostId);
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
    this.allCosts.push(cost);
    this.cost = null;
    this.prepareForm(cost);
    this.procurementCost = 0;
    // this.findCost(cost);
    this.totalProcurementCost();
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
    }


    for (let i=0; i< this.allCosts.length;i++){
      if (this.mainCostId === this.allCosts[i]._id){
        this.allCosts[i].showInput = false;
        this.allCosts[i].totalCost = 0;
        if (this.allCosts[i].procurement){
          this.allCosts[i].procurement = false;
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
    // this._checklistDatabase.setParentNode(subcost);

    // var result = this.treeControl.getLevel(subcost);
    this.procurementCost = 0;
    // this.findCost(subcost);
    this.totalProcurementCost();

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
    console.log("ALL COSTS FROM PREPARE FORM:--\n:--", this.allCosts);
    var test2 = _.filter(this.allCosts, { mainCostId: null })
    this.dataSource.data = test2;
    this.treeControl.expandAll();
    // this.allCosts = test2;
    // this._checklistDatabase.dataChange.next(test2);
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

    if (node.procurement){
      node.procurementCost = count;
      result.procurementCost = count;
      this.findCost(node);
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

  }

  calculateParentTotal(parent) {
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === parent._id) {
        var allCount = 0;
        var procurementCount = 0;
        for (let j = 0; j < this.allCosts[i].children.length; j++) {
          allCount = allCount + this.allCosts[i].children[j].totalCost;
        }
        parent.totalCost = allCount;
        this.allCosts[i].totalCost = allCount;
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
    // if (node.procurement === false){
    //   node.procurement = true;
    // }else {
    //   node.procurement = false;
    // }
    console.log("NODE TO ADD IN PROCUREMENT:---", node);
    this.findCost(node);
    // this.checklistSelection.toggle(node);
    // this.checkAllParentsSelection(node);
  }


  findCost = (node) => {
    var result = null;
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i]._id === node._id) {
        this.allCosts[i].procurement = node.procurement;
        this.calculateProcurement(node);
        console.log("COST BE ADDED:--", this.allCosts[i], node.procurement);
        break;
      }
    }
  }


  calculateProcurement(node) {
    var procurementCost = 0;
    var parent = this.getParentNode(node);
    for (let i = 0; i < this.allCosts.length; i++) {
      if (this.allCosts[i].procurement) {
        procurementCost = procurementCost + this.allCosts[i].totalCost;
      }
      this.allCosts[i].procurementCost = procurementCost;
    }
    // if (parent) this.calculateParentTotal(parent);
    this.procurementCost = procurementCost;
  }

  getChilds(cost){
    var result = [];
    for (let i = 0; i< this.allCosts.length;i++){
      if (this.allCosts[i].mainCostId === cost._id){
        result.push(this.allCosts[i]);
      }
    }
    return result;
  }
  
  totalProcurementCost(){
    var result =0;
    for (let i = 0; i< this.allCosts.length;i++){
      if (this.allCosts[i].procurement){
        result = result + this.allCosts[i].procurementCost;
      }
    }
    this.procurementCost = result;
  }

}


