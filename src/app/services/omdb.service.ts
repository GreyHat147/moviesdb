import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private API_KEY = environment.apikey;
  private OMDB_URL = "http://www.omdbapi.com";
  constructor(private http: HttpClient) { }

  getShows(keyword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.OMDB_URL}/?s=${keyword}&apikey=${this.API_KEY}`;
      this.http.get(url)
      .toPromise()
      .then((response: any) => {
          return this.getShowsWithAllData(response.Search);
      })
      .then((shows: any[]) => {
          resolve(shows);
      })
      .catch((error) => reject(error));
    });
  }

  getShowById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.OMDB_URL}/?i=${id}&apikey=${this.API_KEY}`;
      this.http.get(url)
      .toPromise()
      .then((response: any) => {
          resolve(response);
      })
      .catch((error) => reject(error));
    });
  }

  getShowsWithAllData(shows: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        const newShows = [];
        const arrayProm = [];
        if (shows && shows.length > 0) {
          shows.forEach((show, index) => {
              arrayProm.push(this.getShowById(show.imdbID)
              .then((dataShow) => {
                  newShows.push({...show, actors: dataShow.Actors, ratings: dataShow.Ratings });
              }))
          }); 
        }
        Promise.all(arrayProm)
        .then(() => {
            resolve(newShows)
        })
        .catch((error) => reject(error));
    });
  }

  getSeasonsByShow(id: string, season: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${this.OMDB_URL}/?i=${id}&Season=${season}&apikey=${this.API_KEY}`;
      this.http.get(url)
      .toPromise()
      .then((response: any) => {
          resolve(response);
      })
      .catch((error) => reject(error));
    });
  }
}
