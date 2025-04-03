import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Character } from '../../interfaces/character.interface';
import { HarryPotterService } from '../../services/harry-potter.service';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container" *ngIf="character">
      <button mat-button (click)="goBack()">
        <mat-icon>arrow_back</mat-icon> Back to List
      </button>
      
      <mat-card class="character-details">
        <div class="character-header">
          <img [src]="character.image || 'assets/placeholder.png'" [alt]="character.name">
          <div class="character-info">
            <h1>{{character.name}}</h1>
            <h2 [style.color]="getHouseColor(character.house)">{{character.house || 'Unknown House'}}</h2>
            <p>Portrayed by: {{character.actor}}</p>
          </div>
        </div>

        <mat-card-content>
          <div class="details-grid">
            <div class="detail-item">
              <h3>Basic Information</h3>
              <p><strong>Species:</strong> {{character.species}}</p>
              <p><strong>Ancestry:</strong> {{character.ancestry || 'Unknown'}}</p>
              <p><strong>Wizard:</strong> {{character.wizard ? 'Yes' : 'No'}}</p>
            </div>

            <div class="detail-item" *ngIf="character.wand">
              <h3>Wand Details</h3>
              <p><strong>Wood:</strong> {{character.wand.wood || 'Unknown'}}</p>
              <p><strong>Core:</strong> {{character.wand.core || 'Unknown'}}</p>
              <p><strong>Length:</strong> {{character.wand.length || 'Unknown'}} inches</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .character-details {
      margin-top: 20px;
    }
    .character-header {
      display: flex;
      gap: 30px;
      padding: 20px;
      img {
        width: 300px;
        height: 400px;
        object-fit: cover;
        border-radius: 8px;
      }
      .character-info {
        h1 {
          margin: 0;
          font-size: 2.5em;
        }
        h2 {
          margin: 10px 0;
          font-size: 1.8em;
        }
      }
    }
    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      padding: 20px;
      .detail-item {
        h3 {
          color: #333;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        p {
          margin: 8px 0;
        }
      }
    }
  `]
})
export class CharacterDetailsComponent implements OnInit {
  character?: Character;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private harryPotterService: HarryPotterService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.harryPotterService.getCharacterById(id).subscribe(
        characters => this.character = characters[0]
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
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