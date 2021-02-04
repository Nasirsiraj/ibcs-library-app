import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }
  sidenavOpened = true;
  navLinkList = [
    'Create Account',
    'Browse Books',
    'Borrow Books',
    'Submit Books',
    'Pay Fine',
    'Contact',
    'Help',
    'Share',
    'Settings'
  ];

  ngOnInit(): void {
  }
  toogleSidenav(): void{
    this.sidenavOpened = !this.sidenavOpened;
  }
}
