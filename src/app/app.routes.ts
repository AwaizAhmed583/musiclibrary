import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HeaderComponent } from './core/header/header.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { ComparisonComponent } from './components/comparison/comparison.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'artists',
    pathMatch: 'full',
  },
  {
    path: 'artists',
    component: ArtistListComponent,
  },
  {
    path: 'detail',
    component: ArtistDetailComponent,
  },
  {
    path: 'compare',
    component: ComparisonComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
];
