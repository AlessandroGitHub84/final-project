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

  getReviewsById() {
    return this.httpClient.get<Review[]>(`${this.API_ROOT}/review`);
  }
  
  getReview(userId: number, movieId: number) {
    return this.httpClient.get<Review>(`${this.API_ROOT}/review/${userId}/${movieId}`);
  }

  addReview(review: Review) {
    console.log("sei arrivato anche qui");
    this.httpClient.post<Review>(`${this.API_ROOT}/review/`, review).subscribe(),this.router.navigateByUrl("/");
  }

  editReview(review: Review) {
    return this.httpClient.patch<Review>(`${this.API_ROOT}/review/${review.id}`, review)
      .pipe(switchMap(() => this.getReview(review.userId, review.movieId)));
  }

  deleteReview(id: string) {
    return this.httpClient.delete(`${this.API_ROOT}/review/${id}`);
  }
}