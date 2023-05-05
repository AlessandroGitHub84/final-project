import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";

@Component({
  selector: "tnv-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }
  login(form: NgForm) {
    console.log('login component.ts', form.value);
    form.control.markAllAsTouched();

    // Se il form è valido, chiamiamo il servizio di autenticazione
    if (form.valid) {
      this.authService.login(form.value).subscribe({
        // Se la chiamata ha successo, salviamo l'utente nella local storage e navighiamo alla pagina rankings
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigateByUrl('/welcome');
        },
        // Se la chiamata fallisce, gestiamo l'errore in base allo status code
        error: (err) => {
          if (err.status === 401) {
            alert('Username o password errati');
          } else {
            alert('C\'è stato un errore, la preghiamo di riprovare più tardi');
          }
        },
      });
    }
  }
}
