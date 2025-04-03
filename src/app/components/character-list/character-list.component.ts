import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../../interfaces/character.interface';
import { HarryPotterService } from '../../services/harry-potter.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CharacterFilterComponent, FilterType } from '../character-filter/character-filter.component';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';

interface Spell {
  name: string;
  description: string;
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, MatIconModule, CharacterFilterComponent],
  template: `
    <div class="container">
      <app-character-filter (filterChanged)="handleFilterChange($event)"></app-character-filter>
      
      <div class="character-grid" *ngIf="!showSpells">
        <mat-card *ngFor="let character of characters" class="character-card" (click)="showDetails(character)">
          <div class="card-image-container">
            <img [src]="character.image || 'assets/placeholder.png'" [alt]="character.name">
            <div class="card-overlay">
              <mat-icon>info</mat-icon>
            </div>
          </div>
          <mat-card-content>
            <h2>{{character.name}}</h2>
            <p [class]="'house-name ' + character.house.toLowerCase()">{{character.house || 'Unknown House'}}</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="spells-grid" *ngIf="showSpells">
        <mat-card *ngFor="let spell of spells" class="spell-card" (click)="showSpellDetails(spell)">
          <mat-card-content>
            <h2>{{spell.name}}</h2>
            <p class="spell-preview">{{spell.description | slice:0:100}}...</p>
            <button mat-button color="primary">View Details</button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      max-width: 100vw;
      overflow-x: hidden;
      min-height: 100vh;
      background-color: #121212;
      font-family: 'Cinzel', serif;
    }
    
    .container {
      padding: 20px;
      min-height: 100vh;
      width: 100%;
      box-sizing: border-box;
      background-color: #121212;
      max-width: 1400px;
      margin: 0 auto;
    }

    .character-grid, .spells-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin: 20px auto;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
    }

    .character-card, .spell-card {
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background-color: #1a1a1a !important;
      border-radius: 12px !important;
      overflow: hidden;
      padding: 0;
      border: 2px solid #333333;
      box-shadow: 0 8px 16px rgba(0,0,0,0.5) !important;
      height: 100%;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-5px);
        border-color: #444444;
        box-shadow: 0 12px 24px rgba(0,0,0,0.7) !important;
      }
    }

    .card-image-container {
      position: relative;
      width: 100%;
      padding-top: 140%;
      overflow: hidden;
      background-color: #000000;
      
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        opacity: 0.9;
        transition: all 0.3s ease;
      }

      .card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;

        mat-icon {
          color: white;
          font-size: 48px;
          width: 48px;
          height: 48px;
        }
      }
    }

    .character-card:hover {
      .card-image-container img {
        opacity: 1;
        transform: scale(1.05);
      }

      .card-overlay {
        opacity: 1;
      }
    }

    mat-card-content {
      padding: 16px;
      text-align: center;
      background-color: #1a1a1a !important;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h2 {
        margin: 0 0 8px 0;
        font-size: 1.4rem;
        color: white;
        font-weight: 500;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-family: 'IM Fell English SC', serif;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      }

      .house-name {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-family: 'Cinzel', serif;

        &.gryffindor { color: #FF0000; }
        &.slytherin { color: #00FF00; }
        &.hufflepuff { color: #FFD700; }
        &.ravenclaw { color: #0000FF; }
      }
    }

    .spell-card {
      mat-card-content {
        padding: 20px;

        h2 {
          color: #d4af37;
          margin-bottom: 12px;
          font-family: 'IM Fell English SC', serif;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .spell-preview {
          color: #ffffff;
          margin-bottom: 16px;
          line-height: 1.5;
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
        }

        button {
          margin-top: auto;
          font-family: 'Cinzel', serif;
          letter-spacing: 1px;
        }
      }
    }

    /* Mobile Devices */
    @media (max-width: 600px) {
      .container {
        padding: 12px;
      }

      .character-grid, .spells-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
        margin: 12px auto;
      }

      .character-card, .spell-card {
        border-width: 1px;

        mat-card-content {
          padding: 12px;

          h2 {
            font-size: 1.2rem;
          }

          .house-name {
            font-size: 1rem;
            letter-spacing: 1px;
          }
        }
      }

      .card-image-container {
        padding-top: 130%;
      }
    }

    /* Tablets */
    @media (min-width: 601px) and (max-width: 960px) {
      .character-grid, .spells-grid {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 20px;
      }
    }

    /* Laptops and larger screens */
    @media (min-width: 961px) {
      .character-grid, .spells-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }
    }
  `]
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  spells: Spell[] = [];
  showSpells = false;

  constructor(
    private harryPotterService: HarryPotterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.harryPotterService.getAllCharacters().subscribe(
      (data: Character[]) => {
        this.characters = data;
      },
      (error: Error) => {
        console.error('Error fetching characters:', error);
      }
    );
  }

  showDetails(character: Character): void {
    this.dialog.open(CharacterDialogComponent, {
      data: character,
      width: '90%',
      maxWidth: '800px',
      panelClass: 'character-dialog'
    });
  }

  handleFilterChange(filter: { type: FilterType; house?: string }): void {
    this.showSpells = filter.type === 'spells';
    
    if (filter.type === 'all') {
      if (filter.house) {
        this.harryPotterService.getCharactersByHouse(filter.house).subscribe(
          (data: Character[]) => {
            this.characters = data;
          },
          (error: Error) => {
            console.error('Error fetching characters by house:', error);
          }
        );
      } else {
        this.loadCharacters();
      }
    } else if (filter.type === 'students') {
      this.harryPotterService.getStudents().subscribe(
        (data: Character[]) => {
          this.characters = data;
        },
        (error: Error) => {
          console.error('Error fetching students:', error);
        }
      );
    } else if (filter.type === 'staff') {
      this.harryPotterService.getStaff().subscribe(
        (data: Character[]) => {
          this.characters = data;
        },
        (error: Error) => {
          console.error('Error fetching staff:', error);
        }
      );
    } else if (filter.type === 'spells') {
      this.harryPotterService.getSpells().subscribe(
        (data: any[]) => {
          this.spells = data;
        },
        (error: Error) => {
          console.error('Error fetching spells:', error);
        }
      );
    }
  }

  showSpellDetails(spell: Spell): void {
    alert(`${spell.name}: ${spell.description}`);
  }
}
