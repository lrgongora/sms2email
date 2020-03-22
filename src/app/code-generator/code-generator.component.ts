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
  }

  generateCode() {
      this.http.get("/api/generateCode").subscribe(
          res => {
              console.log(res)
          },
          (err : HttpErrorResponse) => {
              console.log(err);
          }
      )
  }

}
