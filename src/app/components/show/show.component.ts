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
  public show: any;
  episodes: any[];
  noSeleted: boolean = false;
  errorProccesed: boolean = false;
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
      if (show.Response == "True") {
        this.show = show;
        const arrayProm = [];
        for (let index = 1; index <= Number(show.totalSeasons); index++) {
          arrayProm.push(this._omdb.getSeasonsByShow(id, index));
          arrSeasons.push({i: index, selected: false});
        }
        return Promise.all(arrayProm);
      }
      return Promise.resolve(null);
    })
    .then((seasons) => {
        if (seasons) {
          this.show.seasons = (seasons) ? seasons : [];
          this.show.arrSeasons = arrSeasons;
          this.episodes = (seasons && seasons[0]) ? seasons[0].Episodes : [];
        } else {
          this.errorProccesed = true;
        }
    })
    .catch(() => {
      this.errorProccesed = true;
    });
  }

  setSeason(numSeason: number, index: any) {
    this.show.arrSeasons[index].selected = true;
    this.show.seasons.forEach((season) => {
      if (season.Season == numSeason.toString() ) {
        this.episodes = season.Episodes;
      }
    });
  }

}
