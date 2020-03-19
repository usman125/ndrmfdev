import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { SmeStore } from '../../stores/sme/sme-store'
import { SectionSelectorStore } from "../../stores/section-selector/section-selector-store";
import { FormControl } from "@angular/forms";
import { shareWithReplay, setValue } from "../../stores/fip-intimations/intimate-fip";
import { SectionSelector } from "../../models/section-selector";

@Component({
  selector: 'section-selector',
  templateUrl: './section-selector.component.html',
  styleUrls: ['./section-selector.component.css']
})
export class SectionSelectorComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  allSmes: any = [];

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  startDate: string = null;
  endDate: string = null;
  sectionsData: SectionSelector = null;

  constructor(
    private _smeStore: SmeStore,
    private _sectionSelectorStore: SectionSelectorStore,
  ) {
    shareWithReplay.subscribe((c: SectionSelector) => {
      this.sectionsData = c;
      if (this.sectionsData) {
        this.startDate = this.sectionsData.startDate;
        this.endDate = this.sectionsData.endDate;
      }
      // console.log("START VALUES FROM MULTI SELCT:--", this.startDate, this.endDate, this.sectionsData);
    });
    this.Subscription.add(
      this._sectionSelectorStore.state$.subscribe((c) => {
        console.log("ALL SELCTIONS:--", c);
      })
    )
  }

  ngOnInit() {
    this.Subscription.add(
      this._smeStore.state$.subscribe((data) => {
        this.allSmes = data.smes;
      })
    )
  }

  ngOnDestroy() {
  }

  multiSelectStore($event) {
    this._sectionSelectorStore.addSelections($event.value);
    // setValue(this.startDate, this.endDate, $event.value);
  }

}
