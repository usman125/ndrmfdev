import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SmeState } from './sme-state';

@Injectable()
export class SmeStore extends Store<SmeState> {
  constructor() {
    super(new SmeState());
  }

  addSme(
    name: string,
    key: string,
    userRef: string,
    formGenerated: boolean,
    formIdentity: string,
  ): void {
    this.setState({
      ...this.state,
      smes: [
        ...this.state.smes,
        {
          name: name,
          key: key,
          userRef: userRef,
          formGenerated: formGenerated,
          formIdentity: formIdentity,
        }
      ]
    });
  }


  addAllSmes(smes){
    this.setState({
      ...this.state,
      smes: smes
    })
  }

  updateSme(
    name: string,
    key: string,
    userRef: string,
    formGenerated: boolean,
    formIdentity: string,
  ): void {
    this.setState({
      ...this.state,
      smes: this.state.smes.map((c) => {
        if (c.key === key) {
          return {
            ...c,
            name: name,
            key: key,
            userRef: userRef,
            formGenerated: formGenerated,
            formIdentity: formIdentity,
          }
        }
        return c;
      })
    });
  }


  updateUserRef(
    key: string,
    userRef: string
  ): void {
    this.setState({
      ...this.state,
      smes: [
        ...this.state.smes.map((c) => {
          if (c.key === key) {
            return { ...c, userRef: userRef }
          }
          return c;
        })
      ]
    });
  }

  dropUserRef(
    key: string,
  ): void {
    this.setState({
      ...this.state,
      smes: [
        ...this.state.smes.map((c) => {
          if (c.key === key) {
            return { ...c, userRef: null }
          }
          return c;
        })
      ]
    });
  }

  updateFormGenrated(
    key: string,
  ): void {
    this.setState({
      ...this.state,
      smes: [
        ...this.state.smes.map((c) => {
          if (c.key === key) {
            return { ...c, formGenerated: true }
          }
          return c;
        })
      ]
    });
  }


}
