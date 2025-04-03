import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spell-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{data.name}}</h2>
    <mat-dialog-content>
      <p class="spell-description">{{data.description}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .spell-description {
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      margin: 16px 0;
    }
    h2 {
      color: #673ab7;
      margin: 0;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 4px 4px 0 0;
    }
  `]
})
export class SpellDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SpellDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; description: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
} 