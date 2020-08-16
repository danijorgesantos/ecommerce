import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { CollectionService } from '../_services/collection.service';
import { AuthenticationService } from '../_services/authentication.service';

import { NavbarFacade } from './navbar.facade';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NavbarFacade]
})
export class NavbarComponent implements OnInit {

  public loginOn = false;
  public count = 0;
  loading = false;
  returnUrl: string;
  error = '';
  public collections = null;
  public message: boolean;
  public shoppingCartNumber: number;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private collectionService: CollectionService,
    private facade: NavbarFacade
  ) {
    this.loginOn = this.authenticationService.currentUserValue ? true : false;
  }

  ngOnInit(): void {
    this.facade.selectedShoppingCart$.subscribe(
      data => {
        this.shoppingCartNumber = data.length;
      }
    );

    this.getProducts();

    this.authenticationService.currentMessage.pipe(debounce(() => timer(1000))).subscribe(message => {
      this.loginOn = !!this.authenticationService.currentUserValue ? true : false;
    });

  }

  public onClickIncrement() {
    this.facade.Login();
  }


  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.loginOn = this.authenticationService.currentUserValue ? true : false;
  }

  public getProducts() {
    this.loading = true;
    this.collectionService.getAllCollections()
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.collections = data;
            this.loading = false;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
