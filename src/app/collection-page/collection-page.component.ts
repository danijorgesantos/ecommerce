import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

import { CollectionService } from '../_services/collection.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss']
})
export class CollectionPageComponent implements OnInit {



  loading = false;
  returnUrl: string;
  error = '';

  urlProduct: any = null;

  public collection = null;
  public collectionProducts = null;
  public collectionUrl = null;

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) { }

  public getProducts() {
    this.loading = true;
    this.collectionService.getSingleCollection(this.urlProduct)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            console.log(data.collectionUrl)
            this.collection = data;
            this.collectionUrl = data.collectionUrl;
            this.collectionProducts = data.collectionProducts;
            this.loading = false;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.urlProduct = params['url'];
      this.getProducts();
    },
      response => {
      },
      () => {
      });
  }
}
