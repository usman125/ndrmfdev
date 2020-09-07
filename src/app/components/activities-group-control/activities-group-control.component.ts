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
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { ActivityDetailsComponent } from '../activity-details/activity-details.component';

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

  @Input()
  formLabel: string;
  @Input()
  isSubActivity: boolean = false;
  @Input()
  isLeaf: boolean = true;

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup;

  private _onChange: (
    value: GroupControlComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder,
    public dialog: MatDialog ) {
      this.quarters = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
    }

  ngOnInit() {
    this._createFormGroup();

    this._setupObservables();
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
    this._groupsFormArray.push(
      this._fb.control({
        name: '',
        quarters: [],
        groups: []
      })
    );
  }

  get _groupsFormArray(): FormArray {
    return this._form.get("groups") as FormArray;
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      name: [''],
      groups: this._fb.array([]),
      quarters: this.createQuartersFormGroup(),
    });
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

  openActivityDetails(){
    const dialogRef = this.dialog.open(ActivityDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  createQuartersFormGroup(): FormGroup{
    let g = this._fb.group({});

    this.quarters.map(q => {
      g.addControl(q, this._fb.control(false))
    });

    return g;
  }

  get _quartersFormGroup(): FormGroup {
    return this._form.get('quarters') as FormGroup;
  }

  quarterSelectionChage(event){
    console.log(event);
  }
}
