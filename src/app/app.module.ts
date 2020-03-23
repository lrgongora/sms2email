import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserslistComponent } from './userslist/userslist.component';
import { LogslistComponent } from './logslist/logslist.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CodeGeneratorComponent } from './code-generator/code-generator.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    RegisterComponent,
    UserDashboardComponent,
    TopBarComponent,
    UserEditorComponent,
    UserslistComponent,
    LogslistComponent,
    AddUserComponent,
    CodeGeneratorComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents()
  ],
  entryComponents: [AddUserComponent, UserEditorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
