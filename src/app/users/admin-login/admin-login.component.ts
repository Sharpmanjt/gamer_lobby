import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Request, Response} from '@angular/http';
import { stringify } from 'querystring';

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


  @Input()
  loginHandler: Function;

  ngOnInit() {
    this.user = {username: "", password: ""};
  }

  constructor(
    private userService: UserService,
    private location: Location
    ) { }

  login(user: User){

    this.errMsg="";
  
    if(user.username==""){
      this.errMsg += "Please enter a valid username.";
    }
    else{
      this.userService.getUser(user.username).then((checkUser: User)=> 
      {

        for (var x in checkUser)
        {
            if(x["username"] == user.username)
            {
              console.log("success");
            }
            else{
              console.log("fail");
              console.log(x);
            }
        }

        console.log(JSON.stringify(checkUser[0]["username"]));

        this.checkUser = checkUser;
        console.log(checkUser.username);
        if(user.username == checkUser.username)
        {
          console.log("success");
          //this.router.navigate(['/dashboard']);
        }
        else{
          console.log("fail");
        }
        
      });
    }

    // check database
    // if true:
    localStorage.setItem("admin", "true");
    // else: return message
  }

  cancel(): void {
    this.location.back();
  }
}
