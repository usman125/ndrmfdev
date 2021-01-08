import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { ProjectService } from 'src/app/services/project.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import * as XLSX from 'xlsx';

import * as _ from 'lodash';


@Component({
  selector: 'app-po-home',
  templateUrl: './po-home.component.html',
  styleUrls: ['./po-home.component.css']
})
export class PoHomeComponent implements OnInit {

  eligiUnderReviewCount: any = 0;
  eligiApprovedCount: any = 0;
  eligiRejectedCount: any = 0;

  qualiUnderReviewCount: any = 0;
  qualiApprovedCount: any = 0;
  qualiRejectedCount: any = 0;

  projectStats: any = null;

  apiLoading: boolean;


  Subscription: Subscription = new Subscription();

  // CHART OPTIONS
  allProcesses: Label[] = null;
  allProcessesData: any = null;
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  // public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [];
  // public radarChartData: ChartDataSets[] = [
  //   { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  // ];
  public radarChartType: ChartType = 'radar';

  // Doughnut
  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,100,255,0.3)', 'rgba(100,0,255,0.3)', 'rgba(95,120,120,0.3)', 'rgba(120,110,255,0.3)', 'rgba(255,110,90,0.3)',],
    },
  ];

  // ELIGI CHART
  public eligiChartLabels: Label[] = ['Under Review', 'Approved', 'Rejected'];
  public eligiChartData: SingleDataSet = [];

  // PolarArea
  // public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartLabels: Label[] = [];
  // public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';


  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   // scales: { xAxes: [{}], yAxes: [{}] },
  // };
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartLabels: Label[] = ['Eligibility', 'Qualification'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [];

  // public barChartData: ChartDataSets[] = [];
  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  // QUALI GRAPTH

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
  };
  public pieChartLabels: Label[] = ['Under Review', 'Approved', 'Rejected'];
  public pieChartData: number[] = [];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  // public pieChartColors = [
  //   {
  //     backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  //   },
  // ];

  constructor(
    private _accreditationRequestService: AccreditationRequestService,
    private _projectService: ProjectService,
    private _authStore: AuthStore,
    private _settingsService: SettingsService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.apiLoading = data.auth.apiCall;
      })
    );

    this.eligiStats();
    this.qualiStats();

    this.getAllProject();
    this.getProcessTypes();
  }


  getProcessTypes() {
    this._settingsService.getProcesses().subscribe(
      (result: any) => {
        this.allProcesses = [];
        this.allProcessesData = [];
        this.allProcesses.push('Under Review');
        this.allProcessesData.push(1);
        for (let i = 0; i < result.length; i++) {
          if (result[i] === 'PRELIMINARY_APPRAISAL') {
            this.allProcesses.push('Primary Appraisal');
            this.allProcessesData.push(10);
          }
          if (result[i] === 'EXTENDED_APPRAISAL') {
            this.allProcesses.push('Extended Appraisal');
            this.allProcessesData.push(20);
          }
          if (result[i] === 'GIA') {
            this.allProcesses.push('GIA');
            this.allProcessesData.push(40);
          }
          if (result[i] === 'GIA_CHECKLIST') {
            this.allProcesses.push('GIA Checklist');
            this.allProcessesData.push(29);
          }
          if (result[i] === 'SUB_PROJECT_DOCUMENT') {
            this.allProcesses.push('Sub Project Document');
            this.allProcessesData.push(11);
          }
          if (result[i] === 'QPR') {
            this.allProcesses.push('QPR');
            this.allProcessesData.push(31);
          }
        }

        this.radarChartLabels = this.allProcesses;
        this.radarChartData.push({
          data: this.allProcessesData, label: 'Series A'
        });

        this.doughnutChartLabels = this.allProcesses;
        this.doughnutChartData = this.allProcessesData;

        this.polarAreaChartLabels = this.allProcesses;
        this.polarAreaChartData = this.allProcessesData;

        console.log("RESULT ALL ORICESESS:--", this.allProcesses, this.allProcessesData, this.doughnutChartData, this.doughnutChartLabels);

      },
      error => {
        console.log("RESULT ALL ORICESESS:--", error);
      }
    )
  }

  getAllProject() {
    this.apiLoading = true;
    this._projectService.getAllProjects().subscribe(
      (result: any) => {
        console.log("DM PM ALL PROJECTS:--", result);
        var preCount = 0;
        var extCount = 0;
        var urCount = 0;
        result.forEach(element => {
          if (element.status === "Extended Appraisal") extCount = extCount + 1;
          if (element.status === "Preliminary Appraisal") preCount = preCount + 1;
          if (element.status === "Under Review") urCount = urCount + 1;
        });
        this.projectStats = {
          preCount,
          extCount,
          urCount,
          totalCount: result.length
        }
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR DM PM ALL PROJECTS:--", error);
      }
    );
  }


  eligiStats() {
    this._authStore.setLoading();
    this._accreditationRequestService.getUnderReviewEligibilityRequest().subscribe(
      (result: any) => {
        console.log("RESULT APPROVED ELIGI:---", result);
        this.eligiUnderReviewCount = result.length;
        this._accreditationRequestService.getApprovedEligibilityRequest().subscribe(
          (result: any) => {
            console.log("RESULT APPROVED ELIGI:---", result);
            this.eligiApprovedCount = result.length;
            this._accreditationRequestService.getEligiRejectedRequests().subscribe(
              (result: any) => {
                console.log("RESULT REJECTED ELIGIBILITY:---", result);
                this.eligiRejectedCount = result.length;
                this.eligiChartData = [
                  this.eligiUnderReviewCount,
                  this.eligiApprovedCount,
                  this.eligiRejectedCount
                ];
                this._authStore.removeLoading();
              },
              (error: any) => {
                this._authStore.removeLoading();
                console.log("RESULT REJECTED ELIGIBILITY:---", error);
              }
            );
          },
          (error: any) => {
            this._authStore.removeLoading();
            console.log("ERROR APPROVED ELIGI:---", error);
          }
        );
      },
      (error: any) => {
        this._authStore.removeLoading();
        console.log("ERROR APPROVED ELIGI:---", error);
      }
    );

  }

  qualiStats() {
    this._authStore.setLoading();
    this._accreditationRequestService.getUnderReviewQulificationRequests().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        console.log("ERROR FECTING APPROVED:--", result);
        this.qualiUnderReviewCount = result.length;
        this._accreditationRequestService.getApprovedQulificationRequests().subscribe(
          (result: any) => {
            this._authStore.removeLoading();
            console.log("ERROR FECTING APPROVED:--", result);
            this.qualiApprovedCount = result.length;
            this._accreditationRequestService.getRejectedQulificationRequests().subscribe(
              (result: any) => {
                this._authStore.removeLoading();
                console.log("ERROR QUALIFICATION REJECTED:--", result);
                this.qualiRejectedCount = result.length;
                this.pieChartData = [
                  this.qualiUnderReviewCount,
                  this.qualiApprovedCount,
                  this.qualiRejectedCount,
                ];
              },
              error => {
                this._authStore.removeLoading();
                console.log("ERROR QUALIFICATION REJECTED:--", error);
              }
            );
          },
          error => {
            this._authStore.removeLoading();
            console.log("ERROR FECTING APPROVED:--", error);
          }
        );
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FECTING APPROVED:--", error);
      }
    );
  }


  goToRoute(route) {
    this._router.navigate([route]);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  // }

  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects

      let PROVINCE = _.uniqBy(data, 'PROVINCE');
      let DISTRICT = _.uniqBy(data, 'DISTRICT');
      let DIVISION = _.uniqBy(data, 'DIVISION');
      let TEHSIL = _.uniqBy(data, 'TEHSIL');
      let UC = _.uniqBy(data, 'UC');

      console.log('\nPROVINCE:', PROVINCE, '\nDISTRICT:', DISTRICT, '\nDIVISION:', DIVISION, '\nTEHSIL:', TEHSIL, '\nUC:', UC);
    };
  }

}
