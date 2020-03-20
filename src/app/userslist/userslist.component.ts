import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { WebApiService } from '../web-api.service';
import { MaterialModule } from '../material.module';
import { MatDialog } from '@angular/material/dialog';
import { UserEditorComponent } from '../user-editor/user-editor.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface User {
      username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

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
  rowSelection;
  selectedUser;

  constructor(private http : HttpClient, private webApi : WebApiService, public dialog : MatDialog, private snackBar : MatSnackBar) {
      this.columnDefs = [
        {headerName: 'ID', field: '_id', hide: true},
        {headerName: 'Username', field: 'username', filter: true, sortable: true, autoWidth: true, flex: true, checkboxSelection: true},
        {headerName: 'First Name', field: 'firstName', filter: true, sortable: true, autoWidth: true  },
        {headerName: 'Last Name', field: 'lastName', filter: true, sortable: true, autoWidth: true },
        {headerName: 'Email', field: 'email', filter: true, sortable: true, autoWidth: true },
        {headerName: 'Phone Number', field: 'phoneNumber', filter: true, sortable: true, cellEditor: 'agTextCellEditor', editable: true, autoWidth: true}
    ];
    this.webApi.getLogs();

    this.rowSelection = 'single';
      

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

      onRowClicked(event){
        console.log(event);
    }

      openAddUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      data: {}
    });

}

    editUser(){
      this.selectedUser = this.gridApi.getSelectedRows()[0];
      if(!this.selectedUser){
      this.snackBar.open("Make a selection!", "Dismiss", {duration: 5000});
      } else {
      const dialogRef = this.dialog.open(UserEditorComponent, {
      width: '500px',
      data: this.selectedUser
    });
}
}

    deleteUser(){
    this.selectedUser = this.gridApi.getSelectedRows()[0];
      if(!this.selectedUser){
      this.snackBar.open("Make a selection!", "Dismiss", {duration: 5000});
      } else {
    let userId = this.selectedUser.id
    this.webApi.deleteUser(userId)
    }
}

}
