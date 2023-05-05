import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/@core/services/auth.service';
import { User } from 'src/app/models/user';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tnv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Dichiarazione di alcune variabili
  currentUser: Partial<User> = {};
  reviews: Review[] = [];
  currentID = this.getID();
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Recupera l'utente corrente al caricamento della pagina
    this.currentUser = this.authService.getCurrentUser();
    // Recupera le recensioni dell'utente corrente
    this.getReviews();
  }

  // Recupera l'ID dell'utente corrente dal localStorage
  getID() {
    let userString = localStorage.getItem("user");
    let user: User;
    user = JSON.parse(userString!);
    return user.id;
  }

  // Recupera tutte le recensioni dal servizio
  // e filtra solo quelle dell'utente corrente
  getReviews() {
    this.reviewService.getReviewsById().subscribe({
      next:
        (response: Review[]) => {
          this.reviews = response.filter((x) => x.userId == this.currentID);
        }
    })
  }

  //Cancella lo user ed effettua il logout
  deleteUser(id: number) {
    this.authService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((x) => x.id !== id)
        this.authService.logout()
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Cancella una recensione dall'elenco delle recensioni dell'utente
  deleteReview(id: string) {
    this.reviewService.deleteReview(id).subscribe({
      next: () => this.reviews = this.reviews.filter((x) => x.id !== id)
    });
  }
}


