
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";
import { User } from "../../../models/user"

@Component({
  selector: "tnv-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  users: User[] = [];
  currentUser: Partial<User> = {};

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  updateUser(event: Event, form: NgForm) {
    event.preventDefault()
    form.control.markAllAsTouched();
    if (form.valid) {
      let userComeStringa = localStorage.getItem("user");
      let user: User;
      user = JSON.parse(userComeStringa!)
      user = {
        id: this.currentUser.id!,
        name: form.value.name,
        surname: form.value.surname,
        password: form.value.password,
        team: this.currentUser.team!,
        username: this.currentUser.username!
      }
      this.authService.updateUser(user)
    }
  }
}