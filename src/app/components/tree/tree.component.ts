import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { TreeNode } from './tree-node';
// import { NODES } from './mock-nodes';
import * as _ from 'lodash';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() treeData: TreeNode[];
  @Output() calculateTotal = new EventEmitter();

  setMargin: boolean = false;

  allData = _.clone(this.treeData, true);

  ngOnInit() {
    // this.treeData = NODES;
  }

  toggleChild(node) {
    node.showChildren = !node.showChildren;
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




  costChnaged(node, item) {
    // let result = this.search(node._id, this.treeData);
    // console.log(this.treeData, node);
    // this.calculateTotal = false;
    // console.log(this.allData);
    // var count = 0;
    // for (let i = 0; i < node.financers.length; i++) {
    //   for (let j = 0; j < node.financers[i].financers.length; j++) {
    //     count = count + parseInt(node.financers[i].financers[j].cost);
    //   }
    // }
    // console.log(node)
    // this.calculateTotal.emit({"valueChanged": JSON.stringify(node)});
    this.calculateTotal.emit({"valueChanged": "done"});
    // node.totalCost = count;
    // result.totalCost = count;

    // var leafTotal = 0;
    // for (let i = 0; i < this.treeData.length; i++) {
    //   if (this.treeData[i].mainCostId === result.mainCostId) {
    //     leafTotal = leafTotal + this.treeData[i].totalCost;
    //   }
    // }

    // for (let i = 0; i < this.treeData.length; i++) {
    //   if (this.treeData[i]._id === result.mainCostId) {
    //     let result = this.search(this.treeData[i]._id, this.treeData);
    //     result.totalCost = leafTotal;
    //     this.treeData[i].totalCost = leafTotal;
    //     break;
    //   }
    // }

    // var parent = this.getParentNode(node);
    // if (parent) {
    //   parent.totalCost = leafTotal;
    //   if (parent.mainCostId) {
    //     var parent2 = this.getParentNode(parent);
    //     this.calculateParentTotal(parent2);
    //   }
    // }
    // console.log("PARENT NODE IN TREE:--", parent);
    

  }

  // calculateParentTotal(parent) {
  //   for (let i = 0; i < this.treeData.length; i++) {
  //     if (this.treeData[i]._id === parent._id) {
  //       var allCount = 0;
  //       var procurementCount = 0;
  //       for (let j = 0; j < this.treeData[i].children.length; j++) {
  //         allCount = allCount + this.treeData[i].children[j].totalCost;
  //       }
  //       parent.totalCost = allCount;
  //       this.treeData[i].totalCost = allCount;
  //     }
  //   }
  //   if (parent.mainCostId) {
  //     var parent2 = this.getParentNode(parent);
  //     this.calculateParentTotal(parent2);
  //   }
  // }

  // getParentNode(node) {
  //   console.log("NODES:--",this.treeData);
  //   for (let i = 0; i <this.treeData.length;i++) {
  //     if (this.treeData[i]._id === node.mainCostId) {
  //       return this.treeData[i];
  //     }
  //   }
  //   return null;
  // }

  // search(title, parent) {
  //   const stack = [parent];
  //   while (stack.length) {
  //     const node = stack.pop();
  //     console.log(node);
  //     let i = 0;
  //     while (i < node.length) {
  //       if (node[i]._id === title) return node[i];
  //       i++;
  //     }
  //     node.children && stack.push(...node.children);
  //   }
  //   return stack.pop() || null;
  // }


}
