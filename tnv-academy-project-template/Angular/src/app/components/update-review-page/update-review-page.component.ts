import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { ReviewService } from "src/app/@shared/services/review.service";
import { NgForm } from "@angular/forms";
import {User} from "src/app/models/user";
import {Review} from "src/app/models/review";
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'tnv-update-review-page',
  templateUrl: './update-review-page.component.html',
  styleUrls:['./update-review-page.component.scss']
})
export class UpdateReviewPageComponent implements OnInit, OnDestroy {

  currentUser: Partial<User> = {};
  
id: number = 0;
private sub: any;
public visualisedMovie = {
  title: "",
  subtitle: "",
  overview: "",
  poster_path: "",
  id:""
};

constructor(private authService: AuthService, private route: ActivatedRoute, private http: HttpClient, private router: Router,
  private reviewService: ReviewService) {}

  // Creazione di un oggetto Review inizializzato con valori di default
// per i suoi attributi
  review: Review = { userId:0,
    title: "",
    movieId:0,
    team: "",
    review: "",
    rating: 0 };

  ngOnInit(): void {
      // Recupero dell'utente attualmente autenticato
    this.currentUser = this.authService.getCurrentUser();
    this.sub = this.route.params.subscribe(params =>{
      this.id = +params["id"];
      this.getReview(); // Richiesta dei dati della recensione del film
      this.getMovie(); // Richiesta dei dati del film
    })
  }
  getReview() {
    this.http
    .get(
      `http://localhost:1234/api/review/${this.currentUser.id}/${this.id}`
    )
    .subscribe({
      next: (response: any) => {
       this.review = response;  // Salvo i dati
      },
      error: () => {
        console.log("Non funziona!");  // Gestione dell'errore in caso di fallimento della richiesta
      },
    });
}

// Metodo che verifica se la recensione inserita è valida
  isReviewValid(review : string) {
    const words = review.trim().split(' ');
    return words.length >= 50;
  }

  //Metodo di aggiornamento della review
  updateReview(event: Event, form: NgForm){
    event.preventDefault()
    form.control.markAllAsTouched();
    if (form.valid) {
      let userComeStringa= localStorage.getItem("user");
      let user: User;
        user = JSON.parse(userComeStringa!)
      this.review.review= form.value.review,
      this.review.rating= this.review.rating
      if (!this.isReviewValid(form.value.review)) {
        alert('la review deve essere lunga almeno 50 parole') ;
       } 
 
       this.reviewService.updateReview(this.review); 
    }
  }

  //Metodo che recupera il film tramite il suo id
  getMovie() {
    this.http
      .get(
        `http://localhost:1234/api/movies/`+ this.id
      )
      .subscribe({
        next: (response: any) => {
         this.visualisedMovie = response;
        },
        error: () => {
          console.log("Non funziona!");
        },
      });
  }
ngOnDestroy(): void {
  this.sub.unsubscribe();
}

}