import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PrimaryAppraisalFormsStore } from '../../stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { ProjectsStore } from '../../stores/projects/projects-store';
import * as _ from 'lodash';
import { SettingsService } from '../../services/settings.service';
import FormioUtils from 'formiojs/utils';

import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
// import { start } from 'repl';

@Component({
  selector: 'app-result-framework-report',
  templateUrl: './result-framework-report.component.html',
  styleUrls: ['./result-framework-report.component.css']
})
export class ResultFrameworkReportComponent implements OnInit, OnDestroy {

  // BAR CHAT DATA
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] },
    // scales: { yAxes: [{ stacked: true }] },
    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'end',
        font: {
          weight: 'bold'
        },
        color: '#919191',
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0;
        },
        // formatter: function (value, context) {
        //   value = Math.round(value * 100) / 100;
        //   return context.active
        //     ? context.dataset.label + '\n' + value + '%'
        //     : Math.round(value);
        // },
        // backgroundColor: function (context) {
        //   return context.active ? context.dataset.backgroundColor[context.dataIndex] : 'white';
        // },
        // borderColor: function (context) {
        //   return context.dataset.backgroundColor[context.dataIndex];
        // },
        // borderRadius: function (context) {
        //   return context.active ? 0 : 32;
        // },
        // borderWidth: 3,
        // color: function (context) {
        //   return context.active ? '#919191' : context.dataset.backgroundColor[context.dataIndex];
        // },
        // offset: 8,
        // padding: 5,
        // textAlign: 'center',
      },
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    elements: {
      line: {
        fill: false
      },
      point: {
        hoverRadius: 7,
        radius: 5
      }
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: 'green', },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: 'yellow', }
  ];

  public kpiChartLabels: Label[] = [];
  public kpiChartType: ChartType = 'bar';
  public kpiChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Target',
      datalabels: {
        anchor: 'start',
        align: 'end',
        textAlign: 'center'
      },
    },
    {
      data: [],
      label: 'Achieved',
      datalabels: {
        anchor: 'start',
        align: 'end',
        textAlign: 'center'
      },
    },
    {
      data: [],
      label: 'Activities',
      datalabels: {
        anchor: 'start',
        align: 'end',
        textAlign: 'center'
      },
    }
  ];


  public indicatorChartLabels: Label[] = [];
  public indicatorChartType: ChartType = 'bar';
  public indicatorChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Target',
    },
    {
      data: [],
      label: 'Achieved',
    },
  ];

  // Radar
  public provinceChartOptions: RadialChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        backgroundColor: function (context) {
          return context.active ?
            '#2e7d32' :
            context.dataset.backgroundColor[context.dataIndex];
        },
        color: function (context) {
          return context.active ?
            '#fff' :
            '#919191';
        },
        // color: '#919191',
        font: {
          weight: 'bold',
          size: 12,
        },
        // formatter: Math.round,
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 0;
        },
        padding: 3,

        // formatter: function (value, context) {
        //   return context.active
        //     ? context.dataset.label + '\n' + value
        //     : Math.round(value);
        // },
      }
    }
  };
  public provinceChartLabels: Label[] = [];
  public provinceChartData: ChartDataSets[] = [
    { data: [], label: 'Target' },
    { data: [], label: 'Achieved' }
  ];
  public provinceChartType: ChartType = 'radar';

  public kpiProvinceArray = [];;

  public doughnut = [];
  // @ViewChild('myChart') chart: ElementRef;


  Subscription: Subscription = new Subscription();
  selectedProjectId: any = null;
  pip: any = null;
  allCosts: any = [];
  rfCosts: any = [];
  formElements: any = [];
  rfForm: any = null;

  resultsChain: any = [];

  constructor(
    private _projectsStore: ProjectsStore,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _activatedRoute: ActivatedRoute,
    private _settingsService: SettingsService,
  ) {
  }

  ngOnInit(): void {
    // this._activatedRoute.snapshot.queryParams.sub
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      // this.getProjectDetails();
      this.getRfMeta();
      this._primaryAppraisalFormsStore.state$.subscribe((data) => {
        // if (data.selectedProject)
        typeof (data.selectedProject.implementationPlan) === 'string' ? this.pip = JSON.parse(data.selectedProject.implementationPlan) : this.pip = data.selectedProject.implementationPlan;
        this.allCosts = this.pip.costs;
        this.rfCosts = _.filter(this.allCosts, (c) => {
          if (c.addRf) {
            // return {
            //   ...c,
            //   type: this.getRfType(c.quarters),
            // };
            let mneType = this.getRfType(c.quarters);
            console.log("GET RF CALLED:--", mneType);
            c.mneType = mneType.mneType;
            c.mneData = mneType.mneData;
            return {
              c
            };
          }
        })
        this.resultsChain = [];
        this.resultsChain = _.chain(this.rfCosts)
          .groupBy('mneType')
          .map((val, _id) => {
            return {
              children: val,
              _id: _id,
            }
          })
          .value();
        console.log("********SELECTED FRAMEWORK DATA*********", data.selectedProject,
          this.pip,
          this.allCosts,
          this.rfCosts,
          this.resultsChain
        );
        this.prepareChartData();

      })
    });

    // this.doughnut = new Chart(this.chart.nativeElement, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['a', 'b', 'c', 'd'],
    //     datasets: [{
    //       backgroundColor: '#2c82be',
    //       data: [12, 34, 23, 65],
    //       datalabels: {
    //         anchor: 'end'
    //       }
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     plugins: {
    //       datalabels: {
    //         backgroundColor: function (context) {
    //           return context.dataset.backgroundColor;
    //         },
    //         borderColor: 'white',
    //         borderRadius: 25,
    //         borderWidth: 2,
    //         color: 'white',
    //         font: {
    //           weight: 'bold'
    //         },
    //         formatter: Math.round
    //       }
    //     },
    //     legend: {
    //       display: true
    //     },
    //   }
    // });
  }

  getRfMeta() {
    this._settingsService.getProcessTemplate('PROJECT_PROPOSAL').subscribe(
      (result: any) => {
        this.formElements = [];
        let contentElements = [];
        result.sections.forEach(element => {
          if (element.sectionName === "Results Framework") {
            this.rfForm = JSON.parse(element.template);
            FormioUtils.eachComponent(this.rfForm.components, (component) => {
              if (component.key != 'submit') {
                if (component.type != 'content') {
                  this.formElements.push(component);
                } else {
                  contentElements.push(component);
                }
              }
            });
            console.log("****RESULT FRAME WORK REPORT TEMPLATE***:--", this.rfForm, this.formElements, contentElements);
          }
        });
      },
      error => {
        console.log("ERROR FROM TEMPLATES:--", error);
      }
    );
  }

  getRfType(quarters) {
    var mneType = null;
    var mneData = null;
    for (let i = 0; i < quarters.length; i++) {
      var x = quarters[i];
      if (x.data) {
        mneType = x.data.rfSubmitData ? x.data.rfSubmitData.type : null;
        mneData = x.data.rfSubmitData;
        if (mneType === 'output') {
          mneType = x.data.rfSubmitData.selectOutput;
        }
        break;
      }
    }
    return { mneType, mneData };
  }

  prepareChartData() {
    this.kpiChartLabels = [];
    this.kpiChartData[0].data = [];
    this.kpiChartData[1].data = [];
    this.kpiChartData[2].data = [];
    this.indicatorChartLabels = [];
    this.indicatorChartData[0].data = [];
    this.indicatorChartData[1].data = [];

    let provinceArray = [];

    for (let i = 0; i < this.resultsChain.length; i++) {
      let targetCount = 0;
      let achievedCount = 0;
      var x = this.resultsChain[i];
      for (let j = 0; j < x.children.length; j++) {

        var y = x.children[j];

        var childrenTarget = 0;
        var childrenAchieved = 0;

        var output = y.mneType ? y.mneType.split('-')[1] : null;
        var subOutput = output ? y.mneData['subOutputs' + output] : null;
        var indicator = subOutput ? subOutput.split('-')[1] : null;
        var indicatorValue = indicator ? y.mneData['indicator' + indicator] : 'Unknown-Kpi';


        let provinces = [];
        let provincesTarget = [];
        let provincesAchieved = [];
        for (let k = 0; k < y.quarters.length; k++) {
          var z = y.quarters[k];
          if (z.data !== null && z.value) {
            if (z.data.province) {
              if (provinces.length === 0) {
                provinces.push(z.data.province.PROVINCE);
                provincesTarget.push(z.data.target);
                if (z.progress && z.progress !== null)
                  provincesAchieved.push(z.progress.mneProgress);
                else
                  provincesAchieved.push(0);
              } else {
                let provinceIndex = provinces.indexOf(z.data.province.PROVINCE);
                if (provinceIndex > -1) {
                  provincesTarget[provinceIndex] = provincesTarget[provinceIndex] + z.data.target;
                  if (z.progress && z.progress !== null)
                    provincesAchieved[provinceIndex] = provincesAchieved[provinceIndex] + z.progress.mneProgress;
                } else {
                  provinces.push(z.data.province.PROVINCE);
                  provincesTarget.push(z.data.target);
                  if (z.progress && z.progress !== null)
                    provincesAchieved.push(z.progress.mneProgress);
                  else
                    provincesAchieved.push(0);
                }
              }
            }
            if (z.data.target) {
              childrenTarget = childrenTarget + parseInt(z.data.target);
              targetCount = targetCount + parseInt(z.data.target);
            }
          }
          if (z.progress && z.progress !== null) {
            childrenAchieved = childrenAchieved + z.progress.mneProgress;
            achievedCount = achievedCount + z.progress.mneProgress;
          }
        }

        let object = {
          indicatorValue,
          indicator: 'indicator' + indicator,
          provinces,
          provincesTarget,
          provincesAchieved,
          provinceChartLabels: provinces,
          provinceChartData: [
            { data: provincesTarget, label: 'Target' },
            { data: provincesAchieved, label: 'Achieved' }
          ],
        }
        provinceArray.push(object);
        this.kpiProvinceArray = provinceArray;

        this.indicatorChartLabels.push(indicatorValue);
        this.indicatorChartData[0].data.push(childrenTarget);
        this.indicatorChartData[1].data.push(childrenAchieved);

        console.log(
          "KPI:---", x._id,
          "\nCHILD:---", j,
          '\nCHILD DATA:---', y,
          '\nTARGET COUNT:---', targetCount,
          '\nACHIEVED COUNT:---', achievedCount,
        );
      }
      console.log(
        "KPI:---", x._id,
      );
      this.kpiChartLabels.push(x._id);
      this.kpiChartData[0].data.push(targetCount);
      this.kpiChartData[1].data.push(achievedCount);
      this.kpiChartData[2].data.push(x.children.length);
    }
    console.log(
      "CHART LABELS:---", this.kpiChartLabels,
      '\nKPI CHART DATA:---', this.kpiChartData,
      '\nKPI PROVINCES ARRAY:---', this.kpiProvinceArray,

    );
  }

  getChainTitle(object, subObject) {
    let item = null;
    if (object.toLowerCase().includes('output')) {
      for (let i = 0; i < this.formElements.length; i++) {
        let key = this.formElements[i];
        // console.log("********RF ENTRY MATCHED:)))))))))))", key);
        if (key.key === 'selectOutput') {
          for (let j = 0; j < key.data.values.length; j++) {
            let key2 = key.data.values[j];
            if (key2.value === object) {
              return key2.label;
            }
          }
        }
      }
    } else if (object.toLowerCase().includes('outcome')) {
      for (let i = 0; i < this.formElements.length; i++) {
        let key = this.formElements[i];
        if (key.key === 'type1') {
          for (let j = 0; j < key.data.values.length; j++) {
            // console.log("********RF ENTRY MATCHED:)))))))))))", subObject);
            let key2 = key.data.values[j];
            if (key2.value === subObject) {
              return key2.label;
            }
          }
        }
      }
    }
  }

  getSubOutPutIndicator(obj) {
    var output = obj.mneType ? obj.mneType.split('-')[1] : null;
    var subOutput = obj.mneData['subOutputs' + output];
    var indicator = subOutput ? subOutput.split('-')[1] : null;
    var indicatorValue = indicator ? obj.mneData['indicator' + indicator] : null;
    // console.log("********GET SUBTITLE ENTRY:)))))))))))", obj, output, subOutput, 'indicator' + indicator, indicatorValue);
    return indicatorValue;

  }

  getSubOutPutTitle(obj) {
    var output = obj.mneType ? obj.mneType.split('-')[1] : null;
    var subOutput = obj.mneData['subOutputs' + output];
    var indicator = subOutput ? subOutput.split('-')[1] : null;
    var indicatorValue = indicator ? obj.mneData['indicator' + indicator] : null;
    // console.log("********GET SUBTITLE ENTRY:)))))))))))", obj, output, subOutput, 'indicator' + indicator, indicatorValue);
    for (let i = 0; i < this.formElements.length; i++) {
      let key = this.formElements[i];
      if (key.key === 'indicator' + indicator) {
        // console.log("********KEY MACTHED*****", key);
        for (let j = 0; j < key.data.values.length; j++) {
          let key2 = key.data.values[j];
          if (key2.value === indicatorValue) {
            // console.log("********LABEL MATCHED*****", key2.label);
            return key2.label;
          }
        }
      }
    }

  }

  getKpiValue(kpi, indicator) {
    for (let i = 0; i < this.formElements.length; i++) {
      let key = this.formElements[i];
      if (key.key === indicator) {
        // console.log("********KEY MACTHED*****", key);
        for (let j = 0; j < key.data.values.length; j++) {
          let key2 = key.data.values[j];
          if (key2.value === kpi) {
            // console.log("********LABEL MATCHED*****", key2.label);
            return key2.label;
          }
        }
      }
    }
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
  }

  changeChartType() {
    this.kpiChartType === 'line' ? this.kpiChartType = 'bar' : this.kpiChartType = 'line';
  }

  changeIndiChartType() {
    this.barChartType === 'line' ? this.barChartType = 'bar' : this.barChartType = 'line';
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
