import { Component, OnInit, Input } from '@angular/core';
import { QprSectionsStore } from '../../stores/qpr-sections/qpr-sections-store';
import { Subscription } from 'rxjs';
import { QprStore } from '../../stores/qpr/qpr-store';
import { QprService } from '../../services/qpr.service';
import { ConfirmModelService } from '../../services/confirm-model.service';
import { FormControl } from '@angular/forms';
import { PrimaryAppraisalFormsStore } from '../../stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { AuthStore } from '../../stores/auth/auth-store';
import * as _ from 'lodash';
import { CostDetailsStore } from '../../stores/cost-details/cost-details-store';

@Component({
  selector: 'app-qpr-sections',
  templateUrl: './qpr-sections.component.html',
  styleUrls: ['./qpr-sections.component.css'],
  providers: [ConfirmModelService]
})
export class QprSectionsComponent implements OnInit {

  loggedUser: any = null;
  Subscription: Subscription = new Subscription();
  qprSections: any = null;
  qprSectionStats: any = null;

  ndrmfAllocation: any = null;
  fipAllocation: any = null;
  ndrmfDisbursment: any = null;
  fipContributed: any = null;
  ndrmfExpenditure: any = null;
  fipExpenditure: any = null;

  procCosts: any = null;
  quarterCosts: any = null;
  allProjectCosts: any = null;
  rfCosts: any = null;

  allLoading: boolean = false;
  singleLoading: boolean = false;
  // loggedUser: any = JSON.parse(localStorage.getItem('user'));

  @Input() ndrmfShare = 0;
  @Input() fipShare = 0;
  @Input() quarter: any = 0;
  @Input() qprId;

  comments: any = null;

  currentQuarter: any = null;
  selectedQuarter: any = null;
  selectedProject: any = null;

