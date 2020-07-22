import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { CollectionService } from '../_services/collection.service';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loginOn = false;
  public count = 0;
  loading = false;
  returnUrl: string;
  error = '';
  public collections = null;
  public message: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private collectionService: CollectionService
  ) {
    this.loginOn = this.authenticationService.currentUserValue ? true : false;
  }

  ngOnInit(): void {
    this.getProducts();
    //------------------service 
    this.authenticationService.currentMessage.pipe(debounce(() => timer(1000))).subscribe(message => {
      this.loginOn = !!this.authenticationService.currentUserValue ? true : false;
      console.log('navbar message change', this.loginOn);
    });
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
            console.log(data)
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
