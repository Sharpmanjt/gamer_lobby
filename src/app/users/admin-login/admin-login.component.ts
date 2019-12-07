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
  errMsg: string;
  @Input()
  user: User;
  checkUser: User;
  x: Number;
  userIsAdmin: boolean;

  @Input()
  loginHandler: Function;

  ngOnInit() {
    this.user = {username: "", password: ""};
  }

  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router,
    private app: AppComponent
    ) { }

  login(user: User){

    this.errMsg="";
  
    if(user.username=="" || user.password == ""){
      this.errMsg += "Please enter a username and password.";
    }
    else{
      this.userService.getUser(user.username).then((checkUser: User)=> 
      {
        for (var x in checkUser)
        {
            if(JSON.stringify(checkUser[x]["username"]) == ("\"" + this.user.username + "\"") && JSON.stringify(checkUser[x]["password"]) == ("\"" + this.user.password + "\""))
            {
              localStorage.setItem("admin", "true");
              this.app.ngOnInit();
              this.userIsAdmin = true;
              this.router.navigate(['/playerList'], { skipLocationChange: false });
              break;
            }
            else{
              this.errMsg = "Username and password combination is invalid. Please try again. "
            }
        }
      });
    }
  }

  cancel(): void {
    this.location.back();
  }
}
