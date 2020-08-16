import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { CollectionService } from '../_services/collection.service';
import { AuthenticationService } from '../_services/authentication.service';

import { ProductPageFacade } from './product-page.facade';



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  providers: [ProductPageFacade]
})
export class ProductPageComponent implements OnInit {

  post: any;
  value: any = null;
  urlOfProduct: any = null;
  collectionUrl: any = null;
  public GenuineLong: SafeHtml;
  public product = null;
  public loading = false;
  public error = {};
  public loginOn: boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private collectionService: CollectionService,
    private titleService: Title,
    private meta: Meta,
    private authenticationService: AuthenticationService,
    private router: Router,
    private facade: ProductPageFacade
  ) {
    this.loginOn = this.authenticationService.currentUserValue ? true : false;
  }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.urlOfProduct = params['product']
      this.collectionUrl = params['url']
      this.getSingleProductFromCollection(this.urlOfProduct);
    },
      response => {
      },
      () => {
      });
  }

  public getSingleProductFromCollection(id) {
    this.loading = true;
    this.collectionService.getSingleProductFromCollection(this.collectionUrl, this.urlOfProduct)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.loading = false;
            this.product = data;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  public addToBag() {
    if (!this.loginOn) {
      this.router.navigate(['/login']);
    } else {
      this.facade.AddToBag(this.product);
      this.router.navigate(['/']);
    }
  }

}
