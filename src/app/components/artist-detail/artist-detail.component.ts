import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss',
})
export class ArtistDetailComponent implements OnInit {
  topTracks: any[] = [];
  topAlbumns: any[] = [];
  artist: any;
  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService.artistInfo.subscribe((artistInfo) => {
      this.artist = Object.assign({}, artistInfo);
      this.getTopTracks();
      this.getTopAlbumns();
    });
  }

  getTopTracks() {
    this.artistService
      .getTopTracks(this.artist.name)
      .subscribe((response: any) => {
        this.topTracks = response.toptracks.track.map((track: any) => {
          return {
            name: track.name,
            listeners: track.listeners,
            playcount: track.playcount,
            image: track.image.find((img: any) => img.size === 'extralarge')[
              '#text'
            ],
          };
        });

        this.topTracks = this.topTracks.splice(0, 5);
      });
  }

  getTopAlbumns() {
    this.artistService.getTopAlbumns(this.artist.name).subscribe((response) => {
      console.log("*** album  respone is --", response)
      this.topAlbumns = response.topalbums.album.map((track: any) => {
        return {
          name: track.name,
          playcount: track.playcount,
          image: track.image.find((img: any) => img.size === 'extralarge')[
            '#text'
          ],
        };
      });
      this.topAlbumns = this.topAlbumns.splice(0, 5);
    });
  }
}
