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
    // Evita il comportamento di default dell'evento.
    event.preventDefault();
    // Marca tutti i campi del form come "touched" per visualizzare gli eventuali errori.
    form.control.markAllAsTouched();
  
    if (form.valid) {
      // Determina la squadra scelta dal nuovo utente.
      const newUserTeam = form.value.team;
  
      // Conta quanti utenti ci sono nella squadra ROSSA.
      const redCount = this.getTeamCount('RED');
      // Conta quanti utenti ci sono nella squadra BLU.
      const blueCount = this.getTeamCount('BLUE');
      // Calcola il numero totale di giocatori.
      const totalPlayers = redCount + blueCount;
  
      // Verifica se una delle squadre ha raggiunto il limite di 11 giocatori.
      const isTeamFull = totalPlayers >= 11;
  
      // Calcola la differenza assoluta tra il numero di utenti nelle due squadre.
      const teamCountDiff = Math.abs(redCount - blueCount);
  
      // Verifica se l'aggiunta di un nuovo utente violerebbe il limite di massimo 2 giocatori di differenza tra le squadre
      // oppure se una delle squadre ha raggiunto il limite di 11 giocatori.
      if (teamCountDiff > 2 && !isTeamFull) {
        alert('Impossibile registrare nuovo utente perché violerebbe il limite di massimo 2 giocatori di differenza tra le squadre');
        return;
      } else if (teamCountDiff > Math.max(redCount, blueCount) * 0.1 && isTeamFull) {
        alert('Impossibile registrare nuovo utente perché violerebbe il limite di massimo 10% di differenza tra le squadre');
        return;
      }
  
      // Effettua la registrazione del nuovo utente.
      this.authService.register(form.value);
    }
  }
}