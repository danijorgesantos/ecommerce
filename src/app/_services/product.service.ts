import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

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

    addProduct(
        nameOfProduct: string,
        descriptionOfProduct: string,
        detailedDescriptionOfProduct: string,
        price: string,
        mainPhoto1: string,
        mainPhoto2: string,
        mainPhoto3: string,
        mainPhoto4: string,
        mainPhoto5: string,
        mainPhoto6: string,
    ) {
        return this.http.post<any>(`admin/addProduct`, {
            nameOfProduct,
            descriptionOfProduct,
            detailedDescriptionOfProduct,
            price,
            mainPhoto1,
            mainPhoto2,
            mainPhoto3,
            mainPhoto4,
            mainPhoto5,
            mainPhoto6
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    getAllProducts() {
        return this.http.get<any>(`admin/getAllProducts`)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    getSingleProduct(
        id: any
    ) {
        return this.http.post<any>(`admin/getSingleProduct`, {
            id
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    updateProduct() {
    }

    deleteProduct(id: string) {
        return this.http.post<any>(`admin/deleteProductById`, {
            id,
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }
}

