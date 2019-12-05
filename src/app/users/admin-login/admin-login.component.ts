import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [UserService]
})
export class AdminLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
