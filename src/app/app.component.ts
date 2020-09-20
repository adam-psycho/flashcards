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

  public data = JSON.parse(JSON.stringify(hanzi));
  public selectedData = JSON.parse(JSON.stringify(hanzi));
  public keys: string[] = hanzi.keys;
  public sides = {
  	front: ['hanzi'],
  	back: ['pinyin', 'english']
  };
  public cardFlipped: boolean = false;
  private previousKeys: number[] = [];
  public onFlashcards = true;

  public currentCardIndex: number;

  private getRandomCardIndex(): number {
  	const cardCount = this.selectedData.cards.length;
  	return Math.floor(Math.random() * cardCount);
  }

  public nextCard(): void {
  	if (this.selectedData.cards.length > 1) {
	  	let newCardIndex = this.getRandomCardIndex();
	  	if (this.previousKeys.length >= (this.selectedData.cards.length - 1)) {
	  		this.previousKeys = [];
	  	}
	  	while (this.previousKeys.indexOf(newCardIndex) !== -1 || newCardIndex === this.currentCardIndex) {
	  		newCardIndex = this.getRandomCardIndex();
	  	}
	  	this.previousKeys.push(this.currentCardIndex);
	  	console.log(this.previousKeys);
	  	this.currentCardIndex = newCardIndex;
  	}
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

  public isCardSelected(card): boolean {
  	let key = this.keys[0];
  	return this.selectedData.cards.filter(x => x[key] === card[key]).length > 0;
  }

  public selectCard(card, checked: boolean): void {
  	if (!checked) {
  		let key = this.keys[0];
  		let cards =this.selectedData.cards.filter(x => x[key] !== card[key]);
  		this.selectedData.cards = cards;
  	} else {
  		this.selectedData.cards.push(card);
  	}
  	this.currentCardIndex = this.getRandomCardIndex();
  }

  public selectAll(checked: boolean): void {
  	if (checked) {
  		this.selectedData.cards = JSON.parse(JSON.stringify(this.data.cards));
  	} else {
  		this.selectedData.cards = [];
  	}
  	this.currentCardIndex = this.getRandomCardIndex();
  }
}
