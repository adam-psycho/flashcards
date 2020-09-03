import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent{


  public cardFlipped: boolean = false;
  public loading: boolean = false;

	@Output() onNext: EventEmitter<any> = new EventEmitter(false);
  @Output() onFlip: EventEmitter<any> = new EventEmitter(false);

  @Input()
  public cardData;

  @Input()
  public keys: string[] = [];

  constructor() {
  }

  public flipCard(): void {
  	this.cardFlipped = !this.cardFlipped;
  }

  public nextCard(): void {
  	this.cardFlipped = false;
  	this.loading = true;
  	window.setTimeout(() => {
  		this.onNext.emit();
  		this.loading = false;
  	}, 700);
  }

}
