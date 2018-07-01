import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSearching: boolean;
  keyword: string;
  shows: any[];
  loading: boolean;
  noResults: boolean;
  constructor(public _omdb: OmdbService, private router: Router) {
    this.isSearching = false;
  }

  ngOnInit() {
  }

  searchShow():void {
    if (this.keyword) {
      this.loading = true;
      console.log(this.keyword);
      this._omdb.getShows(this.keyword)
      .then((data) => {
        this.shows = data;
        this.loading = false;
        this.noResults = (this.shows.length > 0) ? false: true;
        console.log('foundSHow', this.noResults)
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
    }
  }

  onScrollDown(): void {
    console.log("scrolling");
  }

  goToShow(id): void {
    console.log("id", id )
    this.router.navigate(['show/'+id]);
  }

  onMouseOver(): void {
    console.log("mouseover");
  }

}
