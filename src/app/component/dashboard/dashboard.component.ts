import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor() { }
  sidenavOpened = true;
  navLinkList = new Map([
    [1, {title: 'Create Account', link: '/dashboard/create-account'}],
    [2, {title: 'Browse Books', link: '/dashboard'}],
    [3, {title: 'Borrow Books', link: '/dashboard'}],
    [4, {title: 'Submit Books', link: '/dashboard'}],
    [5, {title: 'Pay Fine', link: '/dashboard'}],
    [6, {title: 'Contact', link: '/dashboard/contact'}],
    [7, {title: 'Help', link: '/dashboard/help'}],
    [8, {title: 'Share', link: '/dashboard/share'}],
    [9, {title: 'Settings', link: '/dashboard/settings'}]
  ])

  ngOnInit(): void {
  }
  toogleSidenav(): void{
    this.sidenavOpened = !this.sidenavOpened
  }
}
