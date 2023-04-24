import { StatisticsService } from './../../../../../libs/shared/services/StatisticsService';
import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
@Component({
  selector: 'delivery-app-client-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private statisticsService: StatisticsService) {}
  optionsMenuItemCountChart: EChartsOption = {
    legend: {},
    tooltip: {},
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }],
  };
  optionsMenuItemOrderCountChart: EChartsOption = {
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
      this.optionsMenuItemCountChart.dataset = {
        source: sourceData,
      };
    });
    this.statisticsService.getOrderMenuItemsCount().subscribe((data) => {
      const sourceData = data.map((item) => [
        item.menuItemName,
        item.orderMenuItemCount,
      ]);
      this.optionsMenuItemOrderCountChart.dataset = {
        source: sourceData,
      };
    });
  }
}
