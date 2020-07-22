import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { CollectionService } from '../_services/collection.service';
import { AuthenticationService } from '../_services/authentication.service';



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
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
    private router: Router
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
    if(!this.loginOn) {
      this.router.navigate(['/login']);
    } else {
      const id = this.authenticationService.currentUserValue.id.toString();
      const nameOfProduct = this.product.name;
      const urlOfProduct = this.product.url;
      const descriptionOfProduct = this.product.description;
      const detailedDescriptionOfProduct = this.product.detailedDescription;
      const price = this.product.price;
      const mainPhoto1 = this.product.mainPhoto1;
      const mainPhoto2 = this.product.mainPhoto2;
      const mainPhoto3 = this.product.mainPhoto3;
      const mainPhoto4 = this.product.mainPhoto4;
      const mainPhoto5 = this.product.mainPhoto5;
      const mainPhoto6 = this.product.mainPhoto6;
      const collectionUrl = this.product.collectionUrl;

      this.authenticationService.addProductToCart(id, nameOfProduct, urlOfProduct, descriptionOfProduct, detailedDescriptionOfProduct, price, mainPhoto1, mainPhoto2, mainPhoto3, mainPhoto4, mainPhoto5, mainPhoto6, collectionUrl)
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
      this.router.navigate(['/']);
    }
  }

}
