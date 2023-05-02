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
  selector: 'tnv-review-page',
  templateUrl: './review-page.component.html',
  styleUrls:['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit, OnDestroy {

  currentUser: Partial<User> = {};
  
  // Dichiarazione delle variabili
  id: number = 0;
  private sub: any;
  public visualisedMovie = {
    title: "",
    subtitle: "",
    overview: "",
    poster_path: "",
    id:""
  };
  review: Review = { userId:0,
    title: "",
    movieId:0,
    team: "",
    review: "",
    rating: 0 };

  // Costruttore con iniezione di dipendenze
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  // Funzione che viene eseguita all'inizio della vita del componente
  ngOnInit(): void {
    // Recupero l'utente corrente dal servizio di autenticazione
    this.currentUser = this.authService.getCurrentUser();
    // Recupero l'id del film dalla route
    this.sub = this.route.params.subscribe(params =>{
      this.id = +params["id"];
      // Recupero le informazioni sul film dal server
      this.getMovie();
    });
  }

  // Funzione che controlla se una recensione è valida
  isReviewValid(review : string) {
    const words = review.trim().split(' ');
    return words.length >= 50;
  }

  // Funzione che viene chiamata quando l'utente invia una nuova recensione
  createReview(event: Event, form: NgForm){
    event.preventDefault();
    form.control.markAllAsTouched();
    if (form.valid) {
      // Recupero l'utente corrente dal localStorage
      let userComeStringa= localStorage.getItem("user");
      let user: User;
      user = JSON.parse(userComeStringa!);
      // Creo la nuova recensione
      let review ={
        userId: user!.id,
        title: this.visualisedMovie.title,
        movieId: this.id,
        team: user!.team,
        review: form.value.review,
        rating: this.review.rating
      }
      // Controllo se la recensione è valida e la aggiungo al server
      if (!this.isReviewValid(form.value.review)) {
        alert('La review deve essere lunga almeno 50 parole') ;
      } else {
        this.reviewService.addReview(review);
      }
    }
  }

  // Funzione che recupera le informazioni del film dal server
  getMovie() {
    this.http
      .get(`http://localhost:1234/api/movies/`+ this.id)
      .subscribe({
        next: (response: any) => {
         this.visualisedMovie = response;
        },
        error: () =>
 {
          console.log("Non funziona!");
        },
      });
  }
ngOnDestroy(): void {
  this.sub.unsubscribe();
}

}