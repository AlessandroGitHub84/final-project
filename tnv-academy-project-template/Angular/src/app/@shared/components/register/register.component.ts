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

  register(form: NgForm) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.authService.register(form.value);
    }
    const user: RegisterDTO = {  name: "testnome",
      surname: "testcognome",
      username: "testusername",
      password: "testpassword"}
      this.authService.register(user)
  }
}
