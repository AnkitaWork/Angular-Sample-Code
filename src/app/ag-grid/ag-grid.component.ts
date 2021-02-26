import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {

  columnDefs = [
    { field: 'make',sortable:true,width:500,filter: true,checkboxSelection: true},
    { field: 'model',sortable:true,width:500,filter: true },
    { field: 'price',sortable:true,width:500,filter: true }
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  constructor() { }

  public onRowClicked(e:any) {
    if (e.event.target) {
      console.log(e.data);
    }  
  }

  public onRowSelected(event:any){
    console.log(event);
    console.log(event.node.selected);
    console.log(event.rowIndex);
  }

  ngOnInit(): void {
  }

}
