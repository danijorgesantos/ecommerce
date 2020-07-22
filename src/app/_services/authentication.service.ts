import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    private messageSource = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();

    changeMessage(message) {
        console.log('service message change', message);
        this.messageSource.next(message);
    }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    updateUser() {
        return this.currentUserSubject.value;
    }

    addProductToCart(
        id: string,
        nameOfProduct: string,
        urlOfProduct: string,
        descriptionOfProduct: string,
        detailedDescriptionOfProduct: string,
        price: string,
        mainPhoto1: string,
        mainPhoto2: string,
        mainPhoto3: string,
        mainPhoto4: string,
        mainPhoto5: string,
        mainPhoto6: string,
        collectionUrl: string
    ) {
        return this.http.post<any>(`admin/addProductToUserCart`, {
            id,
            nameOfProduct,
            urlOfProduct,
            descriptionOfProduct,
            detailedDescriptionOfProduct,
            price,
            mainPhoto1,
            mainPhoto2,
            mainPhoto3,
            mainPhoto4,
            mainPhoto5,
            mainPhoto6,
            collectionUrl
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    register(name: string, email: string, password: string) {
        return this.http.post<any>(`admin/register`, { name, email, password })
            .pipe(map(user => {
                return user;
            }));
    }

    login(email: string, password: string) {
        return this.http.post<any>(`admin/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}