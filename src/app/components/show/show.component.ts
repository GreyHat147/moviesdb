import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OmdbService } from '../../services/omdb.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  idShow: string;
  show: any;
  episodes: any[];
  constructor(public _omdb: OmdbService, 
              private acivatedRoute: ActivatedRoute,
              private router: Router) { 
      if (this.acivatedRoute.snapshot.params['id']) {
        this.show = {
          seasons: [],
          arrSeasons: []
        };      
        this.idShow = this.acivatedRoute.snapshot.params['id'];
        this.getShow(this.idShow);
      } else {
        this.router.navigate(['']);
      }
  }

  ngOnInit() {
  }

  getShow(id: string) {
    const arrSeasons = [];
    this._omdb.getShowById(id)
    .then((show) => {
      this.show = show;
      const arrayProm = [];
      for (let index = 1; index <= Number(show.totalSeasons); index++) {
        arrayProm.push(this._omdb.getSeasonsByShow(id, index));
        arrSeasons.push(index);
      }
      return Promise.all(arrayProm);
    })
    .then((seasons) => {
        this.show.seasons = seasons;
        this.show.arrSeasons = arrSeasons;
        this.episodes = seasons[0].Episodes;
        console.log("seasons", this.show)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  setSeason(numSeason: number) {
    this.show.seasons.forEach((season) => {
      if (season.Season == numSeason.toString() ) {
        console.log("episodes")
        this.episodes = season.Episodes;
      }
    });
  }

}
