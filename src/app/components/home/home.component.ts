import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { error } from 'util';

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
  constructor(public _omdb: OmdbService) {
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
        console.log(data)
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


}
