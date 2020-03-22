import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../userslist/userslist.component';
import { WebApiService } from '../web-api.service';
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent {

    updateUserForm;

  constructor(public dialogRef: MatDialogRef<UserEditorComponent>, private formBuilder : FormBuilder, private webApi : WebApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.updateUserForm = this.formBuilder.group({
      username: this.data.username,
      email: this.data.email,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      phoneNumber: this.data.phoneNumber,
    })
  }

  ngOnInit(): void {
      console.log(this.data)
//     this.updateUserForm.patchValue({
//       username: this.data.username,
//       email: this.data.email,
//       firstName: this.data.firstName,
//       lastName: this.data.lastName,
//       phoneNumber: this.data.phoneNumber,

//   });
}
  

    onNoClick(): void {
    this.dialogRef.close();
  }

    onSubmit(user){
      let id = this.data.id;
      this.webApi.updateUser(id, user);
      this.dialogRef.close();
  }
}