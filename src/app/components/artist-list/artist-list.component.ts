import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArtistService } from '../artist.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';

interface Artist {
  name: string;
  description: string;
  image: string;
}

interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArtistListComponent implements OnInit {
  artists: any[] = [];
  selectedCountry = 'India';
  countries = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Canada', code: 'CN' },
    { name: 'Australia', code: 'AUS'},
    { name: 'Germany', code: 'GER' },
    { name: 'France', code: 'FR' },
    { name: 'Japan' , code: 'JAP' },
    { name: 'Brazil', code: 'BRA' },
    { name: 'Italy', code: 'ITA' },
    { name: 'Spain', code: 'SPN' },
    { name: 'India' , code: 'IN'  },
    { name: 'China' , code: 'CHI'  },
    { name: 'Mexico', code: 'MEX' },
    { name: 'Netherlands', code: 'NHE'  },
    { name: 'Sweden' , code: 'SWE'},
    { name: 'Russia' ,code: 'RUS' },
    { name: 'South Korea', code: 'SUK' },
    { name: 'Argentina', code: 'ARG' },
    { name: 'Norway',  code: 'NOR' },
    { name: 'Poland',  code: 'POL'},
  ];
  topTracks: any;
  searchControl = new FormControl();
  constructor(private artistService: ArtistService, private router: Router) {}

  ngOnInit(): void {
    this.countries.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.getArtistsBycountry();

    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchValue) => {
        if (searchValue != '') {
          this.artistService
            .getArtistsBasedOnSearch(searchValue)
            .subscribe((response) => {
              this.topTracks = response.results.artistmatches.artist.map(
                (track: any) => {
                  return {
                    name: track.name,
                    listeners: track.listeners,
                    image: track.image.find(
                      (img: any) => img.size === 'extralarge'
                    )['#text'],
                  };
                }
              );

              this.topTracks = this.topTracks.splice(0, 10);
            });
        }
      });
  }

  getArtistsBycountry() {
    this.artistService
      .getTopArtistsByCountry(this.selectedCountry)
      .subscribe((response) => {
        console.log("resposne is ---", response)
        this.topTracks = response.topartists.artist.map((track: any) => {
          return {
            name: track.name,
            listeners: track.listeners,
            image: track.image.find((img: any) => img.size === 'extralarge')[
              '#text'
            ],
          };
        });

        this.topTracks = this.topTracks.splice(0, 10);
      });
  }

  onCountryChange(event: any): void {
    this.selectedCountry = event.value;
    this.getArtistsBycountry();
  }

  goToDetailPage(event: any) {
    this.artistService.artistInfo.next(event);
    this.router.navigateByUrl('detail');
  }
}
