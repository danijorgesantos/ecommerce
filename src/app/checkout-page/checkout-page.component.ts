import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import { MessageService } from '../_services/message.service';

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
  returnUrl: string;
  error = '';
  public user = null;
  public userProducts = [];
  public total = 0;
  public products = {};

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private facade: CheckoutPageFacade,
    private router: Router,
    private messageService: MessageService
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
    this.messageService.addMessage(
      this.f.name.value,
      this.f.email.value,
      this.f.phone.value,
      this.f.address.value,
      this.f.message.value,
      this.products
      )
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
