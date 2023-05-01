import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { Review } from 'src/app/models/review.js';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  API_ROOT = 'http://localhost:1234/api';  

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Metodo per ottenere tutte le recensioni dal server
  getReviewsById() {
    return this.httpClient.get<Review[]>(`${this.API_ROOT}/review`);
  }
  
  // Metodo per ottenere una specifica recensione associata a un utente e un film
  getReview(userId: number, movieId: number) {
    return this.httpClient.get<Review>(`${this.API_ROOT}/review/${userId}/${movieId}`);
  }

  // Metodo per aggiungere una recensione
  addReview(review: Review) {
    console.log("sei arrivato anche qui");
    // Invia una richiesta POST al server per aggiungere la nuova recensione
    this.httpClient.post<Review>(`${this.API_ROOT}/review/`, review).subscribe(
      // Dopo aver completato la richiesta, torna alla pagina di selezione del film
      {next: () => {this.router.navigateByUrl("/movie-selection")}}
    )  
  }

  // Metodo per aggiornare una recensione esistente
  updateReview(review: Review) {
    // Invia una richiesta PUT al server per aggiornare la recensione specificata
    return this.httpClient.put<Review>(`${this.API_ROOT}/review/${review.id}`, {
        review: review.review,
        rating: review.rating
      })
      .pipe(switchMap(() => this.getReview(review.userId, review.movieId)))
      .subscribe({
        // Dopo aver completato l'aggiornamento, torna alla pagina del profilo utente
        next: () => {
          this.router.navigateByUrl("/profile");
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  
  // Metodo per eliminare una recensione
  deleteReview(id: string) {
    // Invia una richiesta DELETE al server per eliminare la recensione specificata
    return this.httpClient.delete(`${this.API_ROOT}/review/${id}`);
  }
}
