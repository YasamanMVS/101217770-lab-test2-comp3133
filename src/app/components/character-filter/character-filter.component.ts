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
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
    }

    .filter-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin: 20px auto;
      max-width: 1200px;
      width: 100%;
    }

    .filter-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }

    button {
      flex: 1;
      min-width: 150px;
      max-width: 250px;
      padding: 8px 16px;
      font-size: 14px;
      white-space: nowrap;
      transition: all 0.3s ease;
    }

    .house-filter {
      width: 100%;
      max-width: 300px;
    }

    button.active {
      background-color: #673ab7;
      color: white;
      transform: scale(1.05);
    }

    /* Mobile Devices */
    @media (max-width: 600px) {
      :host {
        padding: 0 8px;
      }

      .filter-container {
        margin: 12px auto;
        gap: 12px;
      }

      .filter-buttons {
        flex-direction: column;
        gap: 8px;
      }

      button {
        max-width: 100%;
        width: 100%;
        margin: 0;
      }

      .house-filter {
        max-width: 100%;
      }
    }

    /* Tablets */
    @media (min-width: 601px) and (max-width: 960px) {
      .filter-buttons {
        gap: 10px;
      }

      button {
        min-width: calc(50% - 10px);
        max-width: calc(50% - 10px);
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