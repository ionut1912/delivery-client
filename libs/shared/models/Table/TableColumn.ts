export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (x: any) => string;
}
