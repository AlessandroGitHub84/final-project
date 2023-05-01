import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";
import {RegisterDTO, User} from "../../../models/user"
@Component({
  selector: "tnv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  users: User[] = [];

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
     this.authService.getUsers().subscribe(
    { next:
       users => {
        this.users = users;
      },
      error: error => {
        console.log(error);
      }}
      );
  }
  
  getTeamCount(team: string) {
    return this.users.filter(user => user.team === team).length;
  }
  
  register(event: Event, form: NgForm) {
    event.preventDefault();
    form.control.markAllAsTouched();
  
    if (form.valid) {
      const newUserTeam = form.value.team;
  
      const redCount = this.getTeamCount('RED');
      const blueCount = this.getTeamCount('BLUE');
      const totalPlayers = redCount + blueCount;
  
      // check if one of the teams has reached 11 players
      const isTeamFull = totalPlayers >= 11;
  
      // calculate the absolute difference between the number of users in the two teams
      const teamCountDiff = Math.abs(redCount - blueCount);
  
      // check if adding a new user would make one team have more than 2 users than the other team
      // or if one of the teams has reached 11 players
      if (teamCountDiff > 2 && !isTeamFull) {
        alert('Cannot register new user because it will violate the limit of having no more than 2 users difference between teams');
        return;
      } else if (teamCountDiff > Math.max(redCount, blueCount) * 0.1 && isTeamFull) {
        alert('Cannot register new user because it will violate the limit of having no more than 10% difference between teams');
        return;
      }
  
      this.authService.register(form.value);
    }
  }
  
}
