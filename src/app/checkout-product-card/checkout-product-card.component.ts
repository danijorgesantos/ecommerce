import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-product-card',
  templateUrl: './checkout-product-card.component.html',
  styleUrls: ['./checkout-product-card.component.scss']
})
export class CheckoutProductCardComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit(): void {
    console.log('this.product', this.product);
  }

}
