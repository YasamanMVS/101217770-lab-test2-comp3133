import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../../interfaces/character.interface';
import { HarryPotterService } from '../../services/harry-potter.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CharacterFilterComponent } from '../character-filter/character-filter.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, CharacterFilterComponent],
  template: `
    <div class="container">
      <h1>Harry Potter Characters</h1>
      <app-character-filter (houseSelected)="filterByHouse($event)"></app-character-filter>
      <div class="character-grid">
        <mat-card *ngFor="let character of characters" class="character-card" (click)="showDetails(character)">
          <img mat-card-image [src]="character.image || 'assets/placeholder.png'" [alt]="character.name">
          <mat-card-content>
            <h2>{{character.name}}</h2>
            <p [style.color]="getHouseColor(character.house)">{{character.house || 'Unknown House'}}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .character-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .character-card {
      cursor: pointer;
      transition: transform 0.2s;
      &:hover {
        transform: translateY(-5px);
      }
      img {
        height: 280px;
        object-fit: cover;
      }
      mat-card-content {
        text-align: center;
        h2 {
          margin: 10px 0;
          font-size: 1.2em;
        }
      }
    }
  `]
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  constructor(
    private harryPotterService: HarryPotterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllCharacters();
  }

  loadAllCharacters(): void {
    this.harryPotterService.getAllCharacters().subscribe(
      characters => this.characters = characters
    );
  }

  filterByHouse(house: string): void {
    if (house) {
      this.harryPotterService.getCharactersByHouse(house).subscribe(
        characters => this.characters = characters
      );
    } else {
      this.loadAllCharacters();
    }
  }

  showDetails(character: Character): void {
    this.router.navigate(['/character', character.id]);
  }

  getHouseColor(house: string): string {
    switch (house.toLowerCase()) {
      case 'gryffindor': return '#740001';
      case 'slytherin': return '#1a472a';
      case 'hufflepuff': return '#ecb939';
      case 'ravenclaw': return '#0e1a40';
      default: return '#000000';
    }
  }
}
