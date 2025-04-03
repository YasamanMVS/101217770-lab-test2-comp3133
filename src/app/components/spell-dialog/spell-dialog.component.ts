import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface SpellData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-spell-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{data.name}}</h2>
    <mat-dialog-content>
      <p>{{data.description}}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #1a1a1a;
      color: white;
      padding: 20px;
      border-radius: 8px;
    }
    h2 {
      color: #673ab7;
      margin: 0 0 16px 0;
      font-size: 1.5em;
    }
    p {
      color: #cccccc;
      line-height: 1.6;
      margin: 0 0 20px 0;
    }
    mat-dialog-actions {
      margin-bottom: -10px;
      padding: 8px 0;
    }
    button {
      color: white !important;
    }
  `]
})
export class SpellDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SpellDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SpellData
  ) {}

  close(): void {
    this.dialogRef.close();
  }
} 