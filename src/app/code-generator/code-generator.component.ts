import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss']
})
export class CodeGeneratorComponent implements OnInit {

  code;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
      this.code = "No data";
  }

  generateCode() {
      this.http.get("/api/generateCode").subscribe(
          res => {
              this.code = res['code']
          },
          (err : HttpErrorResponse) => {
              console.log(err);
          }
      )
  }

}
