import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-cards',
  templateUrl: './total-cards.component.html',
  styleUrls: ['./total-cards.component.scss']
})
export class TotalCardsComponent implements OnInit {
  @Input() cardNameVal: any;
  constructor() { }

  ngOnInit(): void {
  }

}
