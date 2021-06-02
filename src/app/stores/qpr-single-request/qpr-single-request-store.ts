import { Injectable } from '@angular/core';
import { Store } from '../store';
import { QprSingleRequestState } from './qpr-single-request-state';

@Injectable()
export class QprSingleRequestStore extends Store<QprSingleRequestState> {
  constructor() {
    super(new QprSingleRequestState());
  }

  addQpr(qpr): void {
    this.setState({
      ...this.state,
      qpr: qpr
    });
  }

  addReviewForTask(taskId, body) {
    this.setState({
      ...this.state,
      qpr: {
        ...this.state.qpr,
        tasksForOthers: this.state.qpr.tasksForOthers.map((c) => {
          if (c.taskId === taskId) {
            return {
              ...c,
              othersDecision: body.decision,
              othersRemarks: body.comments,
              status: 'Completed',
              reviewCompletedOn: new Date(),
            }
          }
          return c;
        })
      }
    });
  }

  addExistedTasksForQpr(newArray, oldArray) {
    this.setState({
      ...this.state,
      qpr: {
        ...this.state.qpr,
        tasksForOthers: this.state.qpr.tasksForOthers.map((c) => {
          oldArray.forEach(element => {
            if (element.assignee.id === c.assignee.id) {
              c.status = 'Pending';
            }
          })
          return c;
        }),
      }
    });
  }

  addNewTasksForQpr(newArray, oldArray) {

    this.setState({
      ...this.state,
      qpr: {
        ...this.state.qpr,
        tasksForOthers: [...this.state.qpr.tasksForOthers, ...newArray]
      }
    });
  }



}
