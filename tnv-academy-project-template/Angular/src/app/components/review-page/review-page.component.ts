import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { ReviewService } from "src/app/@shared/services/review.service";
import { NgForm } from "@angular/forms";
import {User} from "src/app/models/user";

@Component({
  selector: 'tnv-review-page',
  templateUrl: './review-page.component.html',
  styleUrls:['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit, OnDestroy {
  
id: number = 0;
private sub: any;
public visualisedMovie = {
  title: "",
  subtitle: "",
  overview: "",
  poster_path: "",
  id:""
};

constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,
  private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params =>{
      this.id = +params["id"];
      this.getMovie();
    })
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
        rating: form.value.rating
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