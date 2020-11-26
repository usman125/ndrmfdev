import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SmeState } from './processes-state';

@Injectable()
export class SmeStore extends Store<SmeState> {
  constructor() {
    super(new SmeState());
  }

  addAllProcesses(processes){
    this.setState({
      ...this.state,
      processes: processes
    })
  }

}
