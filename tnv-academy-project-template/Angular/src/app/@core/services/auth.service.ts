import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { LoginDTO, RegisterDTO, User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // Definizione variabili del servizio
  springBootUrl = 'http://localhost:8080'; // URL del server back-end
  id : any;

  constructor(private router: Router, private http: HttpClient) {}

  // Metodo per effettuare il login
  login(loginData: LoginDTO) {
    console.log('auth service.ts', loginData);
    // Effettua una richiesta POST al server back-end per effettuare il login
    return this.http.post(
      "/auth/users/login",
      loginData,
    );
  }

  register(registerData: RegisterDTO) {
    // Effettua una richiesta POST al server back-end per registrare il nuovo utente
    this.http.post(
      "/auth/users/",
      registerData,
    ).subscribe(
      () => {
        // Dopo aver effettuato la registrazione, reindirizza l'utente alla homepage
        this.router.navigateByUrl("/");
      },
      (error) => {
        if (error.status === 409) {
          alert('Cannot register new user because username already exists in the database');
        } else {
          alert('Errore nel salvataggio dell\'utente');
        }
      }
    );
  }

  deleteUser(id: number) {
    // Invia una richiesta DELETE al server per eliminare la recensione specificata
    return this.http.delete(`/auth/users/${id}`,{ responseType: 'text' })
  }
  updateUser(user: User) {
    // Invia una richiesta PUT al server per aggiornare l'utente specificato
    return this.http.put(
      `/auth/users/${user.id}`, 
      { name: user.name,
        surname: user.surname,
        password: user.password,
        team: user.team,
        username: user.username
      },{ responseType: 'text' })
      .subscribe({
        // Dopo aver completato l'aggiornamento, torna alla pagina del profilo utente
        next: () => {
          localStorage.setItem("user", JSON.stringify(user))
          this.router.navigate(["/profile"]);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  


  // Metodo per effettuare il logout dell'utente
  logout() {
    localStorage.removeItem("user"); // Rimuove il token JWT salvato in localStorage
    this.router.navigateByUrl("/login");
  }

  // Metodo che verifica se l'utente è autenticato o meno
  isAuthenticated() {
    return !!localStorage.getItem("user"); // Restituisce true se l'utente ha un token JWT salvato in localStorage, altrimenti false
  }

  // Metodo per ottenere la lista degli utenti registrati sul server back-end
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.springBootUrl}/auth/users/`);
  }

  // Metodo per ottenere le informazioni sull'utente attualmente autenticato
  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User; // Ottiene l'oggetto User salvato in localStorage come stringa e lo converte in un oggetto JavaScript
    return user; // Restituisce l'oggetto User
  }
}
