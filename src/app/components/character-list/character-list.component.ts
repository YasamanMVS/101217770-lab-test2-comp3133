import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../../interfaces/character.interface';
import { HarryPotterService } from '../../services/harry-potter.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CharacterFilterComponent, FilterType } from '../character-filter/character-filter.component';
import { SpellDialogComponent } from '../spell-dialog/spell-dialog.component';

interface Spell {
  name: string;
  description: string;
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, CharacterFilterComponent, SpellDialogComponent],
  template: `
    <div class="container">
      <h1>Harry Potter Characters</h1>
      <app-character-filter (filterChanged)="handleFilterChange($event)"></app-character-filter>
      
      <div class="character-grid" *ngIf="!showSpells">
        <mat-card *ngFor="let character of characters" class="character-card" (click)="showDetails(character)">
          <img mat-card-image [src]="character.image || 'assets/placeholder.png'" [alt]="character.name">
          <mat-card-content>
            <h2>{{character.name}}</h2>
            <p [style.color]="getHouseColor(character.house)">{{character.house || 'Unknown House'}}</p>
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
    .container {
      padding: 20px;
    }
    .character-grid, .spells-grid {
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
    .spell-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(103, 58, 183, 0.3);
      }
      mat-card-content {
        h2 {
          color: #673ab7;
          margin-bottom: 10px;
        }
        .spell-preview {
          color: #666;
          margin-bottom: 15px;
        }
        button {
          width: 100%;
          margin-top: 10px;
        }
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
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAllCharacters();
  }

  loadAllCharacters(): void {
    this.harryPotterService.getAllCharacters().subscribe(
      characters => this.characters = characters
    );
  }

  handleFilterChange(event: {type: FilterType, house?: string}): void {
    this.showSpells = false;
    
    switch(event.type) {
      case 'all':
        this.loadAllCharacters();
        break;
      case 'house':
        if (event.house) {
          this.harryPotterService.getCharactersByHouse(event.house).subscribe(
            characters => this.characters = characters
          );
        } else {
          this.loadAllCharacters();
        }
        break;
      case 'students':
        this.harryPotterService.getStudents().subscribe(
          characters => this.characters = characters
        );
        break;
      case 'staff':
        this.harryPotterService.getStaff().subscribe(
          characters => this.characters = characters
        );
        break;
      case 'spells':
        this.showSpells = true;
        this.harryPotterService.getSpells().subscribe(
          spells => this.spells = spells
        );
        break;
    }
  }

  showDetails(character: Character): void {
    this.router.navigate(['/character', character.id]);
  }

  showSpellDetails(spell: Spell): void {
    this.dialog.open(SpellDialogComponent, {
      data: spell,
      width: '400px',
      panelClass: 'spell-dialog'
    });
  }

  getHouseColor(house: string): string {
    switch (house?.toLowerCase()) {
      case 'gryffindor': return '#740001';
      case 'slytherin': return '#1a472a';
      case 'hufflepuff': return '#ecb939';
      case 'ravenclaw': return '#0e1a40';
      default: return '#000000';
    }
  }
}
