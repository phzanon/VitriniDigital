import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  login: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.login = localStorage.getItem('login');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
