import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';

import { CheckoutPageFacade } from './checkout-page.facade';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
  providers: [CheckoutPageFacade]
})
export class CheckoutPageComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  public user = null;
  public userProducts = [];
  public total = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private facade: CheckoutPageFacade
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    console.log('user', this.user)
    this.facade.selectedShoppingCart$.subscribe(
      data => {
        this.userProducts = data;

        if (!!this.userProducts[0]) {
          this.total = this.userProducts.reduce((sum, p) => parseInt( sum ) + parseInt( p.price ), 0);
        }
      }
    );

    //get data from loggedin user and put into the form
    this.loginForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      message: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  public onSubmit() {
    //   this.submitted = true;

    //   // stop here if form is invalid
    //   if (this.loginForm.invalid) {
    //     return;
    //   }

    //   this.loading = true;
    //   this.authenticationService.getUserInfo()
    //     .subscribe(
    //       data => {
    //         console.log(data);
    //       },
    //       error => {
    //         this.error = error;
    //         this.loading = false;
    //       });
  }
}
