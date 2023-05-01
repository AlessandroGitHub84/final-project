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

  review: Review = { userId:0,
    title: "",
    movieId:0,
    team: "",
    review: "",
    rating: 0 };

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.sub = this.route.params.subscribe(params =>{
      this.id = +params["id"];
      this.getReview();
      this.getMovie();
    })
  }
  getReview() {
    this.http
    .get(
      `http://localhost:1234/api/review/${this.currentUser.id}/${this.id}`
    )
    .subscribe({
      next: (response: any) => {
       this.review = response;
      },
      error: () => {
        console.log("Non funziona!");
      },
    });
}
  isReviewValid(review : string) {
    const words = review.trim().split(' ');
    return words.length >= 50;
  }


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
        console.log('la review deve essere lunga almeno 50 parole') ;
       } 
 
       this.reviewService.updateReview(this.review);
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