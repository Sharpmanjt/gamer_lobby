import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Request, Response} from '@angular/http';
import { stringify } from 'querystring';
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
              console.log("success");
              localStorage.setItem("admin", "true");
              //this.app.ngOnInit();
              //this.router.navigate(['playerList']); 
              this.userIsAdmin = true;
              this.router.navigate(['validatedUser'], { skipLocationChange: false });
              break;
            }
            else{
              this.errMsg = "Username and password combination is invalid. Please try again. "
              /*console.log("fail");
              console.log(JSON.stringify(checkUser[x]["username"]));
              console.log(JSON.stringify(checkUser[x]["password"]));
              console.log(("\"" + this.user.username + "\""));
              console.log(("\"" + this.user.password + "\""));*/
            }
        }
      });
    }

    // check database
    // if true:
    // else: return message
  }

  cancel(): void {
    this.location.back();
  }
}
