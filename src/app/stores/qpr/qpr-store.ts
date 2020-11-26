import { Injectable } from '@angular/core';
import { Store } from '../store';
import { QprState } from './qpr-state';

@Injectable()
export class QprStore extends Store<QprState> {
  constructor() {
    super(new QprState());
  }

  setDefaults(quarter, ndrmfShare, fipShare): void {
    this.setState({
      ...this.state,
      stats: {
        ...this.state.stats,
        quarter: quarter,
        ndrmfShare: ndrmfShare,
        fipShare: fipShare,
      }
    });
  }

}
