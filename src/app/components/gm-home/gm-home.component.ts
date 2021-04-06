import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-gm-home',
  templateUrl: './gm-home.component.html',
  styleUrls: ['./gm-home.component.css']
})
export class GmHomeComponent implements OnInit {

  allProjects: any = null;
  projectStats: any = null;
  apiLoading: boolean = false;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    },
  };

  thematicAreaLabels: Label[] = [];
  thematicAreaData: any = [];
  public polarAreaLegend = true;
  public polarAreaChartType: ChartType = 'polarArea';

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,100,255,0.3)', 'rgba(100,0,255,0.3)', 'rgba(95,120,120,0.3)', 'rgba(120,110,255,0.3)', 'rgba(255,110,90,0.3)',],
    },
  ];

  constructor(
    private _router: Router,
    private _projectService: ProjectService,
    private _settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.getAllProject();
  }


  getAllProject() {
    this.apiLoading = true;
    this._projectService.getAllProjects().subscribe(
      (result: any) => {
        // console.log("DM PM ALL PROJECTS:--", result);
        this.allProjects = result;
        var preCount = 0;
        var extCount = 0;
        var gmCount = 0;
        result.forEach(element => {
          if (element.status === "Extended Appraisal") extCount = extCount + 1;
          if (element.status === "Preliminary Appraisal") preCount = preCount + 1;
          if (element.status === "Marked to GM") gmCount = gmCount + 1;
        });
        this.projectStats = {
          preCount,
          extCount,
          gmCount,
          totalCount: result.length
        }
        this.getThematicAreas();
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR DM PM ALL PROJECTS:--", error);
      }
    );
  }

  getThematicAreas() {
    this._settingsService.getAllThematicAreas().subscribe(
      (result: any) => {
        result.forEach(element => {
          this.thematicAreaLabels.push(element.name);
          this.thematicAreaData.push(0);
        });
        this.allProjects.forEach(element => {
          let key = this.thematicAreaLabels.indexOf(element.thematicAreaName);
          // console.log("Key:----", key);
          this.thematicAreaData[key] = this.thematicAreaData[key] + 1;
        });
        // console.log("RESULT THEMATIC AREAS:---", result,
        //   '\nThematic Labels:--', this.thematicAreaLabels,
        //   '\nThematic Data:--', this.thematicAreaData
        // );
      },
      error => {
        console.log("RESULT THEMATIC AREAS:---", error);
      }
    )
  }

  goToRoute(route) {
    this._router.navigate([route]);
  }

}
