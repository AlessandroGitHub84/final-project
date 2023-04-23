import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tnv-movie-selection',
  templateUrl: './movie-selection.component.html',
  styleUrls: ['./movie-selection.component.scss']
})
export class MovieSelectionComponent implements OnInit  {
// definizione variabili del componente

movie = {};

  constructor(private http: HttpClient) { 

  }
  getRandomMovie() {
    const latestId = 30000;
    const randomId = Math.round(Math.random() * latestId);

    this.http
      .get(
        `http://localhost:1234/api/movies/random`
      )
      .subscribe({
        next: (res: any) => {
          console.log("Funziona!");},
          error: () => {
            console.log("Non funziona!");
          },
        });
      }

  ngOnInit(): void {
    this.getRandomMovie();
  }

}
