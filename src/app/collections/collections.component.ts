import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { CollectionService } from '../_services/collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {


  loading = false;
  returnUrl: string;
  error = '';

  public collections = null;

  constructor(
    private collectionService: CollectionService
  ) { }

  public getProducts() {
    this.loading = true;
    this.collectionService.getAllCollections()
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            console.log(data);
            this.collections = data;
            this.loading = false;
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
