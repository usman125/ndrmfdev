import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SingleGrantDisbursmentsState } from './single-grant-disbursment-state';

@Injectable()
export class SingleGrantDisbursmentsStore extends Store<SingleGrantDisbursmentsState> {
  constructor() {
    super(new SingleGrantDisbursmentsState());
  }

  setDefaults(): void {
    this.setState({
      ...this.state,
      disbursment: null
    })
  }

  addGrantDisbursment(disbursment) {
    this.setState({
      ...this.state,
      disbursment: disbursment
    })
  }

  submitInitialAdvanceReview(id) {
    this.setState({
      ...this.state,
      disbursment: {
        ...this.state.disbursment,
        initialAdvance: {
          ...this.state.disbursment.initialAdvance,
          initialAdvanceReviewsList: this.state.disbursment.initialAdvance.initialAdvanceReviewsList.map((c) => {
            if (c.id === id) {
              return {
                ...c,
                status: 'Completed'
              }
            }
            return c;
          })
        }
      }
    });
  }

  addToAdvanceReviewsList(storeArray) {
    if (this.state.disbursment.initialAdvance.initialAdvanceReviewsList !== null) {
      var newArray = [];
      newArray = this.state.disbursment.initialAdvance.initialAdvanceReviewsList !== null ?
        this.state.disbursment.initialAdvance.initialAdvanceReviewsList : [];
      storeArray.forEach(element => {
        newArray.push(element);
      });
      this.setState({
        ...this.state,
        disbursment: {
          ...this.state.disbursment,
          initialAdvance: {
            ...this.state.disbursment.initialAdvance,
            initialAdvanceReviewsList: newArray
          },
          subStatus: 'Reviews Pending',
        }
      });
    } else {
      // var newArray = [];
      // newArray = this.state.disbursment.initialAdvance.initialAdvanceReviewsList !== null ?
      //   this.state.disbursment.initialAdvance.initialAdvanceReviewsList : [];
      // storeArray.forEach(element => {
      //   newArray.push(element);
      // });
      this.setState({
        ...this.state,
        disbursment: {
          ...this.state.disbursment,
          initialAdvance: {
            ...this.state.disbursment.initialAdvance,
            initialAdvanceReviewsList: storeArray
          },
          subStatus: 'Reviews Pending',
        }
      });
    }
  }

  approveInitialAdvance() {
    this.setState({
      ...this.state,
      disbursment: {
        ...this.state.disbursment,
        initialAdvance: {
          ...this.state.disbursment.initialAdvance,
          status: 'Approved',
          subStatus: "Approved",
        }
      }
    })
  }

  addDataToQuarterAdvance(id, data, amount) {
    this.setState({
      ...this.state,
      disbursment: {
        ...this.state.disbursment,
        quarterAdvanceList: this.state.disbursment.quarterAdvanceList.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              data: data.map((c) => {
                return {
                  ...c,
                  amount: c.totalCost,
                }
              }),
              amount: amount,
            }
          }
          return c;
        })
      }
    });
  }

  submitQuarterAdvance(
    id,
    payeesName,
    payeesAddress,
    bankName,
    bankAddress,
    payeesAccount,
    swiftCode,
    specialPaymentInstruction
  ) {
    this.setState({
      ...this.state,
      disbursment: {
        ...this.state.disbursment,
        quarterAdvanceList: this.state.disbursment.quarterAdvanceList.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              status: 'Completed',
              payeesName: payeesName,
              payeesAddress: payeesAddress,
              bankName: bankName,
              bankAddress: bankAddress,
              payeesAccount: payeesAccount,
              swiftCode: swiftCode,
              specialPaymentInstruction: specialPaymentInstruction
            }
          }
          return c;
        })
      }
    });
  }

  addToQuarterAdvanceReviewsList(id, storeArray) {
    this.setState({
      ...this.state,
      disbursment: {
        ...this.state.disbursment,
        quarterAdvanceList: this.state.disbursment.quarterAdvanceList.map((c) => {
          if (c.id === id) {
            if (c.quarterAdvanceReviewsList) {
              var newArray = [];
              newArray = c.quarterAdvanceReviewsList;
              storeArray.forEach(element => {
                newArray.push(element);
              });
              return {
                ...c,
                quarterAdvanceReviewsList: newArray,
              }
            } else {
              return {
                ...c,
                quarterAdvanceReviewsList: storeArray
              }
            }
          }
          return c;
        }),
        subStatus: 'Reviews Pending',
      }
    });
  }

  addEntryToQuarterAdvance(id, data, amount) {
    this.setState({
      ...this.state,
      disbursment: {
        ...this.state.disbursment,
        quarterAdvanceList: this.state.disbursment.quarterAdvanceList.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              data: [
                ...c.data,
                {
                  ...data,
                  amount: data.totalCost,
                }
              ],
              amount: amount,
            }
          }
          return c;
        })
      }
    });
  }

  setSelectionType(selectionType) {
    this.setState({
      ...this.state,
      disbursment: {
        ...this.state.disbursment,
        selectionType: selectionType
      }
    });
  }
}
