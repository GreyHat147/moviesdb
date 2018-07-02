import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OmdbService } from '../../services/omdb.service';
import { error, log } from 'util';
import { Router } from '@angular/router';
declare var $ :any;

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
  invalidKeyword: boolean;
  errorProccesed: boolean = false;
  showPop: boolean = false;
  constructor(public _omdb: OmdbService, private router: Router) {
    this.isSearching = false;
    // $(function () {
    //   $('[data-toggle="tooltip"]').tooltip()
    // })
  }

  ngOnInit() {
  }

  searchShow():void {
    this.invalidKeyword = this.validateKeyWord();
    if (this.keyword && !this.invalidKeyword) {
      this.errorProccesed = false;
      this.loading = true;
      this._omdb.getShows(this.keyword)
      .then((data) => {
        this.loading = false;
        this.shows = data;
        this.noResults = (this.shows.length > 0) ? false: true;
      })
      .catch((error) => {
        this.shows = [];
        this.loading = false;
        this.errorProccesed = true;
      });
    } else {
      this.shows = [];
    }
  }

  onScrollDown(): void {
    // console.log("scrolling");
  }

  goToShow(id): void {
    this.router.navigate(['show/'+id]);
  }

  onMouseOver(): void {
    if (this.shows.length > 9) {
      this.scrolled = true;
    }
  }

  showPopover(actors: any, rating: any, index: any): void {
    this.shows[index].showPopover = true;
    $('#popover-dismiss').popover({
      trigger: 'hover',
      content: 'Actors: ' + actors,
      placement: 'top',
      animation: true,
      title: 'Ratings ' + rating
    })
    $('#popover-dismiss').popover('update')
    $('#popover-dismiss').popover('show');
  }


  hidePopover(index): void {
    this.shows[index].showPopover = true;
    $('#popover-dismiss').popover('hide');
  }

  validateKeyWord(): boolean {
    const regExp = /@|#/g;
    return regExp.test(this.keyword);
  }

}
