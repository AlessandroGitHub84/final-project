import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";
import {RegisterDTO} from "../../../models/user"
@Component({
  selector: "tnv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }

 //isTeamBalanceValid(redTeamCount: number, blueTeamCount: number) {
 //   const teamRatio = Math.max(redTeamCount, blueTeamCount) / Math.min(redTeamCount, blueTeamCount);
 //   return teamRatio <= 1.1;
 // }
 //getRedTeamCount() {
    // Code to get count of users on red team goes here
 //   const redTeamUsers = this.getUsersByTeam('red');
 //   return redTeamUsers.length;
 // }
  
  //getBlueTeamCount() {
    // Code to get count of users on blue team goes here
 //   const blueTeamUsers = this.getUsersByTeam('blue');
 //   return blueTeamUsers.length;
//  }
  
  
 //getUsersByTeam(team: string) {
 // return users.filter(user => user.team === team);
//}
  
//assignUserToTeam(team: string) {
  // Code to update user's team in the database goes here
//  const redTeamCount = this.getRedTeamCount();
 // const blueTeamCount = this.getBlueTeamCount();
 // const newTeam = (redTeamCount <= blueTeamCount) ? 'red' : 'blue';
 // const userToAdd = { id: users.length + 1, username: `user${users.length + 1}`, team: newTeam };
 // users.push(userToAdd);
 // return userToAdd;
//}

  register(event: Event, form: NgForm) {
    event.preventDefault()
    form.control.markAllAsTouched();
  //  const redTeamCount = this.getRedTeamCount();
 //   const blueTeamCount = this.getBlueTeamCount();
 //     if (!this.isTeamBalanceValid(redTeamCount, blueTeamCount)) {
        // If team balance is not valid, reassign user to the other team
 //       if (team === 'red') {
 //         this.assignUserToTeam('blue');
 //       } else {
  //        this.assignUserToTeam('red');
  //      }
  //    }
    if (form.valid) {
      this.authService.register(form.value);
    }
  }
}
