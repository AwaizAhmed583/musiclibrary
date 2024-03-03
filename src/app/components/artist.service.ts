import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private artistsUrl = 'assets/artists.json'; // Assuming you have a JSON file with artist data
  private API_KEY = '9662fda2c1b8fbcb1f08ef3e326d806a';
  private API_URL = 'http://ws.audioscrobbler.com/2.0/';

  artistInfo = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) { }

  getTopTracks(artistname: string): Observable<any> {
    const url = `${this.API_URL}?method=artist.gettoptracks&artist=${artistname}&api_key=${this.API_KEY}&format=json`;
    return this.http.get<any>(url);
  }

  getTopAlbumns(artistname: string): Observable<any> {
    const url = `${this.API_URL}?method=artist.gettopalbums&artist=${artistname}&api_key=${this.API_KEY}&format=json`;
    return this.http.get<any>(url);
  }

  getTopArtistsByCountry(country: string): Observable<any> {
    const url = `${this.API_URL}?method=geo.getTopArtists&country=${country}&api_key=${this.API_KEY}&format=json`;
    return this.http.get(url);
  }

  getArtistsBasedOnSearch(searchKey: string): Observable<any> {
    const url = `${this.API_URL}?method=artist.search&artist=${searchKey}&api_key=${this.API_KEY}&format=json`;
    return this.http.get(url);
  }

  getArtistInfo(searchKey: string): Observable<any> {
    const url = `${this.API_URL}?method=artist.getinfo&artist=${searchKey}&api_key=${this.API_KEY}&format=json`;
    return this.http.get(url);
  }


}