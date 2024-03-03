import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ArtistService } from '../artist.service';
import { response } from 'express';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss',
})
export class ComparisonComponent implements OnInit {
  artists1: any = [];
  artists2: any = [];

  artistInfo1: any = {};
  artistInfo2: any = {};

  artist1TrackInfo: any = [];
  artist2TrackInfo: any = [];

  searchArtist1 = new FormControl();
  searchArtist2 = new FormControl();

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.searchArtist1.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchKey) => {
        if (searchKey != '') {
          this.artistService
            .getArtistsBasedOnSearch(searchKey)
            .subscribe((response) => {
              let tempData = response.results.artistmatches.artist.map(
                (track: any) => {
                  return {
                    name: track.name,
                    listeners: track.listeners,
                    image: track.image.find((img: any) => img.size === 'small')[
                      '#text'
                    ],
                  };
                }
              );
              this.artists1 = JSON.parse(JSON.stringify(tempData));
            });
        } else {
          this.artists1 = [];
        }
      });

    this.searchArtist2.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchKey) => {
        if (searchKey != '') {
          this.artistService
            .getArtistsBasedOnSearch(searchKey)
            .subscribe((response) => {
              let tempData = response.results.artistmatches.artist.map(
                (track: any) => {
                  return {
                    name: track.name,
                    listeners: track.listeners,
                    image: track.image.find((img: any) => img.size === 'small')[
                      '#text'
                    ],
                  };
                }
              );
              this.artists2 = JSON.parse(JSON.stringify(tempData));
            });
        } else {
          this.artists2 = [];
        }
      });
  }

  onArtist1Selected(value: string) {
    this.artistService.getArtistInfo(value).subscribe((response) => {
      this.artistInfo1['name'] = response.artist.name;
      this.artistInfo1['listeners'] = response.artist.stats.listeners;
      this.artistInfo1['playcount'] = response.artist.stats.playcount;
      this.artistInfo1['moreInfo'] = response.artist.url;
    });

    this.artistService.getTopTracks(value).subscribe((response) => {
      this.artist1TrackInfo = response.toptracks.track.map((track: any) => {
        return {
          name: track.name,
          listeners: track.listeners,
          playcount: track.playcount,
          image: track.image.find((img: any) => img.size === 'small')['#text'],
        };
      });
      this.artist1TrackInfo = this.artist1TrackInfo.splice(0, 10);
    });
  }

  onArtist2Selected(value: string) {
    console.log('** value is --', value);
    this.artistService.getArtistInfo(value).subscribe((response) => {
      this.artistInfo2['name'] = response.artist.name;
      this.artistInfo2['listeners'] = response.artist.stats.listeners;
      this.artistInfo2['playcount'] = response.artist.stats.playcount;
      this.artistInfo2['moreInfo'] = response.artist.url;
    });

    this.artistService.getTopTracks(value).subscribe((response) => {
      this.artist2TrackInfo = response.toptracks.track.map((track: any) => {
        return {
          name: track.name,
          listeners: track.listeners,
          playcount: track.playcount,
          image: track.image.find((img: any) => img.size === 'small')['#text'],
        };
      });
      this.artist2TrackInfo = this.artist2TrackInfo.splice(0, 10);
    });
  }
}
