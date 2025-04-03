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
import { SpellDialogComponent } from '../spell-dialog/spell-dialog.component';

interface Spell {
  name: string;
  description: string;
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, MatIconModule, CharacterFilterComponent, SpellDialogComponent],
  template: `
    <div class="container">
      <h1>Harry Potter Characters</h1>
      <app-character-filter (filterChanged)="handleFilterChange($event)"></app-character-filter>
      
      <div class="character-grid" *ngIf="!showSpells">
        <mat-card *ngFor="let character of characters" class="character-card" (click)="showDetails(character)">
          <div class="card-image-container">
            <img [src]="character.image || 'assets/placeholder.png'" [alt]="character.name">
            <div class="character-status" [class.alive]="character.alive">
              {{ character.alive ? 'Alive' : 'Deceased' }}
            </div>
          </div>
          <mat-card-content>
            <h2>{{character.name}}</h2>
            <p [class]="'house-name ' + character.house?.toLowerCase()">{{character.house || 'Unknown House'}}</p>
            
            <div class="character-details">
              <div class="detail-section">
                <h3>Personal Info</h3>
                <p><strong>Birth:</strong> {{character.dateOfBirth || 'Unknown'}}</p>
                <p><strong>Ancestry:</strong> {{character.ancestry || 'Unknown'}}</p>
                <p><strong>Eyes:</strong> {{character.eyeColour || 'Unknown'}}</p>
                <p><strong>Hair:</strong> {{character.hairColour || 'Unknown'}}</p>
              </div>

              <div class="detail-section">
                <h3>Magical Abilities</h3>
                <div class="wand-info" *ngIf="character.wand?.wood">
                  <h4>Wand</h4>
                  <p>{{character.wand.wood}} wood, {{character.wand.core}}</p>
                  <p>{{character.wand.length}} inches</p>
                </div>
                <p *ngIf="character.patronus"><strong>Patronus:</strong> {{character.patronus}}</p>
              </div>

              <div class="detail-section">
                <h3>Hogwarts Role</h3>
                <div class="role-badges">
                  <span class="badge" *ngIf="character.hogwartsStudent">Student</span>
                  <span class="badge" *ngIf="character.hogwartsStaff">Staff</span>
                </div>
              </div>

              <div class="detail-section" *ngIf="character.alternate_names?.length">
                <h3>Also Known As</h3>
                <div class="alternate-names">
                  <span class="alt-name" *ngFor="let name of character.alternate_names">{{name}}</span>
                </div>
              </div>
            </div>
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
      background-color: #121212;
      min-height: 100vh;
    }
    .character-grid, .spells-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 20px;
      padding: 0 20px;
    }
    .character-card {
      cursor: pointer;
      transition: transform 0.2s;
      background-color: #1a1a1a;
      border-radius: 8px;
      overflow: hidden;
      padding: 0;
      &:hover {
        transform: translateY(-5px);
      }
      .card-image-container {
        position: relative;
        width: 100%;
        height: 350px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }
        .character-status {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 4px 12px;
          border-radius: 16px;
          background-color: rgba(244, 67, 54, 0.9);
          color: white;
          font-size: 0.9em;
          font-weight: 500;
          &.alive {
            background-color: rgba(76, 175, 80, 0.9);
          }
        }
      }
      mat-card-content {
        padding: 16px;
        text-align: left;
        background-color: #1a1a1a;
        h2 {
          margin: 0 0 8px 0;
          font-size: 1.5em;
          color: white;
          font-weight: 500;
          text-align: center;
        }
        .house-name {
          margin: 0 0 16px 0;
          font-size: 1.1em;
          font-weight: 500;
          text-align: center;
          &.gryffindor { color: #FF0000; }
          &.slytherin { color: #00FF00; }
          &.hufflepuff { color: #FFD700; }
          &.ravenclaw { color: #0000FF; }
        }
        .character-details {
          .detail-section {
            margin-bottom: 16px;
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 4px;

            h3 {
              color: #673ab7;
              margin: 0 0 8px 0;
              font-size: 1.1em;
              font-weight: 500;
            }

            h4 {
              color: #fff;
              margin: 8px 0;
              font-size: 1em;
            }

            p {
              margin: 4px 0;
              color: #cccccc;
              font-size: 0.9em;
              strong {
                color: #fff;
              }
            }
          }

          .role-badges {
            display: flex;
            gap: 8px;
            .badge {
              padding: 4px 12px;
              border-radius: 16px;
              background-color: #673ab7;
              color: white;
              font-size: 0.9em;
            }
          }

          .alternate-names {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            .alt-name {
              padding: 4px 12px;
              border-radius: 16px;
              background-color: rgba(103, 58, 183, 0.2);
              color: #cccccc;
              font-size: 0.9em;
            }
          }

          .wand-info {
            padding: 8px 0;
          }
        }
      }
    }
    .spell-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      background-color: #1a1a1a;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(103, 58, 183, 0.3);
      }
      mat-card-content {
        h2 {
          color: #ffffff;
          margin-bottom: 10px;
          font-size: 1.3em;
        }
        .spell-preview {
          color: #cccccc;
          margin-bottom: 15px;
        }
        button {
          width: 100%;
          margin-top: 10px;
          color: #ffffff;
          border: 1px solid #673ab7;
        }
      }
    }

    @media (max-width: 768px) {
      .character-grid, .spells-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
        padding: 0 10px;
      }
      .character-card .card-image-container {
        height: 280px;
      }
      .character-card mat-card-content {
        padding: 12px;
        .character-details .detail-section {
          padding: 8px;
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
}
