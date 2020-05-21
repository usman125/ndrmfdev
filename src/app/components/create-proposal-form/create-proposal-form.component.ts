import { Component, OnInit, OnDestroy, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, from } from "rxjs";
import { CreateProposalFormService } from "../../services/create-proposal-form.service";
import { Router } from '@angular/router';
import { AuthStore } from "../../stores/auth/auth-store";
import { ProposalSectionsStore } from '../../stores/proposal-sections/proposal-sections-store';
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-create-proposal-form',
  templateUrl: './create-proposal-form.component.html',
  styleUrls: ['./create-proposal-form.component.css']
})

export class CreateProposalFormComponent implements OnInit, OnDestroy {

  createProfileForm: FormGroup;

  loggedUser: boolean = false;
  toggle: boolean = false;

  formName: any = '';
  formType: any = '';
  passScore: any = null;
  totalScore: any = null;
  smeRef: any = '';
  refreshForm: any = new EventEmitter();

  public form: any = {
    components: [],
    display: "form",
    page: 0,
    numPages: 2
  };

  @ViewChild('json') jsonElement?: ElementRef;
  secondForm: any = {};

  allProposalSections: any = [];
  allProposalForms: any = [];

  Subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _proposalSectionsStore: ProposalSectionsStore,
    private _authStore: AuthStore,
    private _createProposalFormService: CreateProposalFormService,
    private _proposalFormsStore: ProposalFormsStore,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
  ) {
    this._buildCreateProfileForm();
  }

  private _buildCreateProfileForm() {
    this.createProfileForm = this._formBuilder.group({
      name: ['', Validators.required],
      // passScore: ['', Validators.required],
      // totalScore: ['', Validators.required],
      smeRef: ['', Validators.required],
      type: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.formType = 'form';
    setTimeout(() => {
      this._authStore.setRouteName('Create-Proposal-Form');
    });
    // this.Subscription.add(
    //   this._proposalSectionsStore.state$.subscribe((data) => {
    //     var sections = [];
    //     from(data.sections).pipe(
    //       filter(value => !value.formGenerated)
    //     ).subscribe(result => {
    //       sections.push(result);
    //     }).unsubscribe();
    //     this.allProposalSections = sections;
    //     console.log("ALL PROPOSAL SECTIONS:--", this.allProposalSections);
    //   })
    // )
    // this.Subscription.add(
    //   this._proposalSectionsStore.state$.subscribe((data) => {
    //     console.log("ALL PROPOSAL FORMS:--", data.sections)
    //   })
    // )
  }


  openSnackBar() {
    this._snackBar.open('Please enter form name!', 'done', {
      duration: 2000,
    });
  }

  onChange(event) {
    if (this.jsonElement) {
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    }
    this.refreshForm.emit({
      form: event.form
    });
  }

  toggleBuilder() {
    this.toggle = !this.toggle;
  }

  typeChanged($event) {
    // console.log("TYPE CHANGED:--", $event);
    if ($event === 'wizard') {
      this.form.display = 'wizard';
      this.form.page = 0;
      this.form.numPages = 1;
    } else {
      this.form.display = 'form';
      this.form.page = 0;
      this.form.numPages = 0;
    }
    this.refreshForm.emit({
      form: this.form
    })
  }

  smeChanged($event) {
    console.log("SME CHANGED:--", $event);
  }

  onSubmit($event) {
    this.secondForm = $event.data;
    console.log("EVENT FROM FORM:---", this.secondForm);
  }

  saveForm(values) {
    console.log("FORM TO SAVE:--", values, "\nform", this.form);
    // console.log("FORM TO SAVE:--", 
    // "\nname", this.formName, 
    // "\ntype", this.formType, 
    // "\nform", this.form
    // );
    // if (this.formName) {
    // this._proposalFormsStore.addProposalForm(
    //   values.name,
    //   values.smeRef,
    //   this.form.components,
    //   values.type,
    //   this.form.page,
    //   this.form.numPages,
    //   'proposal-form',
    // )
    // } else {
    // this.openSnackBar();
    // }
    // this._smeStore.updateUserRef(values.smeRef, values.email);
    // this._smeStore.updateFormGenrated(values.smeRef);
    // this.createProfileForm.reset();
    // this.form = {
    //   components: [],
    //   display: "form",
    //   page: 0,
    //   refreshOn: "submit",
    //   numPages: 2
    // };
    // this.refreshForm.emit({
    //   form: this.form
    // });

    this._proposalFormsStore.addProposalForm(
      values.name,
      values.smeRef,
      this.form.components,
      null
      // values.type,
      // this.form.page,
      // this.form.numPages,
      // 'proposal-form',
    );
    // this._proposalSectionsStore.updateSectionFormgenerated(values.smeRef);
    this.resetForm();
    // this._createProposalFormService.addForm(
    //   values.name,
    //   values.smeRef,
    //   this.form.components,
    //   values.type,
    //   this.form.page,
    //   this.form.numPages,
    // ).subscribe(
    //   (result) => {
    //     console.log("RESULT IN COMPONENT:--", result.response[0]);
    //     // return result.response[0];
    //     this._proposalFormsStore.addProposalForm(
    //       values.name,
    //       values.smeRef,
    //       this.form.components,
    //       values.type,
    //       this.form.page,
    //       this.form.numPages,
    //     );
    //     this._proposalSectionsStore.updateSectionFormgenerated(values.smeRef);
    //     this.resetForm();
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  resetForm() {
    this.createProfileForm.reset();
    this.form = {
      components: [],
      display: "form",
      page: 0,
      numPages: 2
    };
    this.refreshForm.emit({
      form: this.form
    });
  }

  goBack() {
    this._router.navigate(['proposal-forms']);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
