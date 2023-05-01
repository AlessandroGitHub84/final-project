import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  reviews: Review[] = [];
  redReviews: Review[] = [];
  blueReviews: Review[] = [];

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getReviews();
    this.blueReviews = this.reviews.filter((x) => x.team === 'BLUE');
    this.redReviews = this.reviews.filter((y) => y.team === 'RED');
  }

  getReviews() {
    this.reviewService.getReviewsById().subscribe({
      next:
        (response: Review[]) => {
          this.reviews = response;
          console.log(this.reviews);
        }
    })
  }
}
  
