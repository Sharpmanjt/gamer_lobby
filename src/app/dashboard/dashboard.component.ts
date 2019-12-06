import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userIsAdmin: boolean;

  constructor() { 
    this.userIsAdmin = localStorage.getItem("admin") === "true";
  }

  ngOnInit() {
    this.userIsAdmin = localStorage.getItem("admin") === "true";
  }

}
