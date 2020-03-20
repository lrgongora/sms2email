import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { WebApiService } from '../web-api.service';
import { MaterialModule } from '../material.module';
import { UserEditorComponent } from '../user-editor/user-editor.component';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit {
    columnDefs;
    rowData;
    gridApi;
    gridColumnApi;

  constructor(private http : HttpClient, private webApi : WebApiService) {
      this.columnDefs = [
        {headerName: 'Username', field: 'username', filter: true, sortable: true, autoWidth: true, flex: true },
        {headerName: 'First Name', field: 'firstName', filter: true, sortable: true, autoWidth: true  },
        {headerName: 'Last Name', field: 'lastName', filter: true, sortable: true, autoWidth: true },
        {headerName: 'Email', field: 'email', filter: true, sortable: true, autoWidth: true },
        {headerName: 'Phone Number', field: 'phoneNumber', filter: true, sortable: true, cellEditor: 'agTextCellEditor', editable: true, autoWidth: true}
    ];
    this.webApi.getLogs();
      

  }

  ngOnInit(): void {

  }
 
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.webApi.getUsers();
    this.webApi.usersSubject.subscribe(users => {
    this.rowData = users;
      console.log(users);
      })
    }

    onRowValueChanged(event){
        console.log(event);
    }

      onCellValueChanged(event){
        console.log(event);
    }


}
