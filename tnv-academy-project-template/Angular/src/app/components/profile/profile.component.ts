import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/@core/services/auth.service';
import { User } from 'src/app/models/user';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/@shared/services/review.service';
import { RatingService } from 'src/app/@shared/services/rating.service';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'tnv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: Partial<User> = {};
  
  reviews: Review[] = [];
  ratings: Rating[] = [];


  currentID = this.getID();

  constructor(private authService: AuthService, private reviewService : ReviewService, 
    private http: HttpClient, private ratingService : RatingService) { }


  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getReviews();
    this.getRatings();

    
  }

  getID(){
    console.log("Recupero l'id utente");
    let userString = localStorage.getItem("user");
    let user: User;
      user = JSON.parse(userString!);

    return user.id;
  }

  getReviews(){
    
    this.reviewService.getReviewsById().subscribe({
      next: 
      (response: Review[]) => {
        this.reviews = response.filter((x) => x.userId == this.currentID);
        console.log(this.reviews);
        }})
       }

       getRatings(){
        console.log("carico il contenuto");
        this.ratingService.getRatingsById(this.currentID).subscribe({
          next:
          (response: Rating[]) => {
           this.ratings = response.filter((x) => x.userId == '$this.currentID');
            console.log(this.reviews);
          }})
           }
         
       
}

