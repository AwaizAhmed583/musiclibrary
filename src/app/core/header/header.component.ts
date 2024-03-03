import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ComparisonComponent } from '../../components/comparison/comparison.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ComparisonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private dialog: MatDialog, private router: Router) {}
  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(ComparisonComponent);
  }

  navigateToComparePage() {
    this.router.navigateByUrl('compare');
  }
}
