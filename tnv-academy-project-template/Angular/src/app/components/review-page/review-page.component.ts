import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'tnv-review-page',
  templateUrl: './review-page.component.html',
  styleUrls:['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit, OnDestroy {
  
id: number = 0;
private sub: any;

constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params =>{
      this.id = +params["id"];
      this.getMovie();
    })
  }
  getMovie() {
    this.http
      .get(
        `http://localhost:1234/api/movies/`+ this.id
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
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