  constructor(
    public _qprSectionsStore: QprSectionsStore,
    public _qprStore: QprStore,
    public _qprService: QprService,
    public _authStore: AuthStore,
    public _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    public _confirmModelService: ConfirmModelService,
    public _costDetailsStore: CostDetailsStore,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(
      this._qprSectionsStore.state$.subscribe(data => {
        // this.qprSections = [];
        let pendingCount = 0;
        let completedCount = 0;
        this.qprSections = data.sections.map((c) => {
          if (c.reviewStatus === null || c.reviewStatus === 'Pending')
            pendingCount = pendingCount + 1;
          if (c.reviewStatus === 'Completed')
            completedCount = completedCount + 1;
          return {
            ...c,
            template: typeof (c.template) === 'string' ? JSON.parse(c.template) : c.template,
            data: (typeof (c.data) === 'string' && c.data !== null) ? JSON.parse(c.data) : c.data,
          }
        })
        this.qprSectionStats = {
          pendingCount,
          completedCount
        }
        console.log("QPR SECTIONS:---", this.qprSectionStats, this.qprSections, this.quarter, this.ndrmfShare, this.fipShare, this.qprId);
      })
    );
    this.Subscription.add(
      this._qprStore.state$.subscribe(data => {
        // this.qprSections = [];
        console.log("QPR SECTIONS STATS:---", data.stats);
        this.qprSectionStats = data.stats;
      })
    );
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        console.log("AUTH DATA IN QPR SECTION:---", data.auth);
        if (data.auth.currentQuarter) {
          // this.makeDisbursmentPerformanceData(data.selectedProject);
          this.currentQuarter = data.auth.currentQuarter;
        }
      })
    );
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        if (data.selectedProject !== null && data.selectedProject !== undefined) {
          this.selectedProject = data.selectedProject;
          this.makeDisbursmentPerformanceData(data.selectedProject);
        }
      })
    );
    this.Subscription.add(
      this._costDetailsStore.state$.subscribe(data => {
        if (data.cost.costData !== null) {
          if (data.cost.update) {
            console.log("****UPDATE DATA*****\n", data, this.selectedQuarter);
          } else {
            if (data.cost.progressSubmitted) {
              console.log("****UPDATE PROGRESS QPR SECTIONS*****\n", data);
              if (this.selectedProject.implementationPlan) {
                for (let i = 0; i < this.selectedProject.implementationPlan.costs.length; i++) {
                  let x = this.selectedProject.implementationPlan.costs[i];
                  if (x._id === data.cost._id) {
                    x.quarters[this.currentQuarter - 1].progress = data.cost.progress;
                    console.log("****UPDATE PROGRESS FOR COST IN QPR SECTION*****\n", x);
                    break;
                  }
                }
                this._primaryAppraisalFormsStore.addPipToProject(
                  this.selectedProject.implementationPlan.costs,
                  this.selectedProject.implementationPlan.clubs
                );
              }
            }
          }
        }
      })
    );
  }

  makeDisbursmentPerformanceData(selectedProject) {
    let clubCosts = [];
    let soloCosts = [];
    let quarterCosts = [];
    let procTestCosts = [];
    let rfCosts = [];
    let allProjectCosts = [];
    let ndrmfAllocation = 0;
    let fipAllocation = 0;
    let ndrmfDisbursment = 0;
    let fipContributed = 0;
    let ndrmfExpenditure = 0;
    let fipExpenditure = 0;
    if (selectedProject.implementationPlan && selectedProject.implementationPlan.costs) {
      for (let i = 0; i < selectedProject.implementationPlan.costs.length; i++) {
        let x = selectedProject.implementationPlan.costs[i];
        if (x.quarters[this.currentQuarter - 1] &&
          x.quarters[this.currentQuarter - 1].value &&
          x.quarters[this.currentQuarter - 1].data !== null) {
          if (x.clubbed && !x.children) {
            clubCosts.push(x);
            quarterCosts.push(x);
          }
          if (!x.clubbed && !x.children) {
            soloCosts.push(x);
            quarterCosts.push(x);
          }
        }
        if (!x.children) {
          for (let j = 0; j < x.quarters.length; j++) {
            let temp = x.quarters[j];
            if (temp.value && temp.data !== null) {
              x.lastActiveQuarter = temp.quarter;
            }
          }
          allProjectCosts.push(x);
        }
      }

      clubCosts = _.chain(clubCosts)
        .groupBy('clubId')
        .map((val, _id) => {
          let clubData = _.find(selectedProject.implementationPlan.clubs, { '_id': _id });
          return {
            children: val,
            clubData: clubData,
            _id: _id,
          }
        })
        .value();

      for (let i = 0; i < soloCosts.length; i++) {
        let key = soloCosts[i];
        ndrmfAllocation = ndrmfAllocation + key.quarters[this.currentQuarter - 1].data.ndrmfShare;
        fipAllocation = fipAllocation + key.quarters[this.currentQuarter - 1].data.fipShare;
        if (key.quarters[this.currentQuarter - 1].data.isProcurement) {
          key.isProcurement = key.quarters[this.currentQuarter - 1].data.isProcurement;
          key.procurementHeads = key.quarters[this.currentQuarter - 1].data.procurementHeads;
          key.procHead = key.quarters[this.currentQuarter - 1].data.procurementHeads.h_id;
          key.procurementMethod = key.quarters[this.currentQuarter - 1].data.procurementMethod;
          key.procurementOptions = key.quarters[this.currentQuarter - 1].data.procurementOptions;
          key.ndrmfShare = key.quarters[this.currentQuarter - 1].data.ndrmfShare;
          key.fipShare = key.quarters[this.currentQuarter - 1].data.fipShare;
          procTestCosts.push(key);
        }
      }

      for (let i = 0; i < clubCosts.length; i++) {
        let key = clubCosts[i];
        ndrmfAllocation = ndrmfAllocation + (key.clubData.ndrmfShare * key.children.length);
        fipAllocation = fipAllocation + (key.clubData.fipShare * key.children.length);
        if (key.clubData.isProcurement) {
          for (let j = 0; j < key.children.length; j++) {
            key.children[j].isProcurement = key.clubData.isProcurement;
            key.children[j].procurementHeads = key.clubData.procurementHeads;
            key.children[j].procHead = key.clubData.procurementHeads.h_id;
            key.children[j].procurementMethod = key.clubData.procurementMethod;
            key.children[j].procurementOptions = key.clubData.procurementOptions;
            key.children[j].ndrmfShare = key.clubData.ndrmfShare;
            key.children[j].fipShare = key.clubData.fipShare;
            procTestCosts.push(key.children[j]);
          }
        }
      }

      for (let i = 0; i < quarterCosts.length; i++) {
        let x = quarterCosts[i];
        if (x.quarters[this.currentQuarter - 1] &&
          x.quarters[this.currentQuarter - 1].progress) {
          ndrmfDisbursment = ndrmfDisbursment + x.quarters[this.currentQuarter - 1].progress.disbursedNdrmf;
          fipContributed = fipContributed + x.quarters[this.currentQuarter - 1].progress.contributedFip;
          ndrmfExpenditure = ndrmfExpenditure + x.quarters[this.currentQuarter - 1].progress.expenditureNdrmf;
          fipExpenditure = fipExpenditure + x.quarters[this.currentQuarter - 1].progress.expenditureFip;
        }
        if (x.addRf) {
          x.rfSubmitData = x.quarters[this.currentQuarter - 1].data.rfSubmitData;
          var output = null;
          var subOutput = null;
          var indicator = null;
          var indicatorValue = null;
          if (x.rfSubmitData.type === "output") {
            output = x.rfSubmitData.selectOutput ? x.rfSubmitData.selectOutput.split('-')[1] : null;
            subOutput = output ? x.rfSubmitData['subOutputs' + output] : null;
            indicator = subOutput ? subOutput.split('-')[1] : null;
            indicatorValue = indicator ? x.rfSubmitData['indicator' + indicator] : 'Unknown-Kpi';
          }
          x.indicatorValue = indicatorValue;
          rfCosts.push(x);
        }
      }

      if (procTestCosts.length) {
        console.log("GROUP BY PROC COSTS:--", procTestCosts);
        this.procCosts = _.chain(procTestCosts)
          .groupBy('procHead')
          .map((val, _id) => {
            return {
              children: val,
              _id: _id,
            }
          })
          .value();
      }

      this.ndrmfAllocation = ndrmfAllocation;
      this.ndrmfDisbursment = ndrmfDisbursment;
      this.ndrmfExpenditure = ndrmfExpenditure;

      this.fipAllocation = fipAllocation;
      this.fipContributed = fipContributed;
      this.fipExpenditure = fipExpenditure;

      this.quarterCosts = quarterCosts;
      this.allProjectCosts = allProjectCosts;
      this.rfCosts = rfCosts;

      // this.procCosts = procCosts;

      console.log(
        "SELECTED PROJECT IS:---", selectedProject,
        "\QUARTER COSTS ARE:---", quarterCosts,
        "\nSOLO COSTS ARE:---", soloCosts,
        "\nCLUBBED COSTS ARE:---", clubCosts,
        "\nPROCUREMENT COSTS ARE:---", this.procCosts,
        "\nRESULT FRAMEWORK COSTS ARE:---", rfCosts,
        "\nALL PROJECT COSTS ARE:---", allProjectCosts,
        "\nCURRENT QUARTER:---", this.currentQuarter,
        "\nNDRMF ALLOCATION IS:---", ndrmfAllocation,
        "\nNDRMF DISBURSED IS:---", ndrmfDisbursment,
        "\nNDRMF EXPENDITURE IS:---", ndrmfExpenditure,
        "\nFIP ALLOCATION IS:---", fipAllocation,
        "\nFIP CONTRIBUTION IS:---", fipContributed,
        "\nFIP EXPENDITURE IS:---", fipExpenditure,
      );
    }

  }


  onSubmit($event, sectionId) {
    let body = {
      id: sectionId,
      data: JSON.stringify($event.data)
    }
    console.log("FORM SUBMIT DATA:---", $event, this.qprId, body);

    this._qprService.saveSection(
      this.qprId,
      body
    ).subscribe(
      (result: any) => {
        console.log("RESULT SUBMITTING SECTION:--", result);
        this._qprSectionsStore.submitSection(
          sectionId,
          $event.data
        );
      },
      error => {
        console.log("RESULT SUBMITTING SECTION:--", error);
      }
    );
  }

  assignTasks(id, type) {
    const options = {
      title: 'Please fill the information!',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
    };
    // this.apiLoading = false;
    if (type === 'all') {

      this._confirmModelService.open(options);
      // console.log("ASSIGN ALL TASKS:---", type);
      this._confirmModelService.confirmed().subscribe(
        result => {
          if (result) {
            // let body = {
            //   startDate: result.startDate,
            //   endDate: result.endDate,
            //   comments: result.comments,
            // }
            console.log("CONFIRMED DATA IS:---", result);
            for (let i = 0; i < this.qprSections.length; i++) {
              let key = this.qprSections[i];
              if (key.reviewStatus === 'Completed' || key.reviewStatus === null) {
                this.allLoading = true;
                this._qprService.addTaskForSection(key.id, result).subscribe(
                  (queryResult: any) => {
                    console.log("RESULT ADDING TASK:---", queryResult);
                    this._qprSectionsStore.assignTasksToSmes(key.id);
                    this.allLoading = false;
                  },
                  error => {
                    console.log("RESULT ADDING TASK:---", error);
                  }
                );
              }
            }
          }
        }
      )
    } else {
      // console.log("ASSIGN ALL TASKS:---", type);
      this._confirmModelService.open(options);
      this._confirmModelService.confirmed().subscribe(
        result => {
          if (result) {
            this.singleLoading = true;
            console.log("CONFIRMED DATA IS:---", result);
            this._qprService.addTaskForSection(id, result).subscribe(
              (queryResult: any) => {
                console.log("RESULT ADDING TASK:---", queryResult);
                this._qprSectionsStore.assignTasksToSmes(id);
                this.singleLoading = false;
              },
              error => {
                console.log("RESULT ADDING TASK:---", error);
              }
            );
          }
        }
      )
    }
  }

  addQprSectionReview(item) {
    this.allLoading = true;
    console.log("REVIEW TO ADD FOR SECTION:--", item);
    let body: any = null;
    if (item.review === null && (item.reviewStatus === null || item.reviewStatus === 'Pending'))
      body = { comments: this.comments };
    if (item.review !== null && (item.reviewStatus === 'Pending'))
      body = { comments: item.review.comments };
    this._qprService.addReview(item.id, body).subscribe(
      (result: any) => {
        console.log("API RESULT ADDING REVIEW:--", result);
        const options = {
          title: result.message,
          message: '',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._qprSectionsStore.submitSectionReview(item.id, body);
        this.allLoading = false;
        this._confirmModelService.open(options);
      }
    );
  }

  getProcLabel(item) {
    // console.log("GET PROC LABRL:--", item.children[0].procurementHeads.label);
    return item.children[0].procurementHeads.label;
  }

  getFipLastQuarter(item, type) {
    for (let i = this.currentQuarter - 1; i >= 0; i--) {
      let key = this.getQuater(item, i);
      if (key) {
        // console.log("PREVIOUS QUARTER IS:--", key);
        if (key.progress) {
          if (type === 'FIP')
            return key.progress.expenditureFip;
          else if (type === 'NDRMF')
            return key.progress.expenditureNdrmf;
        }
        if (type === 'RF')
          return key.progress ? key.progress.generalTotalAchieved : null;
      }
    }
    return null;
  }

  getQuater(item, index) {
    // console.log("CHECK QUARTER FOR:--", index - 1);
    if (item.quarters[index - 1] && item.quarters[index - 1].value) {
      return item.quarters[index - 1];
    }
    return null;
  }

  getProcEstimates(items, type) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].label === 'Contract Award') {
        return type === 'planned' ?
          { date: items[i].planned, reason: items[i].reason } :
          { date: items[i].actual, reason: items[i].reason };
      }
    }
  }

  submitQpr() {
    for (let i = 0; i < this.allProjectCosts.length; i++) {
      let x = this.allProjectCosts[i];
      if (x.quarters[this.currentQuarter - 1]) {
        if (x.quarters[this.currentQuarter - 1].progress) {
          if (x.quarters[this.currentQuarter - 1].progress.generalProgressStatus === 'delayed' ||
            x.quarters[this.currentQuarter - 1].progress.generalProgressStatus === 'notAchieved') {
            if (x.lastActiveQuarter === this.currentQuarter) {
              if (x.quarters[x.lastActiveQuarter]) {
                // x.quarters[x.lastActiveQuarter].data = x.quarters[this.currentQuarter - 1].data;
                // x.quarters[x.lastActiveQuarter].data.delayed = true;
                // x.quarters[x.lastActiveQuarter].value = true;
                this._primaryAppraisalFormsStore.addDelayedQuarter(
                  x._id,
                  x.quarters[this.currentQuarter - 1].data,
                  x.lastActiveQuarter
                );
                // console.log("ADDING QUARTER TO DELAY ACTIVITY:--", x.quarters[x.lastActiveQuarter]);
              }
            }
          }
        }
      }
    }
    console.log("SUBMIT QPR:---", this.selectedProject.implementationPlan.costs);
  }

}
