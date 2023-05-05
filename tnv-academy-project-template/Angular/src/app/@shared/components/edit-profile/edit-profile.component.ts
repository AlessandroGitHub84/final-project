
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

// Questa funzione aggiorna i dati dell'utente corrente con i valori inseriti nel form.
// Riceve come argomenti un oggetto evento e un oggetto NgForm.
updateUser(event: Event, form: NgForm) {
  // Impedisce il comportamento predefinito dell'evento (ad esempio, la ricarica della pagina in caso di submit di un form).
  event.preventDefault();

  form.control.markAllAsTouched();

  // Controlla se il form è valido.
  if (form.valid) {
    // Recupera l'utente corrente come stringa dal localStorage.
    let userComeStringa = localStorage.getItem("user");
    // Crea un oggetto User a partire dalla stringa.
    let user: User = JSON.parse(userComeStringa!);

    // Aggiorna i valori dell'oggetto user con quelli inseriti nel form.
    user = {
      id: this.currentUser.id!, // Mantieni l'ID originale dell'utente.
      name: form.value.name,
      surname: form.value.surname,
      password: form.value.password,
      team: this.currentUser.team!, // Mantieni la squadra originale dell'utente.
      username: this.currentUser.username! // Mantieni il nome utente originale dell'utente.
    };

    // Chiama il metodo updateUser dell'authService per aggiornare l'utente.
    this.authService.updateUser(user);
  }
}

}