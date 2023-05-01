import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'tnv-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  // Dichiarazione delle variabili
  reviews: Review[] = []; // lista di recensioni
  redReviews: Review[] = []; // lista di recensioni del team RED
  blueReviews: Review[] = []; // lista di recensioni del team BLUE

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getReviews(); // quando il componente viene inizializzato, richiama la funzione getReviews()
  }

  // Funzione che ottiene le recensioni e le divide in base al team (RED o BLUE)
  getReviews() {
    this.reviewService.getReviewsById().subscribe({
      next:
        (response: Review[]) => {
          this.reviews = response; // la lista di recensioni viene aggiornata con quelle ottenute dal servizio
          console.log(this.reviews);
          this.blueReviews = this.reviews.filter((x) => x.team === 'BLUE'); // la lista delle recensioni del team BLUE è ottenuta filtrando quelle con team uguale a 'BLUE'
          this.redReviews = this.reviews.filter((y) => y.team === 'RED'); // la lista delle recensioni del team RED è ottenuta filtrando quelle con team uguale a 'RED'
        }
    })
  }
}
