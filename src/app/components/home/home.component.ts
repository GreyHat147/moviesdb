import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { error, log } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('myPopover') popover: any;
  isSearching: boolean;
  keyword: string;
  shows: any[];
  loading: boolean;
  noResults: boolean;
  scrolled: boolean;
  constructor(public _omdb: OmdbService, private router: Router) {
    this.isSearching = false;
  }

  ngOnInit() {
  }

  searchShow():void {
    if (this.keyword) {
      this.loading = true;
      // console.log(this.keyword);
      this._omdb.getShows(this.keyword)
      .then((data) => {
        this.shows = data;
        console.log(this.shows)
        this.loading = false;
        this.noResults = (this.shows.length > 0) ? false: true;
        // console.log('foundSHow', this.noResults)
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
    }
  }

  onScrollDown(): void {
    // console.log("scrolling");
  }

  goToShow(id): void {
    console.log("id", id )
    this.router.navigate(['show/'+id]);
  }

  onMouseOver(): void {
    if (this.shows.length > 9) {
      console.log("mouseover");
      this.scrolled = true;
    }
  }

  showPopover(): void {
    this.popover.isIn = true;
    this.popover.displayType = "block";
  }

  hidePopover(): void {
    this.popover.isIn = false;
    this.popover.element.nativeElement.hidden = true;
  }

}
