import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { WebApiService } from '../web-api.service';
import { MaterialModule } from '../material.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserEditorComponent } from '../user-editor/user-editor.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private http : HttpClient, private webApi : WebApiService) {

  }

  ngOnInit(): void {

  }
 

}
