import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

        columnDefs = [
        {headerName: 'Username', field: 'username', filter: true, sortable: true },
        {headerName: 'First Name', field: 'firstName', filter: true, sortable: true  },
        {headerName: 'Last Name', field: 'lastName', filter: true, sortable: true },
        {headerName: 'Email', field: 'email', filter: true, sortable: true },
        {headerName: 'Phone Number', field: 'phoneNumber', filter: true, sortable: true}
    ];


    rowData;
    users;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
     this.http.get('/api/users').subscribe(
         res => {
             this.users = res;
             console.log(res);
             this.rowData = res;
             console.log(this.rowData);
         },
         (err : HttpErrorResponse) => {
             console.log(err);
         }
     )
  }
 
}
