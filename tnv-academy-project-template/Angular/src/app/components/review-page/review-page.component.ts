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

  review: Review = { userId:0,
    movieId:0,
    team: "",
    review: "",
    rating: 0 };

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.sub = this.route.params.subscribe(params =>{
      this.id = +params["id"];
      this.getMovie();
    })
  }
  isReviewValid(review : string) {
    const words = review.trim().split(' ');
    return words.length >= 50;
  }


  createReview(event: Event, form: NgForm){
    event.preventDefault()
    form.control.markAllAsTouched();
    if (form.valid) {
      let userComeStringa= localStorage.getItem("user");
      let user: User;
        user = JSON.parse(userComeStringa!)
      let review ={
        userId: user!.id,
        movieId: this.id,
        team: user!.team,
        review: form.value.review,
        rating: this.review.rating
      }
      if (!this.isReviewValid(form.value.review)) {
        console.log('The review must be at least 50 words long.') ;
       } 
 
       this.reviewService.addReview(review);
    }
  }

  
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