import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loading = false;
  returnUrl: string;
  error = '';

  public products = null;

  constructor(
    private productService: ProductService
  ) { }

  public getProducts() {
    this.loading = true;
    this.productService.getAllProducts()
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.loading = false;
            this.products = data;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
