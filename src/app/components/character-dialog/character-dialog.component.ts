import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-character-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="dialog-container">
      <h2 class="character-name">{{character.name}}</h2>
      
      <div class="character-card">
        <div class="image-container">
          <img [src]="character.image" [alt]="character.name">
        </div>

        <table class="details-table">
          <tr>
            <td class="label">Species</td>
            <td class="value">{{character.species}}</td>
          </tr>
          <tr>
            <td class="label">Gender</td>
            <td class="value">{{character.gender}}</td>
          </tr>
          <tr>
            <td class="label">House</td>
            <td class="value house-value" [class.gryffindor]="character.house === 'Gryffindor'"
                            [class.slytherin]="character.house === 'Slytherin'"
                            [class.hufflepuff]="character.house === 'Hufflepuff'"
                            [class.ravenclaw]="character.house === 'Ravenclaw'">
              {{character.house}}
            </td>
          </tr>
          <tr>
            <td class="label">Date of Birth</td>
            <td class="value">{{character.dateOfBirth}}</td>
          </tr>
          <tr>
            <td class="label">Year of Birth</td>
            <td class="value">{{character.yearOfBirth}}</td>
          </tr>
          <tr>
            <td class="label">Ancestry</td>
            <td class="value">{{character.ancestry}}</td>
          </tr>
          <tr>
            <td class="label">Eye colour</td>
            <td class="value">{{character.eyeColour}}</td>
          </tr>
          <tr>
            <td class="label">Hair colour</td>
            <td class="value">{{character.hairColour}}</td>
          </tr>
          <tr>
            <td class="label">Wand</td>
            <td class="value">
              {{character.wand.wood}}<br>
              {{character.wand.core}}<br>
              {{character.wand.length}} inches
            </td>
          </tr>
          <tr>
            <td class="label">Patronus</td>
            <td class="value">{{character.patronus || '-'}}</td>
          </tr>
          <tr>
            <td class="label">Hogwarts Student</td>
            <td class="value">{{character.hogwartsStudent ? '✓' : '✗'}}</td>
          </tr>
          <tr>
            <td class="label">Hogwarts Staff</td>
            <td class="value">{{character.hogwartsStaff ? '✓' : '✗'}}</td>
          </tr>
          <tr>
            <td class="label">Actor</td>
            <td class="value">{{character.actor}}</td>
          </tr>
          <tr>
            <td class="label">Alive</td>
            <td class="value">{{character.alive ? '✓' : '✗'}}</td>
          </tr>
        </table>
      </div>

      <div class="dialog-actions">
        <button mat-button (click)="close()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&display=swap');

    .dialog-container {
      padding: 24px;
      background-color: #1a1a1a;
      color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
      font-family: 'Cinzel', serif;
    }

    .character-name {
      text-align: center;
      color: #d4af37;
      font-size: 28px;
      margin: 0 0 20px 0;
      font-family: 'IM Fell English SC', serif;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      letter-spacing: 1px;
    }

    .character-card {
      background-color: #f5f5dc;
      border-radius: 8px;
      overflow: hidden;
      color: #000000;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      border: 2px solid #8b7355;
    }

    .image-container {
      width: 200px;
      height: 250px;
      margin: 20px auto;
      border: 3px solid #8b7355;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
    }

    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-family: 'Cinzel', serif;

      tr {
        border-bottom: 1px solid rgba(139, 115, 85, 0.3);

        &:last-child {
          border-bottom: none;
        }
      }

      td {
        padding: 8px 16px;
        font-size: 14px;

        &.label {
          width: 40%;
          font-weight: 600;
          color: #4a4a4a;
        }

        &.value {
          width: 60%;
          color: #2a2a2a;
        }

        &.house-value {
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-size: 13px;
        }
      }
    }

    .gryffindor {
      background-color: #5c0000;
      color: #ffd700 !important;
    }

    .slytherin {
      background-color: #0b2a1c;
      color: #c0c0c0 !important;
    }

    .hufflepuff {
      background-color: #c4a000;
      color: #000000 !important;
    }

    .ravenclaw {
      background-color: #000a3d;
      color: #b5b5ff !important;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      button {
        background-color: #8b7355;
        color: #ffffff;
        font-family: 'Cinzel', serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 12px;
        padding: 8px 24px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #6b5642;
        }
      }
    }

    @media (max-width: 600px) {
      .dialog-container {
        padding: 16px;
      }

      .character-name {
        font-size: 24px;
      }

      .image-container {
        width: 160px;
        height: 200px;
      }

      .details-table td {
        padding: 6px 12px;
        font-size: 13px;
      }
    }
  `]
})
export class CharacterDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public character: Character,
    private dialogRef: MatDialogRef<CharacterDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
} 