import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WebApiService } from '../web-api.service';
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

    addUserForm;

  constructor(public dialogRef: MatDialogRef<AddUserComponent>, private formBuilder : FormBuilder, private webApi : WebApiService) { 

      this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

    onNoClick(): void {
    this.dialogRef.close();
  }

    onSubmit(data){
      this.webApi.addUser(data);
      this.dialogRef.close();
  }
}
