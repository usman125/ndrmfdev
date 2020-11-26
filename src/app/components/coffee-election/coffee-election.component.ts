import { Component, OnInit } from '@angular/core';
import { CoffeeElectionStore } from '../../stores/coffee-election/coffee-election.store';
import { AuthStore } from '../../stores/auth/auth-store';

@Component({
  selector: 'coffee-election',
  templateUrl: './coffee-election.component.html',
  // providers: [CoffeeElectionStore]
})
export class CoffeeElectionComponent implements OnInit {

  constructor(public store: CoffeeElectionStore, private _authStore: AuthStore) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Coffee');
    });
  }
}
