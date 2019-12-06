import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  loginHandler: Function;

  ngOnInit() {
  }

  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router,
    private app: AppComponent
    ) { }

  login(){
    // check database
    // if true:
    localStorage.setItem("admin", "true");
    this.app.ngOnInit();
    this.router.navigate(['playerList']); 
    // else: return message
  }

  cancel(): void {
    this.location.back();
  }
}
