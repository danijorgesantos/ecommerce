import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  @Input() collectionUrl: any;

  constructor() { }

  ngOnInit(): void {
    console.log('productcs', this.collectionUrl)
  }

}
