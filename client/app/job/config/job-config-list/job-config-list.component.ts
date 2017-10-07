import { Component, OnInit } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'app-job-config-list',
  templateUrl: './job-config-list.component.html',
  styleUrls: ['./job-config-list.component.scss'],

})

export class JobConfigListComponent {
  data: any[] = [
    { sku: '1452-2', item: 'Pork Chops', price: 32.11 },
    { sku: '1421-0', item: 'Prime Rib', price: 41.15 },
  ];
  columns: ITdDataTableColumn[] = [
    { name: 'sku', label: 'SKU #', tooltip: 'Stock Keeping Unit', sortable: true },
    { name: 'item', label: 'Item name', width: 200 },
    { name: 'price', label: 'Price (US$)', numeric: true, format: v => v.toFixed(2), width: { min: 100, max: 400 } },
  ];
  compareWith(row: any, model: any): boolean {
    return row.id === model.id; // or any property you want to compare by.
  }
}
