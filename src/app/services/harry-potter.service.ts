import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class HarryPotterService {
  private baseUrl = 'https://hp-api.onrender.com/api';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/house/${house}`);
  }

  getStudents(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/students`);
  }

  getStaff(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters/staff`);
  }

  getSpells(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/spells`);
  }

  getCharacterById(id: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/character/${id}`);
  }
} 