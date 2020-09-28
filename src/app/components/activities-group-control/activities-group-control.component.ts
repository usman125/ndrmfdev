import {
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  ControlValueAccessor,
  Validators,
  NG_VALUE_ACCESSOR, FormControl
} from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';
import { setPipPopupValue, pipPopupReplay } from '../../stores/pip-popup-replay';
import { AuthStore } from 'src/app/stores/auth/auth-store';

export interface GroupControlComponentData {
  name: '',
  quarters: {},
  groups: GroupControlComponentData[];
}

@Component({
  selector: 'app-activities-group-control',
  templateUrl: './activities-group-control.component.html',
  styleUrls: ['./activities-group-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ActivitiesGroupControlComponent),
      multi: true
    }
  ]
})
export class ActivitiesGroupControlComponent implements ControlValueAccessor, OnDestroy, OnInit {
  selectedQuarters = [];
  quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];

  months: any = null;
  quartersArray: any = [];

  formGroups: any = {
    "groups": [
      {
        "name": "",
        "groups": [
          {
            "name": "",
            "quarters": [],
            "groups": []
          },
          {
            "name": "",
            "quarters": [],
            "groups": []
          }
        ],
        "quarters": {
          "Q1": false,
          "Q2": false,
          "Q3": false,
          "Q4": false,
          "Q5": false,
          "Q6": false,
          "Q7": false,
          "Q8": false
        }
      },
      {
        "groups": []
      },
      {
        "groups": []
      },
      {
        "name": "",
        "groups": [
          {
            "name": "",
            "groups": [
              {
                "name": "",
                "quarters": [],
                "groups": []
              }
            ],
            "quarters": {
              "Q1": false,
              "Q2": false,
              "Q3": false,
              "Q4": false,
              "Q5": false,
              "Q6": false,
              "Q7": false,
              "Q8": false
            }
          }
        ],
        "quarters": {
          "Q1": false,
          "Q2": false,
          "Q3": false,
          "Q4": false,
          "Q5": false,
          "Q6": false,
          "Q7": false,
          "Q8": false
        }
      }
    ]
  };

  @Input()
  formLabel: string;
  @Input()
  isSubActivity: boolean = false;
  @Input()
  isLeaf: boolean = true;

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup;

  selectedQuarter: any = null;
  selectedTableEntry: any = null;

  Subscription: Subscription = new Subscription();

  private _onChange: (
    value: GroupControlComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog,
    public _authStore: AuthStore,
  ) {
    this.quarters = [];
    // this.quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.months = data.auth.proMonths;
        for (let i = 0; i < Math.ceil(this.months / 3) + 3; i++) {
          this.quarters.push('Q' + (i + 1));
        }
        // this.quarters = this.quartersArray;
        console.log("*********Months in Pip Plan:---\n", this.months, this.quartersArray);
      })
    );
  }

  ngOnInit() {
    this._createFormGroup();
    this._setupObservables();
    this.setDefaultForm();
  }

  setDefaultForm() {

  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  writeValue(value: GroupControlComponentData | null | undefined): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }

  registerOnChange(
    fn: (value: GroupControlComponentData | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error('registerOnTouched not implemented');
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error('setDisabledState not implemented');
  }

  _deleteGroupFromArray(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  _addGroup() {
    console.log("PARENT TO ADD IN:--", this._groupsFormArray);
    this._groupsFormArray.push(
      this._fb.control({
        name: '',
        // quarters: [],
        quarters: this.createQuartersFormGroup(),
        groups: []
      })
    );
  }

  get _groupsFormArray(): FormArray {
    return this._form.get("groups") as FormArray;
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      name: '',
      // quarters: [],
      groups: this._fb.array([]),
      quarters: this.createQuartersFormGroup(),
    });
    // this._form = (this.formGroups);
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }

  quarterSelected(activityIndex, quarterIndex) {
    this.selectedQuarters[activityIndex][quarterIndex] = !this.selectedQuarters[activityIndex][quarterIndex];
  }

  openActivityDetails(i) {
    this.selectedQuarter = i;
    console.log("OPEN ACTIVITY FOR:--",
      'data' + (i + 1),
      i,
      this._quartersFormGroup.controls['data' + (i + 1)],
      this._quartersFormGroup.controls['Q' + (i + 1)].value,
    );
    // if (this._quartersFormGroup.controls['Q' + (i + 1)].value) {
    if (this._quartersFormGroup.controls['data' + (i + 1)]) {
      var result = this._quartersFormGroup.controls['data' + (i + 1)].value;
      console.log("QUaRTER DATA SAVED:--", result);
      const dialogRef = this.dialog.open(ActivityDetailsComponent, {
        data: {
          available: true,
          startDate: result.startDate,
          endDate: result.endDate,
          description: result.description,
          latitude: result.latitude,
          longitude: result.longitude,
          ndrmfShare: result.ndrmfShare,
          fipShare: result.fipShare,
          isProcurement: result.isProcurement,
          procurementHeads: result.procurementHeads,
          rfSubmitData: result.rfSubmitData,
          saveBtn: this._quartersFormGroup.controls['Q' + (this.selectedQuarter + 1)].value,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          if (this._quartersFormGroup.controls['data' + (this.selectedQuarter + 1)]) {
            this._quartersFormGroup.controls['data' + (this.selectedQuarter + 1)].setValue({
              startDate: result.startDate,
              endDate: result.endDate,
              description: result.description,
              latitude: result.latitude,
              longitude: result.longitude,
              ndrmfShare: result.ndrmfShare,
              fipShare: result.fipShare,
              isProcurement: result.isProcurement,
              procurementHeads: result.procurementHeads,
              rfSubmitData: result.rfSubmitData,
            });
          }
        }
      });
    } else {
      // if (this._quartersFormGroup.controls['Q' + (i + 1)].value === true) {
      console.log("NOT EXIST")
      const dialogRef = this.dialog.open(ActivityDetailsComponent, {
        data: {
          available: false,
          startDate: null,
          endDate: null,
          description: null,
          latitude: null,
          longitude: null,
          ndrmfShare: null,
          fipShare: null,
          isProcurement: false,
          procurementHeads: null,
          rfSubmitData: null,
          saveBtn: this._quartersFormGroup.controls['Q' + (this.selectedQuarter + 1)].value,
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this._quartersFormGroup.controls['data' + (this.selectedQuarter + 1)].setValue({
            startDate: result.startDate,
            endDate: result.endDate,
            description: result.description,
            latitude: result.latitude,
            longitude: result.longitude,
            ndrmfShare: result.ndrmfShare,
            fipShare: result.fipShare,
            isProcurement: result.isProcurement,
            procurementHeads: result.procurementHeads,
            rfSubmitData: result.rfSubmitData,
          });
        } else {
          // this._quartersFormGroup.controls['Q' + (this.selectedQuarter + 1)].setValue(false);
        }
      });
      // }
      // }
    }
  }

  createQuartersFormGroup(): FormGroup {
    let g = this._fb.group({});

    this.quarters.map(q => {
      g.addControl(q, this._fb.control(false))
    });

    return g;
  }

  get _quartersFormGroup(): FormGroup {
    return this._form.get('quarters') as FormGroup;
  }

  quarterSelectionChage(event, i) {
    this.selectedQuarter = i;
    if (event.checked === true) {
      if (!this._quartersFormGroup.controls['data' + (i + 1)]) {
        this._quartersFormGroup.addControl(
          'data' + (i + 1), this._fb.group({
            startDate: [''],
            endDate: [''],
            description: ['', Validators.required],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            ndrmfShare: ['', Validators.required],
            fipShare: ['', Validators.required],
            isProcurement: [false],
            procurementHeads: [''],
            rfSubmitData: [''],
          })
        );
        // this.openActivityDetails(i);
      }
    }
    else {
      this._quartersFormGroup.removeControl('data' + (i + 1));
      // this.openActivityDetails(i);
    }
    console.log(event, i);
  }

  formEntryClicked(i) {
    console.log("INDEX OF FORM CLICKED:---", i);
    // this._groupsFormArray.push(
    //   this._fb.control({
    //     startDate: [''],
    //     endDate: [''],
    //   })
    // );
  }

  quarterClicked(i) {
    console.log("QUARTER OF FORM CLICKED:---", i);
  }

  ngOnDestory() {
    this.Subscription.unsubscribe();
  }
}
