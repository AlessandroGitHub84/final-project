import { Component, OnInit } from "@angular/core";

@Component({
  selector: "tnv-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed=true;

  constructor() {}

  ngOnInit(): void {}
}
