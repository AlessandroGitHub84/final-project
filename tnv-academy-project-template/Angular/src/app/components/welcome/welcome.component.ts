import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'tnv-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
 
  constructor(private reviewService: ReviewService) { }

  // Un array che contiene il numero di recensioni per il team "BLUE" e "RED"
  reviewCounts: number[] = [];
  
  ngOnInit(): void {
    // Quando il componente viene caricato, si richiedono le recensioni al ReviewService
    this.getReviews().subscribe((counts: number[]) => {
     
      this.reviewCounts = counts;
    });
  }

  getReviews(): Observable<number[]> {
    return this.reviewService.getReviewsById().pipe(
      map((reviews: Review[]) => {
        // filtra l'array di recensioni in modo da ottenere solo quelle del team "BLUE"
        const blueReviewCount = reviews.filter((review) => review.team === 'BLUE').length;
        // filtra l'array di recensioni in modo da ottenere solo quelle del team "RED"
        const redReviewCount = reviews.filter((review) => review.team === 'RED').length;
        // restituisce un array con il numero di recensioni per il team "BLUE" e "RED"
        return [blueReviewCount, redReviewCount];
      })
    );
  }
}

