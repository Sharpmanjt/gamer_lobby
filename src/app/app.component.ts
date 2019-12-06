import { Component, OnInit } from '@angular/core';
import { User } from './users/user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Gamer Lobby';
  userIsAdmin: boolean;

  constructor(
    private router: Router
  ) { 
    this.userIsAdmin = localStorage.getItem("admin") === "true";
  }

  ngOnInit() {
    this.userIsAdmin = localStorage.getItem("admin") === "true";
  }

  logoff(){
    localStorage.setItem("admin", "false");
    this.userIsAdmin = false;
    this.ngOnInit();
    this.router.navigate(['guestPlayerList'], { skipLocationChange: true });
  }
}

