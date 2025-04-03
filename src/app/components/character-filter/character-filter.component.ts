import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HogwartsHouse } from '../../interfaces/character.interface';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, FormsModule],
  template: `
    <mat-form-field appearance="fill" class="house-filter">
      <mat-label>Filter by House</mat-label>
      <mat-select [(ngModel)]="selectedHouse" (selectionChange)="onHouseChange()">
        <mat-option value="">All Houses</mat-option>
        <mat-option value="Gryffindor">Gryffindor</mat-option>
        <mat-option value="Slytherin">Slytherin</mat-option>
        <mat-option value="Hufflepuff">Hufflepuff</mat-option>
        <mat-option value="Ravenclaw">Ravenclaw</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [`
    .house-filter {
      width: 200px;
      margin: 20px 0;
    }
  `]
})
export class CharacterFilterComponent {
  @Output() houseSelected = new EventEmitter<HogwartsHouse>();
  selectedHouse: HogwartsHouse = '';

  onHouseChange(): void {
    this.houseSelected.emit(this.selectedHouse);
  }
} 