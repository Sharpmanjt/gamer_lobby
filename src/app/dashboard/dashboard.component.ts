import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userIsAdmin: boolean;

  constructor(private router: Router) { 
    this.userIsAdmin = localStorage.getItem("admin") === "true";
  }

  ngOnInit() {
    this.userIsAdmin = localStorage.getItem("admin") === "true";
  }

}
