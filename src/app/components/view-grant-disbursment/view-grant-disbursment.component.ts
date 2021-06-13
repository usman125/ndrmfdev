import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { GrantDisbursmentsService } from 'src/app/services/grant-disbursment.service';
import { UserService } from 'src/app/services/user.service';
import { SingleGrantDisbursmentsStore } from 'src/app/stores/single-grant-disbursment/single-grant-disbursment-store';
import { MatAccordion } from '@angular/material/expansion';
import { AdvanceLiquidationItemStore } from 'src/app/stores/advance-liquidation-item/advance-liquidation-item-store';
import { options } from 'src/proc';

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

  apiCosts: any = null;
  allUsers: any = null;
  reviewersArray: any = null;
  initialAdvanceStats: any = null;

  costsData = new FormControl();
  reviewUsers = new FormControl();
  reviewText = new FormControl();

  controlReviewUserForm: any = null;

  selectedAdvanceLiquidation: any = null;
  selectedAdvanceItem: any = null;

  advanceForm: FormGroup;
  liquidationForm: FormGroup;

  ndrmfLiquidationSoes: any = [];
  fipLiquidationSoes: any = [];

  approveLoading: boolean = false;

  projectActualCosts: any = [];
  parentCosts: any = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _grantDisbursmentsService: GrantDisbursmentsService,
    private _singleGrantDisbursmentsStore: SingleGrantDisbursmentsStore,
    private _confirmModelService: ConfirmModelService,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _advanceLiquidationItemStore: AdvanceLiquidationItemStore,
  ) {
    this.advanceForm = this._formBuilder.group({
      'payeesName': [null],
      'payeesAddress': [null],
      'bankName': [null],
      'bankAddress': [null],
      'payeesAccount': [null],
      'swiftCode': [null],
      'specialPaymentInstruction': [null],
    });
    this.liquidationForm = this._formBuilder.group({
      'activity': [null],
      'vendorName': [null],
      'invoiceAmount': [null],
      'dateOfPayment': [null],
      'paidAmount': [null],
      'chequeNumber': [null],
      'remarks': [null],
    });
  }

  ngOnInit(): void {
    this.reviewUsers.setValidators([Validators.required]);
    this.costsData.setValidators([Validators.required]);
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

            // if (this.selectedRequest.initialAdvance.status === 'Completed' ||
            //   this.selectedRequest.initialAdvance.status === 'Re Assigned' ||
            //   this.selectedRequest.initialAdvance.status === 'Approved') {
            // this.selectedRequest && this.selectedRequest.initialAdvance &&
            //   typeof (this.selectedRequest.initialAdvance.data) === 'string' ?
            //   this.apiCosts = JSON.parse(this.selectedRequest.initialAdvance.data) :
            //   this.apiCosts = this.selectedRequest.initialAdvance.data;
            this.apiCosts = this.selectedRequest.initialAdvance.data;
            // }
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

              if (this.controlReviewUserForm.data === null) {
                this.reviewUsers.disable({ onlySelf: true });
              }
              else {
                this.reviewUsers.enable({ onlySelf: true });
              }

              if (this.controlReviewUserForm.status === 'Pending' ||
                this.controlReviewUserForm.status === null ||
                this.controlReviewUserForm.status === 'Re Assigned') {
                this.costsData.enable({ onlySelf: true });
              }
              else {
                this.costsData.disable({ onlySelf: true });
              }

            } else {

              if (this.apiCosts === null)
                this.reviewUsers.disable({ onlySelf: true });
              else
                this.reviewUsers.enable({ onlySelf: true });
            }
          }
          // console.log("RESULT SINGLE GRANT DISBURSMENT:---", this.selectedRequest,
          //   this.costSelections,
          //   this.loggedUser,
          //   this.initialAdvanceStats,
          //   this.controlReviewUserForm
          // );
        }
      )
    );
    this.Subscription.add(
      this._advanceLiquidationItemStore.state$.subscribe(data => {
        this.selectedAdvanceLiquidation = data.data;
        // this.selectedAdvanceItem = data;
        // if (this.selectedAdvanceLiquidation !== null && this.selectedAdvanceLiquidation.data !== null) {
        //   for (let i = 0; i < this.selectedAdvanceLiquidation.data.length; i++) {
        //     this.parentCosts = [];
        //     this.search(this.selectedAdvanceLiquidation.data[i]);
        //   }
        // }
        if (this.selectedAdvanceItem !== null &&
          (this.selectedAdvanceItem.subStatus === 'Approved' ||
            this.selectedAdvanceItem.subStatus === 'Marked To PO' ||
            this.selectedAdvanceItem.status === 'Completed')) {
          this.advanceForm.patchValue({
            payeesName: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.payeesName : null,
            payeesAddress: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.payeesAddress : null,
            bankName: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.bankName : null,
            bankAddress: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.bankAddress : null,
            payeesAccount: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.payeesAccount : null,
            swiftCode: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.swiftCode : null,
            specialPaymentInstruction: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.specialPaymentInstruction : null,
          })
          this.advanceForm.disable({ onlySelf: true });
          this.costsData.disable({ onlySelf: true });
        } else {
          this.advanceForm.patchValue({
            payeesName: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.payeesName : null,
            payeesAddress: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.payeesAddress : null,
            bankName: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.bankName : null,
            bankAddress: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.bankAddress : null,
            payeesAccount: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.payeesAccount : null,
            swiftCode: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.swiftCode : null,
            specialPaymentInstruction: this.selectedAdvanceItem !== null ? this.selectedAdvanceItem.specialPaymentInstruction : null,
          })
          this.costsData.enable({ onlySelf: true });
          this.advanceForm.enable({ onlySelf: true });
        }
        if (data.data !== null && data.data.fipSoes)
          this.fipLiquidationSoes = JSON.parse(JSON.stringify(data.data.fipSoes));
        if (data.data !== null && data.data.ndrmfSoes)
          this.ndrmfLiquidationSoes = JSON.parse(JSON.stringify(data.data.ndrmfSoes));
        console.log("SELECTED ADVANCE LIQUIDATION IS:----", data.data, this.selectedAdvanceLiquidation, this.selectedAdvanceItem);
      })
    );
  }

  getCostSelection(implementationPlan) {
    let pip = null;
    this.projectActualCosts = [];
    typeof (implementationPlan) === 'string' ?
      pip = JSON.parse(implementationPlan).costs :
      pip = implementationPlan.costs;
    typeof (implementationPlan) === 'string' ?
      this.projectActualCosts = JSON.parse(implementationPlan).costs :
      this.projectActualCosts = implementationPlan.costs;
    this.costSelections = pip.filter((c) => {
      c.parentCosts = this.search(c);
      return !c.children;
    });
    console.log("PROJECT ACTUAL COSTS:---", this.projectActualCosts, this.costSelections);
  }

  getDisbursmentDetails(id) {
    // console.log("GET DISBURSSMENT DETAILS:---", id);
    this._grantDisbursmentsService.getSingleGrantDisbursment(id).subscribe(
      (result: any) => {
        console.log("RESULT SINGLE GRANT DISBURSMENT:---", result);
        // if (result && this.loggedUser.role === 'fip') {
        this.getCostSelection(result.implementationPlan);
        // }
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
    this.approveLoading = true;
    let totalAmount = 0;
    for (let i = 0; i < this.apiCosts.length; i++) {
      let key = this.apiCosts[i];
      if (key.amount)
        totalAmount = totalAmount + key.amount;
    }
    let body = {
      data: JSON.stringify(this.apiCosts),
      amount: totalAmount,
      payeesName: this.advanceForm.value.payeesName,
      payeesAddress: this.advanceForm.value.payeesAddress,
      bankName: this.advanceForm.value.bankName,
      bankAddress: this.advanceForm.value.bankAddress,
      payeesAccount: this.advanceForm.value.payeesAccount,
      swiftCode: this.advanceForm.value.swiftCode,
      specialPaymentInstruction: this.advanceForm.value.specialPaymentInstruction,
    }
    // console.log("SUBMIT INITAL ADVANCE:---", body);
    this._grantDisbursmentsService.submitInitialAdvance(this.selectedRequest.id, body).subscribe(
      (result: any) => {
        // console.log("RESULT AFTER SUBMITTEING:---", result);
        this.approveLoading = false;
        console.log("RESULT AFTER SUBMITTEING:---", result);
        this.selectedAdvanceItem.status = "Under Review";
        const options = {
          title: result.message,
          message: '',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };

        this._confirmModelService.open(options);
      },
      error => {
        this.approveLoading = false;
        console.log("RESULT AFTER SUBMITTEING:---", error);
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
      }
    )
  }

  submitQuarterAdvance() {
    this.approveLoading = true;
    let totalAmount = 0;
    for (let i = 0; i < this.selectedRequest.quarterAdvanceList[this.step].data.length; i++) {
      let key = this.selectedRequest.quarterAdvanceList[this.step].data[i];
      if (key.amount)
        totalAmount = totalAmount + key.amount;
    }
    let body = {
      data: JSON.stringify(this.selectedRequest.quarterAdvanceList[this.step].data),
      amount: totalAmount,
      id: this.selectedRequest.quarterAdvanceList[this.step].id,
      payeesName: this.advanceForm.value.payeesName,
      payeesAddress: this.advanceForm.value.payeesAddress,
      bankName: this.advanceForm.value.bankName,
      bankAddress: this.advanceForm.value.bankAddress,
      payeesAccount: this.advanceForm.value.payeesAccount,
      swiftCode: this.advanceForm.value.swiftCode,
      specialPaymentInstruction: this.advanceForm.value.specialPaymentInstruction,
    }
    // console.log("SUBMIT QUARTER ADVANCE:---", body, this.selectedRequest.quarterAdvanceList[this.step]);
    this._grantDisbursmentsService.submitQuarterAdvance(
      this.selectedRequest.id,
      body
    ).subscribe((result: any) => {
      // console.log("SUBMIT QUARTER ADVANCE QUERY RESULT:---", result);
      this.approveLoading = false;
      this._singleGrantDisbursmentsStore.submitQuarterAdvance(
        this.selectedRequest.quarterAdvanceList[this.step].id,
        this.advanceForm.value.payeesName,
        this.advanceForm.value.payeesAddress,
        this.advanceForm.value.bankName,
        this.advanceForm.value.bankAddress,
        this.advanceForm.value.payeesAccount,
        this.advanceForm.value.swiftCode,
        this.advanceForm.value.specialPaymentInstruction,

      );
      const options = {
        title: result.message,
        message: '"OK" to exit!',
        cancelText: 'CANCEL',
        confirmText: 'OK',
        add: true,
        confirm: false,
      };
      this._confirmModelService.open(options);
    }, error => {
      this.approveLoading = false;
      const options = {
        title: 'An Error Occured!',
        message: 'Please Try Again!',
        cancelText: 'CANCEL',
        confirmText: 'OK',
        add: true,
        confirm: false,
      };
      this._confirmModelService.open(options);
      console.log("SUBMIT QUARTER ADVANCE QUERY RESULT:---", error);

    })
  }

  assignUsersForReviews(type) {
    // console.log("ASSIGN USERS FOR REVIEWS:---", this.reviewUsers.value);
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
        // console.log("CONFIRMED FROM ASSIGN REVIEWS MODEL", confirmed);
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
        // console.log("REVIEW ARRAY:--", reviewersArray);
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
        // console.log("RESULT ASSIGNING REVIEWS:---", result);
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
        // console.log("RESULT ASSIGNING REVIEWS:---", result);
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
        // console.log("USERS FOR DROP DOWN:---", this.allUsers);
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
    // console.log("GET REVIEWS LIST:----", reviewsList);
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
    // console.log("REVIEW TO SUBMIT FOR ITEM:----", item);
    this._grantDisbursmentsService.submitInitialAdvanceReview(
      this.selectedRequest.id,
      {
        id: item.id,
        comments: item.comments,
      }
    ).subscribe((result: any) => {
      // console.log("RESULT AFTER REVIEW SUBMIT:----", result);
      this._singleGrantDisbursmentsStore.submitInitialAdvanceReview(item.id);
    }, error => {
      console.log("RESULT AFTER REVIEW SUBMIT:----", error);
    });
  }

  approveInitialAdvance(request, type) {
    this.approveLoading = true;
    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    console.log("APPROVE INTIAL ADVANCE********", request, type);
    this._grantDisbursmentsService.approveInitialAdvance(request.id).subscribe(
      (result: any) => {
        console.log("RESULT AFTER APPROVE:---", result);
        this.approveLoading = false;
        this.selectedAdvanceItem.status === 'Approved';
        this.selectedAdvanceItem.subStatus === 'Approved';
        options.title = result.message;
        this._confirmModelService.open(options);
      },
      error => {
        console.log("RESULT AFTER APPROVE:---", error);
        this.approveLoading = false;
        const options = {
          title: 'Error Doing Operation!',
          message: 'Please contact system administrator',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
      }
    );
  }

  reassignInitialAdvance(request) {
    this.approveLoading = true;
    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    console.log("APPROVE INTIAL ADVANCE********", request);
    this._grantDisbursmentsService.reassignInitialAdvance(request.id).subscribe(
      (result: any) => {
        console.log("RESULT AFTER REASSIGN:---", result);
        this.approveLoading = false;
        this.selectedAdvanceItem.status = 'Re Assigned';
        this.selectedAdvanceItem.subStatus = 'Pending';
        options.title = result.message;
        this._confirmModelService.open(options);
      },
      error => {
        console.log("RESULT AFTER REASSIGN:---", error);
        this.approveLoading = false;
        const options = {
          title: 'Error Doing Operation!',
          message: 'Please contact system administrator',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
      }
    );
  }

  approveQuarterAdvance() {
    this.approveLoading = true;
    console.log("APPROVE QUARTER ADVANCE:********", this.selectedAdvanceItem);
    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this._grantDisbursmentsService.approveQuarterAdvance(this.selectedAdvanceItem.id).subscribe(
      (result: any) => {
        console.log("RESULT APPROVING QUARTER ADVANCE:--", result);
        this.approveLoading = false;
        this.selectedAdvanceItem.status = 'Approved';
        this.selectedAdvanceItem.subStatus = 'Approved';
        options.title = result.message;
        this._confirmModelService.open(options);
      },
      error => {
        console.log("RESULT APPROVING QUARTER ADVANCE:--", error);
        this.approveLoading = false;
        const options = {
          title: 'Error Doing Operation!',
          message: 'Please contact system administrator',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
      }
    );
  }

  rejectInitialAdvance(request, type) {
    console.log("REJECT INTIAL ADVANCE********", type);
  }

  approveQuarterLiquidation() {
    this.approveLoading = true;
    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this._grantDisbursmentsService.approveAdvanceLiquidation(this.selectedAdvanceLiquidation.id).subscribe(
      (result: any) => {
        this.approveLoading = false;
        options.title = result.message;
        this._confirmModelService.open(options);
        this.selectedAdvanceLiquidation.status = 'Approved';
        this.selectedAdvanceLiquidation.subStatus = 'Approved';
        console.log("APPROVE QUARTER ADVANCE LIQUIDATION:---", result);
      },
      error => {
        this.approveLoading = false;
        const options = {
          title: 'Error Doing Operation!',
          message: 'Please contact system administrator',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        console.log("APPROVE QUARTER ADVANCE LIQUIDATION:---", error);
      }
    )
  }

  reassignQuarterLiquidation() {
    this.approveLoading = true;
    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this._grantDisbursmentsService.reassignAdvanceLiquidation(this.selectedAdvanceLiquidation.id).subscribe(
      (result: any) => {
        this.approveLoading = false;
        options.title = result.message;
        this._confirmModelService.open(options);
        this._advanceLiquidationItemStore.setAdvanceLiquidationStatus('Re Assigned');
        // this.selectedAdvanceItem.subStatus = 'Approved';
        console.log("APPROVE QUARTER ADVANCE LIQUIDATION:---", result);
      },
      error => {
        this.approveLoading = false;
        const options = {
          title: 'Error Doing Operation!',
          message: 'Please contact system administrator',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        console.log("APPROVE QUARTER ADVANCE LIQUIDATION:---", error);
      }
    )
  }

  reassignQuarterAdvance() {
    this.approveLoading = true;
    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this._grantDisbursmentsService.reassignQuarterAdvance(this.selectedAdvanceItem.id).subscribe(
      (result: any) => {
        this.approveLoading = false;
        options.title = result.message;
        this._confirmModelService.open(options);
        this.selectedAdvanceItem.status = 'Re Assigned';
        this.selectedAdvanceItem.subStatus = 'Pending';
        // this.selectedAdvanceItem.subStatus = 'Approved';
        console.log("APPROVE QUARTER ADVANCE LIQUIDATION:---", result);
      },
      error => {
        this.approveLoading = false;
        const options = {
          title: 'Error Doing Operation!',
          message: 'Please contact system administrator',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        console.log("APPROVE QUARTER ADVANCE LIQUIDATION:---", error);
      }
    )
  }

  ngOnDestroy() {
    this._singleGrantDisbursmentsStore.setDefaults();
    this.Subscription.unsubscribe();
  }

  setStep(item, id, selectionType) {
    console.log("CURRENT STEP:---", item, id);
    // @setTimeout(() => {})
    this.currentReviewsList = [];
    this.fipLiquidationSoes = [];
    this.ndrmfLiquidationSoes = [];
    // this.selectedStepData = item;
    if (item !== null) {
      // this.selectedStepData.advanceLiquidationItem.data = item.data;
      this.selectedAdvanceItem = item;
      for (let i = 0; i < this.costSelections.length; i++) {
        let obj = this.costSelections[i];
        if (item.data !== null) {
          for (let j = 0; j < item.data.length; j++) {
            if (item.data[j]._id === obj._id) {
              console.log("**********ID MATCHED:---", item.data[j], obj);
              item.data[j].quarters = JSON.parse(JSON.stringify(obj.quarters));
            }
            this.parentCosts = [];
            item.data[j].parentCosts = this.search(item.data[j]);
          }
        }
      }
      if (item.advanceLiquidationItem !== null) {
        this._advanceLiquidationItemStore.addAdvanceLiquidationItem(JSON.parse(JSON.stringify(item.advanceLiquidationItem)));
        this._advanceLiquidationItemStore.addAdvanceLiquidationItemData(JSON.parse(JSON.stringify(item.data)));
      } else {
        this._advanceLiquidationItemStore.addAdvanceLiquidationItem(null);
        // this._advanceLiquidationItemStore.addAdvanceLiquidationItemData(JSON.parse(JSON.stringify(item.data)));
      }
    }
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
    // console.log("CURRENT STEP:---", this.step);
    this.currentReviewsList = [];
    this.step = this.step + 1;
    // if (selectionType === 'quarter') {
    this._singleGrantDisbursmentsStore.setSelectionType({ type: selectionType, key: this.step })
    // }
  }

  amountChanged($event) {
    console.log("AMOUNT CHANGES:---", $event.srcElement.value);
    let count = 0;
    this.selectedAdvanceLiquidation.data.forEach(element => {
      count = count + element.amount;
      this._advanceLiquidationItemStore.addAdvanceLiquidationItemTotalCost(count);
    });
  }

  addNdrmfSoes() {
    let object = {
      activityId: null,
      vendorName: null,
      invoiceAmount: null,
      dateOfPayment: null,
      paidAmount: null,
      chequeNumber: null,
      remarks: null,
      soeType: 'ndrmf',
      id: null,
    }
    // this.costLiquidations.push(this.liquidationForm.value);
    this.ndrmfLiquidationSoes.push(object);
    console.log("ADDED NDRMF SOES ARE:--", this.ndrmfLiquidationSoes);
  }

  addFipSoes() {
    let object = {
      activityId: null,
      vendorName: null,
      invoiceAmount: null,
      dateOfPayment: null,
      paidAmount: null,
      chequeNumber: null,
      remarks: null,
      soeType: 'fip',
      id: null,
    }
    // this.costLiquidations.push(this.liquidationForm.value);
    this.fipLiquidationSoes.push(object);
    console.log("ADDED FIP SOES ARE:--", this.fipLiquidationSoes);
  }

  getNdrmfTotalBudgetAllocation(item) {
    let count = 0;
    // for (let i = 0; i < this.selectedAdvanceLiquidation.data.length; i++) {
    // let x = this.selectedAdvanceLiquidation.data[i];
    for (let j = 0; j < item.quarters.length; j++) {
      let y = item.quarters[j];
      if (y.value === true && y.data !== null) {
        count = count + y.data.ndrmfShare;
      }
    }
    // }

    return count;
  }

  getNdrmfExpenditureCurrentQuarter(item, type) {
    let count = 0;
    if (type === 'initial') {
      if (item.quarters[0].value === true && item.quarters[0].progress) {
        return item.quarters[0].progress.expenditureNdrmf;
      }
    } else {
      if (item.quarters[(this.step + 2) - 1] && item.quarters[(this.step + 2) - 1].value === true && item.quarters[(this.step + 2) - 1].progress) {
        return item.quarters[(this.step + 2) - 1].progress.expenditureNdrmf;
      }
    }
    return count;
  }

  getNdrmfQuarterBudgetAllocation(item) {
    let count = 0;
    if (item.quarters[0].value === true && item.quarters[0].progress) {
      return item.quarters[0].data.ndrmfShare;
    }

    return count;
  }

  getFipTotalBudgetAllocation(item) {
    let count = 0;
    // for (let i = 0; i < this.selectedAdvanceLiquidation.data.length; i++) {
    // let x = this.selectedAdvanceLiquidation.data[i];
    for (let j = 0; j < item.quarters.length; j++) {
      let y = item.quarters[j];
      if (y.value === true && y.data !== null) {
        count = count + y.data.fipShare;
      }
    }
    // }

    return count;
  }

  getFipExpenditureCurrentQuarter(item) {
    let count = 0;
    if (item.quarters[0].value === true && item.quarters[0].progress) {
      return item.quarters[0].progress.expenditureFip;
    }
    return count;
  }

  getFipQuarterBudgetAllocation(item) {
    let count = 0;
    if (item.quarters[0].value === true && item.quarters[0].progress) {
      return item.quarters[0].data.fipShare;
    }

    return count;
  }

  submitAdvanceLiquidation() {
    this.approveLoading = true;
    this._advanceLiquidationItemStore.submitLiquidation(
      this.ndrmfLiquidationSoes,
      this.fipLiquidationSoes
    );
    this.submitLiquidationWithSoes();
    // console.log("SUBMIT ADVANCE LIQUIDATION:--", this.selectedAdvanceLiquidation);
  }

  submitLiquidationWithSoes() {
    let body = {
      payeesName: this.selectedAdvanceLiquidation.payeesName,
      payeesAddress: this.selectedAdvanceLiquidation.payeesAddress,
      bankName: this.selectedAdvanceLiquidation.bankName,
      bankAddress: this.selectedAdvanceLiquidation.bankAddress,
      payeesAccount: this.selectedAdvanceLiquidation.payeesAccount,
      swiftCode: this.selectedAdvanceLiquidation.swiftCode,
      specialPaymentInstruction: this.selectedAdvanceLiquidation.specialPaymentInstruction,
      ndrmfSoes: this.ndrmfLiquidationSoes,
      fipSoes: this.fipLiquidationSoes,
    }
    this._grantDisbursmentsService.submitInitialAdvanceLiquidationWithSoes(
      this.selectedAdvanceLiquidation.id,
      body
    ).subscribe(
      (result: any) => {
        console.log("RESULT ADDING LIQUIDATION:--", result);
        this.approveLoading = false;
        const options = {
          title: result.message,
          message: '',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
      },
      error => {
        this.approveLoading = false;
        const options = {
          title: 'Ann Error Occured :(',
          message: 'Please Try Again!',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        console.log("RESULT ADDING LIQUIDATION:--", error);
      }
    );
  }

  updateAdvanceLiquidation() {
    this.approveLoading = true;
    this._advanceLiquidationItemStore.submitLiquidation(
      this.ndrmfLiquidationSoes,
      this.fipLiquidationSoes
    );
    this.updateLiquidationWithSoes();
    // console.log("SUBMIT ADVANCE LIQUIDATION:--", this.selectedAdvanceLiquidation);
  }

  updateLiquidationWithSoes() {
    let body = {
      payeesName: this.selectedAdvanceLiquidation.payeesName,
      payeesAddress: this.selectedAdvanceLiquidation.payeesAddress,
      bankName: this.selectedAdvanceLiquidation.bankName,
      bankAddress: this.selectedAdvanceLiquidation.bankAddress,
      payeesAccount: this.selectedAdvanceLiquidation.payeesAccount,
      swiftCode: this.selectedAdvanceLiquidation.swiftCode,
      specialPaymentInstruction: this.selectedAdvanceLiquidation.specialPaymentInstruction,
      ndrmfSoes: this.ndrmfLiquidationSoes,
      fipSoes: this.fipLiquidationSoes,
    }
    this._grantDisbursmentsService.updateInitialAdvanceLiquidationWithSoes(
      this.selectedAdvanceLiquidation.id,
      body
    ).subscribe(
      (result: any) => {
        console.log("RESULT ADDING LIQUIDATION:--", result);
        this.approveLoading = false;
      },
      error => {
        this.approveLoading = false;
        const options = {
          title: 'Error Doing Operation!',
          message: 'Please contact system administrator',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        console.log("RESULT ADDING LIQUIDATION:--", error);
      }
    );
  }

  search(activity) {
    let parentCosts = [];
    const stack = [this.projectActualCosts];
    // console.log("***********SEARCH CALLED*********************", activity);
    while (stack.length) {
      const node = stack.pop();
      // console.log("***********SEARCH CALLED*********************", node);
      let i = 0;
      while (i < node.length) {
        if (node[i]._id === activity.mainCostId) {
          this.parentCosts.push(node[i].title);
          // console.log("***********SHOW PARENTS FOR THE ACTIVITY*********************", activity['parentCosts'], this.parentCosts, node[i].title);
          return node[i].mainCostId === null ? this.parentCosts : this.search(node[i]);
        }
        i++;
      }
    }
  }

}
