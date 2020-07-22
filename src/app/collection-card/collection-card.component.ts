import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent implements OnInit {

  @Input() collection: any;

  constructor() { }

  ngOnInit(): void {
  }

}
