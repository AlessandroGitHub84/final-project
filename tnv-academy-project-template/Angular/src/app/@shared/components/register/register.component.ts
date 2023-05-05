
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/@core/services/auth.service";
import { User } from "../../../models/user"
@Component({
  selector: "tnv-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  users: User[] = [];

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
    this.authService.getUsers().subscribe(
      {
        next:
          users => {
            this.users = users;
          },
        error: error => {
          console.log(error);
        }
      }
    );
  }

  getTeamCount(team: string) {
    return this.users.filter(user => user.team === team).length;
  }

  register(event: Event, form: NgForm) {

    event.preventDefault();

    form.control.markAllAsTouched();

    // Verifica se il form è valido.
    if (form.valid) {
      // Prende il valore della squadra selezionata dal nuovo utente.
      const newUserTeam = form.value.team;

      // Conta il numero di giocatori nella squadra rossa e blu.
      const redCount = this.getTeamCount('RED');
      const blueCount = this.getTeamCount('BLUE');
      // Calcola il numero totale di giocatori.
      const totalPlayers = redCount + blueCount;

      // Verifica se il numero totale di giocatori è superiore o uguale a 11
      const isTeamFull = totalPlayers >= 11;

      // Calcola la differenza di giocatori tra le squadre.
      const teamCountDiff = Math.abs(redCount - blueCount);
      // Calcola il numero di giocatori nella nuova squadra.
      const newUserTeamCount = newUserTeam === 'RED' ? redCount + 1 : blueCount + 1;

      // Verifica se l'aggiunta del nuovo utente violerebbe il limite di massimo 1 giocatore di differenza tra le squadre.
      if (
        teamCountDiff > 1 &&
        !isTeamFull &&
        ((newUserTeam === 'RED' && (blueCount - redCount >= 1)) ||
          (newUserTeam === 'BLUE' && (redCount - blueCount >= 1)))
      ) {
        alert(
          'Impossibile registrare nuovo utente perché violerebbe il limite di massimo 1 giocatore di differenza tra le squadre'
        );
        return;
        // Verifica se l'aggiunta del nuovo utente violerebbe il limite di massimo 10% di differenza tra le squadre.
      } else if (
        teamCountDiff > 0 &&
        isTeamFull &&
        ((newUserTeam === 'RED' && newUserTeamCount / blueCount > 1.1) ||
          (newUserTeam === 'BLUE' && newUserTeamCount / redCount > 1.1))
      ) {
        alert(
          'Impossibile registrare nuovo utente perché violerebbe il limite di massimo 10% di differenza tra le squadre'
        );
        return;
      }

      // Registra il nuovo utente.
      this.authService.register(form.value);
    }
  }
}