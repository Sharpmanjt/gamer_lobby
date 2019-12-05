import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

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

  constructor(private userService: UserService) { }

  login(user: User){
    // check database
    // if true:
    localStorage.set("admin", true);
    // else: return message
  }
}
