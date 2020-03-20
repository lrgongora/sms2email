import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { WebApiService } from '../web-api.service';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-logslist',
  templateUrl: './logslist.component.html',
  styleUrls: ['./logslist.component.scss']
})
export class LogslistComponent implements OnInit {
    columnDefs;
    rowData;
    gridApi;
    gridColumnApi;

  constructor(private http : HttpClient, private webApi : WebApiService) { 
      this.columnDefs = [
        {headerName: 'ID', field: '_id', filter: true, sortable: true },
        {headerName: 'Type', field: 'type', filter: true, sortable: true  },
        {headerName: 'Date', field: 'date', filter: true, sortable: true, flex: true },
        {headerName: 'Description', field: 'description', filter: true, sortable: true, flex: true }
    ];

    this.webApi.getLogs();
   }

  ngOnInit(): void {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.webApi.getLogs();
    this.webApi.logsSubject.subscribe(logs => {
    this.rowData = logs;
      })
    }

}
