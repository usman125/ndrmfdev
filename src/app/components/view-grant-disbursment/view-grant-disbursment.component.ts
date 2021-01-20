import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { GrantDisbursmentsService } from 'src/app/services/grant-disbursment.service';
import { UserService } from 'src/app/services/user.service';
import { SingleGrantDisbursmentsStore } from 'src/app/stores/single-grant-disbursment/single-grant-disbursment-store';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-view-grant-disbursment',
  templateUrl: './view-grant-disbursment.component.html',
  styleUrls: ['./view-grant-disbursment.component.css'],
  providers: [ConfirmModelService]
})
export class ViewGrantDisbursmentComponent implements OnInit, OnDestroy {



  @ViewChild(MatAccordion) accordion: MatAccordion;

  selectedRequest: any = null;
  Subscription: Subscription = new Subscription();

  step: any = null;
  filterQuery: any = null;
  loggedUser: any = JSON.parse(localStorage.getItem('user'));

  costSelections: any = [];
  currentReviewsList: any = [];
  costsData = new FormControl();
  reviewUsers = new FormControl();

  apiCosts: any = null;
  allUsers: any = null;
  reviewersArray: any = null;
  initialAdvanceStats: any = null;
  reviewText = new FormControl();

  controlReviewUserForm: any = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _grantDisbursmentsService: GrantDisbursmentsService,
    private _singleGrantDisbursmentsStore: SingleGrantDisbursmentsStore,
    private _confirmModelService: ConfirmModelService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.reviewUsers.setValidators([Validators.required]);
    this.reviewText.setValidators([Validators.required]);
    this._activatedRoute.paramMap.subscribe(params => {
      // this.selectedRequest = ;
      this.getDisbursmentDetails(params.get("requestId"));
      if (this.loggedUser.role !== 'fip')
        this.getAllUsers();
    });
    this.Subscription.add(
      this._singleGrantDisbursmentsStore.state$.subscribe(
        data => {
          if (data.disbursment) {
            // console.log("REQUEST IN VIEW*********:---", data.disbursment,)
            this.selectedRequest = data.disbursment;

            if (this.selectedRequest.initialAdvance.status === 'Completed') {
              // this.selectedRequest && this.selectedRequest.initialAdvance &&
              //   typeof (this.selectedRequest.initialAdvance.data) === 'string' ?
              //   this.apiCosts = JSON.parse(this.selectedRequest.initialAdvance.data) :
              //   this.apiCosts = this.selectedRequest.initialAdvance.data;
              this.apiCosts = this.selectedRequest.initialAdvance.data;
            }
            let pendingCount = 0;
            let completedCount = 0;
            if (this.selectedRequest.initialAdvance.initialAdvanceReviewsList !== null) {

              for (let i = 0; i < this.selectedRequest.initialAdvance.initialAdvanceReviewsList.length; i++) {
                let key = this.selectedRequest.initialAdvance.initialAdvanceReviewsList[i];
                if (key.status === 'Pending') {
                  pendingCount = pendingCount + 1
                } else {
                  completedCount = completedCount + 1;
                }
              }
            }
            this.initialAdvanceStats = {
              pendingCount,
              completedCount
            }

            this.controlReviewUserForm = this.selectedRequest.quarterAdvanceList[this.step];

            if (this.controlReviewUserForm) {
              if (this.controlReviewUserForm.quarterAdvanceReviewsList !== null) {
                pendingCount = 0;
                completedCount = 0;
                for (let i = 0; i < this.controlReviewUserForm.quarterAdvanceReviewsList.length; i++) {
                  let key = this.controlReviewUserForm.quarterAdvanceReviewsList[i];
                  if (key.status === 'Pending') {
                    pendingCount = pendingCount + 1
                  } else {
                    completedCount = completedCount + 1;
                  }
                }
                this.controlReviewUserForm.stats = {
                  pendingCount,
                  completedCount,
                }
              }

              if (this.controlReviewUserForm.data === null)
                this.reviewUsers.disable({ onlySelf: true });
              else
                this.reviewUsers.enable({ onlySelf: true });

              if (this.controlReviewUserForm.status === 'Completed')
                this.costsData.disable({ onlySelf: true });
              else
                this.costsData.enable({ onlySelf: true });

            } else {

              if (this.apiCosts === null)
                this.reviewUsers.disable({ onlySelf: true });
              else
                this.reviewUsers.enable({ onlySelf: true });
            }
          }
          console.log("RESULT SINGLE GRANT DISBURSMENT:---", this.selectedRequest,
            this.costSelections,
            this.loggedUser,
            this.initialAdvanceStats,
            this.controlReviewUserForm
          );
        }
      )
    );
  }

  getCostSelection(implementationPlan) {
    let pip = null;
    typeof (implementationPlan) === 'string' ?
      pip = JSON.parse(implementationPlan).costs :
      pip = implementationPlan.costs;
    this.costSelections = pip.filter((c) => {
      return !c.children;
    });
  }

  getDisbursmentDetails(id) {
    // console.log("GET DISBURSSMENT DETAILS:---", id);
    this._grantDisbursmentsService.getSingleGrantDisbursment(id).subscribe(
      (result: any) => {
        // console.log("RESULT SINGLE GRANT DISBURSMENT:---", result);
        if (result && this.loggedUser.role === 'fip') {
          this.getCostSelection(result.implementationPlan);
        }
        result.quarterAdvanceList = result.quarterAdvanceList.map(element => {
          return {
            ...element,
            data: element.data ? JSON.parse(element.data) : null
          }
        });
        result.initialAdvance.data = result.initialAdvance.data ? JSON.parse(result.initialAdvance.data) : result.initialAdvance.data;
        this._singleGrantDisbursmentsStore.addGrantDisbursment(result);
      },
      error => {
        console.log("RESULT SINGLE GRANT DISBURSMENT:---", error);
      }
    );
    // this._router.navigate(['view-grant-disbursment', element.id]);
  }

  addDataCosts() {
    if (this.apiCosts === null) {
      this.apiCosts = this.costsData.value.map((c) => {
        // delete c.children;
        return {
          ...c,
          amount: c.totalCost ? c.totalCost : null,
        };
      });
    } else {
      let flag = false;
      for (let i = 0; i < this.apiCosts.length; i++) {
        var key = this.apiCosts[i];
        if (key._id === this.costsData.value._id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        // console.log("DO NOT MATCH:---", this.costsData.value);
        this.apiCosts.push(this.costsData.value);
      }
    }
    this.costsData.reset();
  }

  addQuarterData() {
    if (this.selectedRequest.quarterAdvanceList[this.step].data === null) {
      this._singleGrantDisbursmentsStore.addDataToQuarterAdvance(
        this.selectedRequest.quarterAdvanceList[this.step].id,
        this.costsData.value
      );
    } else {
      let flag = false;
      for (let i = 0; i < this.selectedRequest.quarterAdvanceList[this.step].data.length; i++) {
        var key = this.selectedRequest.quarterAdvanceList[this.step].data[i];
        if (key._id === this.costsData.value._id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        this._singleGrantDisbursmentsStore.addEntryToQuarterAdvance(
          this.selectedRequest.quarterAdvanceList[this.step].id,
          this.costsData.value
        );
      }
    }
    this.costsData.reset();
  }

  submitInitalAdvance() {
    let totalAmount = 0;
    for (let i = 0; i < this.apiCosts.length; i++) {
      let key = this.apiCosts[i];
      if (key.amount)
        totalAmount = totalAmount + key.amount;
    }
    let body = {
      data: JSON.stringify(this.apiCosts),
      amount: totalAmount,
    }
    console.log("SUBMIT INITAL ADVANCE:---", body);
    this._grantDisbursmentsService.submitInitialAdvance(this.selectedRequest.id, body).subscribe(
      (result: any) => {
        console.log("RESULT AFTER SUBMITTEING:---", result);
      },
      error => {
        const options = {
          title: 'Failure!',
          message: error.error.message,
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };

        this._confirmModelService.open(options);

        // this._confirmModelService.confirmed().subscribe(confirmed => {
        //   if (confirmed) {
        //     console.log("CONFIRMED FROM MODEL", confirmed);
        //   }
        // });
        console.log("RESULT AFTER SUBMITTEING:---", error);
      }
    )
  }

  submitQuarterAdvance() {
    let totalAmount = 0;
    for (let i = 0; i < this.selectedRequest.quarterAdvanceList[this.step].data.length; i++) {
      let key = this.selectedRequest.quarterAdvanceList[this.step].data[i];
      if (key.amount)
        totalAmount = totalAmount + key.amount;
    }
    let body = {
      data: JSON.stringify(this.selectedRequest.quarterAdvanceList[this.step].data),
      amount: totalAmount,
      id: this.selectedRequest.quarterAdvanceList[this.step].id
    }
    console.log("SUBMIT QUARTER ADVANCE:---", body, this.selectedRequest.quarterAdvanceList[this.step]);
    this._grantDisbursmentsService.submitQuarterAdvance(
      this.selectedRequest.id,
      body
    ).subscribe((result: any) => {
      console.log("SUBMIT QUARTER ADVANCE QUERY RESULT:---", result);
      const options = {
        title: result.message,
        message: '"OK" to exit!',
        cancelText: 'CANCEL',
        confirmText: 'OK',
        add: true,
        confirm: false,
      };
      this._confirmModelService.open(options);
      this._singleGrantDisbursmentsStore.submitQuarterAdvance(
        this.selectedRequest.quarterAdvanceList[this.step].id
      );
    }, error => {
      console.log("SUBMIT QUARTER ADVANCE QUERY RESULT:---", error);

    })
  }

  assignUsersForReviews(type) {
    console.log("ASSIGN USERS FOR REVIEWS:---", this.reviewUsers.value);
    const options = {
      title: 'Assign Users For Reviews!',
      message: 'Select a due date and click "OK"',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
    };


    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log("CONFIRMED FROM ASSIGN REVIEWS MODEL", confirmed);
        let reviewersArray = [];
        let storeArray = [];
        if (this.reviewUsers.value) {
          for (let i = 0; i < this.reviewUsers.value.length; i++) {
            var object = {
              id: null,
              assignee: this.reviewUsers.value[i],
              comments: null,
              assigned: false,
              status: 'Pending',
              subStatus: null,
            }
            storeArray.push(object);
            reviewersArray.push(this.reviewUsers.value[i].id)
          }
        }
        this.reviewersArray = reviewersArray;
        console.log("REVIEW ARRAY:--", reviewersArray);
        if (type === 'initial') {
          let body = {
            reviewers: this.reviewersArray,
            initialAdvanceId: this.selectedRequest.initialAdvance.id,
            comments: confirmed.comments,
          }
          this.assignInitialAdvanceReviews(body, storeArray);

        }
        if (type === 'quarter') {
          let body = {
            reviewers: this.reviewersArray,
            initialAdvanceId: this.selectedRequest.quarterAdvanceList[this.step].id,
            comments: confirmed.comments,
          }
          this.assignQuarterAdvanceReviews(body, storeArray);
        }
      }
    });
  }

  assignInitialAdvanceReviews(body, storeArray) {
    this._grantDisbursmentsService.assignInitialAdvanceReviews(
      this.selectedRequest.id,
      body
    ).subscribe(
      (result: any) => {
        console.log("RESULT ASSIGNING REVIEWS:---", result);
        this.reviewUsers.reset();
        this._singleGrantDisbursmentsStore.addToAdvanceReviewsList(storeArray);
        const options = {
          title: result.message,
          message: 'Press OK to canel!',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
      }, error => {
        console.log("RESULT ASSIGNING REVIEWS:---", error);
      }
    );

  }

  assignQuarterAdvanceReviews(body, storeArray) {
    this._grantDisbursmentsService.assignQuarterAdvanceReviews(
      this.selectedRequest.id,
      body
    ).subscribe(
      (result: any) => {
        console.log("RESULT ASSIGNING REVIEWS:---", result);
        this._singleGrantDisbursmentsStore.addToQuarterAdvanceReviewsList(body.initialAdvanceId, storeArray);
        const options = {
          title: result.message,
          message: 'Press OK to canel!',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        this.reviewUsers.reset();
      }, error => {
        console.log("RESULT ASSIGNING REVIEWS:---", error);
      }
    );

  }

  getAllUsers() {
    this._userService.getAllDepartmentUsers().subscribe(
      (result: any) => {
        console.log("RESULT DEPARTMENT USERS:--", result);
        this.allUsers = [];
        for (var key of Object.keys(result)) {
          let object = {
            name: null,
            users: []
          }
          console.log(key + " -> " + result[key])
          object.name = key;
          for (let i = 0; i < result[key].length; i++) {
            object.users.push(result[key][i]);
          }
          this.allUsers.push(object);
        }
        console.log("USERS FOR DROP DOWN:---", this.allUsers);
      },
      error => {
        // this._authStore.removeLoading();
        console.log("ERROR FROM ALL USERS:--", error);
      }
    );
  }

  checkDisabled(item) {
    // console.log("CHECK DISABLED CALLED:--", item);
    if (this.selectedRequest.initialAdvance.initialAdvanceReviewsList !== null) {

      for (let i = 0; i < this.selectedRequest.initialAdvance.initialAdvanceReviewsList.length; i++) {
        let key = this.selectedRequest.initialAdvance.initialAdvanceReviewsList[i];
        if (key.assignee.id === item.id && key.status === 'Pending') {
          return true;
        }
      }
      return false;
    }
  }

  checkQuarterUserDisabled(item) {
    if (this.selectedRequest.quarterAdvanceList[this.step]) {
      if (this.selectedRequest.quarterAdvanceList[this.step].quarterAdvanceReviewsList !== null) {

        // console.log("CHECK DISABLED CALLED:--", this.selectedRequest.quarterAdvanceList[this.step]);
        for (let i = 0; i < this.selectedRequest.quarterAdvanceList[this.step].quarterAdvanceReviewsList.length; i++) {
          let key = this.selectedRequest.quarterAdvanceList[this.step].quarterAdvanceReviewsList[i];
          // if (key) {
          if (key.assignee.id === item.id && key.status === 'Pending') {
            return true;
          }
          // }
        }
        return false;
      }
    }
  }

  getReviewsList(reviewsList) {
    console.log("GET REVIEWS LIST:----", reviewsList);
    this.currentReviewsList = reviewsList;
  }

  disableCostSelection(status) {
    if (status === 'Completed')
      return true;
    return false;
  }

  compareSmeObjects(o1: any, o2: any): boolean {
    // console.log("COMPARE SME:--", o1, o2)
    if (o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  submitReview(item) {
    console.log("REVIEW TO SUBMIT FOR ITEM:----", item);
    this._grantDisbursmentsService.submitInitialAdvanceReview(
      this.selectedRequest.id,
      {
        id: item.id,
        comments: item.comments,
      }
    ).subscribe((result: any) => {
      console.log("RESULT AFTER REVIEW SUBMIT:----", result);
      this._singleGrantDisbursmentsStore.submitInitialAdvanceReview(item.id);
    }, error => {
      console.log("RESULT AFTER REVIEW SUBMIT:----", error);
    });
  }

  approveInitialAdvance(type) {
    console.log("APPROVE INTIAL ADVANCE********", type);
  }

  rejectInitialAdvance(type) {
    console.log("REJECT INTIAL ADVANCE********", type);
  }

  ngOnDestroy() {
    this._singleGrantDisbursmentsStore.setDefaults();
    this.Subscription.unsubscribe();
  }

  setStep(id, selectionType) {
    console.log("CURRENT STEP:---", id);
    // @setTimeout(() => {})
    this.step = id;
    if (this.step !== null) {
      if (selectionType === 'quarter') {
        this._singleGrantDisbursmentsStore.setSelectionType({ type: selectionType, key: id })
      }
      if (selectionType === 'initial') {
        this._singleGrantDisbursmentsStore.setSelectionType({ type: selectionType, key: id })
      }
    }
  }

  nextStep(selectionType) {
    console.log("CURRENT STEP:---", this.step);
    this.step = this.step + 1;
    // if (selectionType === 'quarter') {
    this._singleGrantDisbursmentsStore.setSelectionType({ type: selectionType, key: this.step })
    // }
  }

}
