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
    [2, {title: 'Check Account', link: '/dashboard/check-account'}],
    [3, {title: 'Browse Books', link: '/dashboard/browse-books'}],
    [4, {title: 'Return Book', link: '/dashboard/return-book'}],
    [5, {title: 'Payment', link: '/dashboard/payment'}],
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
