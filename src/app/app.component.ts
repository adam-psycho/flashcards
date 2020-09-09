import { Component } from '@angular/core';
import { hanzi } from './models/hanzi';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flashcards';

  constructor() {
  	this.currentCardIndex = this.getRandomCardIndex();
  }

  public data = hanzi;
  public keys: string[] = ['hanzi', 'pinyin', 'english'];
  public sides = {
  	front: ['hanzi'],
  	back: ['pinyin', 'english']
  };
  public cardFlipped: boolean = false;
  private previousKeys: number[] = [];

  public currentCardIndex: number;

  private getRandomCardIndex(): number {
  	const cardCount = this.data.cards.length;
  	return Math.floor(Math.random() * cardCount);
  }

  public nextCard(): void {
  	let newCardIndex = this.getRandomCardIndex();
  	if (this.previousKeys.length === (this.data.cards.length - 1)) {
  		this.previousKeys = [];
  	}
  	while (this.previousKeys.indexOf(newCardIndex) !== -1 || newCardIndex === this.currentCardIndex) {
  		newCardIndex = this.getRandomCardIndex();
  	}
  	this.previousKeys.push(this.currentCardIndex);
  	console.log(this.previousKeys);
  	this.currentCardIndex = newCardIndex;
  }

  public setKeys(side: string, key: string): void {
  	const index = this.sides[side].indexOf(key);
  	if (index === -1) {
  		this.sides[side].push(key);
  	} else {
  		this.sides[side].splice(index, 1);
  	}

  	/*unset other side*/

  }

  public flipCard(): void {
  	this.cardFlipped = !this.cardFlipped;
  }
}
