import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'tnv-movie-selection',
  templateUrl: './movie-selection.component.html',
  styleUrls: ['./movie-selection.component.scss']
})
export class MovieSelectionComponent implements OnInit {
  // definizione variabili del componente
  currentUser: Partial<User> = {};
  movieSelectionIndex = 0;
  public visualisedMovie = {
    title: "",
    subtitle: "",
    overview: "",
    poster_path: "",
    id:""
  };
  movieSelection = [];
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {

  }
  getRandomMovie() {
    this.http
      .get(
        `http://localhost:1234/api/movies/random`
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.movieSelection = response;
          this.visualisedMovie = this.movieSelection[0];
        },
        error: () => {
          console.log("Non funziona!");
        },
      });
  }

  nextMovie(){
    if (this.movieSelectionIndex == 9){
      this.movieSelectionIndex = 0;
    }else{this.movieSelectionIndex++}
   this.visualisedMovie= this.movieSelection[this.movieSelectionIndex];
  }

  previousMovie(){
    if (this.movieSelectionIndex == 0){
      this.movieSelectionIndex = 9;
    }else{this.movieSelectionIndex--}
   this.visualisedMovie= this.movieSelection[this.movieSelectionIndex];
  }

  reviewMovie(){
    this.router.navigate(["/reviews", this.visualisedMovie.id]);
    console.log ();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.getRandomMovie();
  }

}
