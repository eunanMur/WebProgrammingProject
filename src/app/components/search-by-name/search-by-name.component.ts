import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CocktailService } from '../../services/cocktail.service';
import { Cocktail } from '../../cocktail';
import { TextToSpeechService } from '../../services/responsive-voice.service';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css'],
})
export class SearchByNameComponent {
  name: string = '';
  cocktails: Cocktail[] = [];

  constructor(private cocktailService: CocktailService) {}

  searchByName(): void {
    if (this.name) {
      this.cocktailService.searchByName(this.name).subscribe({
        next: (data) => (this.cocktails = data.drinks || []),
        error: (err) => {
          console.error('Failed to search cocktails by name:', err);
          this.cocktails = [];
        },
      });
    }
  }

  addCocktailToDb(cocktail: Cocktail): void {
    this.cocktailService.addCocktail(cocktail).subscribe({
      next: (response) => console.log('Cocktail added!', response),
      error: (error) => console.error('Error adding cocktail', error),
    });
  }
}
