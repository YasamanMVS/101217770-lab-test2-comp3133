import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HogwartsHouse } from '../../interfaces/character.interface';

export type FilterType = 'all' | 'students' | 'staff' | 'spells';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule,
    CommonModule,
    MatButtonModule
  ],
  template: `
    <div class="filter-container">
      <div class="filter-buttons">
        <button mat-raised-button 
                [class.active]="currentFilter === 'all'"
                (click)="onFilterChange('all')">
          All Characters
        </button>
        <button mat-raised-button 
                [class.active]="currentFilter === 'students'"
                (click)="onFilterChange('students')">
          Hogwarts Students
        </button>
        <button mat-raised-button 
                [class.active]="currentFilter === 'staff'"
                (click)="onFilterChange('staff')">
          Hogwarts Staff
        </button>
        <button mat-raised-button 
                [class.active]="currentFilter === 'spells'"
                (click)="onFilterChange('spells')">
          All Spells
        </button>
      </div>

      <mat-form-field *ngIf="currentFilter === 'all'" appearance="fill" class="house-filter">
        <mat-label>Filter by House</mat-label>
        <mat-select [(ngModel)]="selectedHouse" (selectionChange)="onHouseChange()">
          <mat-option value="">All Houses</mat-option>
          <mat-option value="Gryffindor">Gryffindor</mat-option>
          <mat-option value="Slytherin">Slytherin</mat-option>
          <mat-option value="Hufflepuff">Hufflepuff</mat-option>
          <mat-option value="Ravenclaw">Ravenclaw</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .filter-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin: 20px 0;
    }

    .filter-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .house-filter {
      width: 200px;
    }

    button.active {
      background-color: #673ab7;
      color: white;
    }

    @media (max-width: 600px) {
      .filter-buttons {
        flex-direction: column;
        width: 100%;
        max-width: 300px;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class CharacterFilterComponent {
  @Output() filterChanged = new EventEmitter<{type: FilterType, house?: string}>();
  
  currentFilter: FilterType = 'all';
  selectedHouse = '';

  onFilterChange(filterType: FilterType): void {
    this.currentFilter = filterType;
    if (filterType !== 'all') {
      this.selectedHouse = '';
    }
    this.filterChanged.emit({type: filterType, house: this.selectedHouse});
  }

  onHouseChange(): void {
    this.filterChanged.emit({type: 'all', house: this.selectedHouse});
  }
} 