import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }
  logOut(){
    this.auth.logOut();
  }
  isAuthenticated(){
      return this.auth.isAuthenticated();
  }
}
