import { Component, OnInit, OnDestroy } from '@angular/core';
import { SmeStore } from "../../stores/sme/sme-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import {
  setCurrentSme
} from "../../stores/sme/sme-replay";
import { SmeService } from "../../services/sme.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-sme',
  templateUrl: './sme.component.html',
  styleUrls: ['./sme.component.css'],
  providers: []
})
export class SmeComponent implements OnInit, OnDestroy {


  public displayedColumns = ['name', 'userRef', 'actions'];
  public dataSource: any = [];
  public allSmes: any = [];
  public loadingProcess: boolean = false;
  public loadingSection: boolean = false;
  public allProcessTypes: any = [];
  public Subscription: Subscription = new Subscription();
  public warnMsg: string = "No Process Selected";
  public listItem: any = null;


  constructor(
    private _smesStore: SmeStore,
    private _authStore: AuthStore,
    private _router: Router,
    private _smeService: SmeService,
    private _settingsService: SettingsService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('SMES')
    })

    this._settingsService.getProcesses().subscribe(
      result => {
        console.log("ALL PROCESSES:---", result);
        this.allProcessTypes = result;
      },
      error => {
        console.log("ALL PROCESSES ERROR:---", error);
      }
    );
    // this._settingsService.getProcesseMeta().subscribe(
    //   result => {
    //     console.log("ALL PROCESSES:---", result);
    //     this.allProcessTypes = result;
    //   },
    //   error => {
    //     console.log("ALL PROCESSES ERROR:---", error);
    //   }
    // );


    // this._smeService.getAllSmes().subscribe(
    //   result => {
    //     console.log("ALL SMES FROM APi:--", result);
    //     let smesArray = [];
    //     if (result['sectionInfos']) {
    //       result['sectionInfos'].forEach(element => {
    //         var object = {
    //           name: element.sectionName,
    //           userRef: element.userName,
    //           formGenerated: element.formGenerated,
    //           key: element.sectionKey,
    //           formIdentity: element.formIdentity,
    //         }
    //         smesArray.push(object);
    //       });
    //       this._smesStore.addAllSmes(smesArray);
    //     }
    //   },
    //   error => { }
    // )
    // this.Subscription.add(
    //   this._smesStore.state$.subscribe((data) => {
    //     this.allSmes = data.smes;
    //     console.log("ALL SMES FROM STORE;--", this.allSmes);
    //     this.dataSource = this.allSmes;
    //   })
    // )

  }

  fetchSectons(item) {
    this.loadingSection = true;
    this.dataSource = [];
    this.listItem = item;
    this._settingsService.getProcessMeta(item).subscribe(
      (result: any) => {
        this.loadingSection = false;
        console.log("ALL PROCESSES:---", result);
        if (result.sections){
          this.dataSource = result.sections;
        }else{
          this.warnMsg = "No Data Found."
        }
      },
      error => {
        this.loadingSection = false;
        console.log("ALL PROCESSES ERROR:---", error);
      }
    );
  }

  editSme(sme) {
    // console.log('Selected Sme:--', sme);
    setCurrentSme(
      sme.name,
      sme.key,
      sme.userRef,
      sme.formGenerated,
      sme.formIdentity,
    );
    this._router.navigate(['/add-sme']);

  }

  goToAdd() {
    this._router.navigate(['/add-sme']);
  }

  ngOnDestroy() {

  }

}
