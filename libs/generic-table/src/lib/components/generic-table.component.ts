import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableBtn } from '../../../../shared/models/Table/TableBtn';
import { TableColumn } from '../../../../shared/models/Table/TableColumn';
@Component({
  selector: 'generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() buttons: TableBtn[] = [];
  @Input() data: any[] = [];
  @Input() filter = false;
  @Input() filterPlaceholder = 'Filter';
  @Input() footer = '';
  @Input() pagination: number[] = [];
  @Input() pageSize!: number;
  @Input() tableMinWidth = 500;
  @Output() filteredData = new EventEmitter<any[]>();
  @Output() buttonClick = new EventEmitter<string[]>();

  dataSource!: MatTableDataSource<any>;
  displayedColumns!: string[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      if (changes['data']) {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = [...this.columns.map((c) => c.columnDef)];
        if (this.buttons.length > 0)
          this.displayedColumns = [...this.displayedColumns, 'actions'];
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.dataSource.sort = this.sort;
  }
}
