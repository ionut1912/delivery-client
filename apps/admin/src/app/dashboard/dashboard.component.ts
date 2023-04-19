import { StatisticsService } from './../../../../../libs/shared/services/StatisticsService';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
@Component({
  selector: 'delivery-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) {}

  options: EChartsOption = {
    legend: {},
    tooltip: {},
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }],
  };

  ngOnInit(): void {
    this.statisticsService.getMenuItemCount().subscribe((data) => {
      const sourceData = data.map((item) => [
        item.menuItemName,
        item.menuItemCount,
      ]);
      this.options.dataset = {
        source: sourceData,
      };
    });
  }
}
