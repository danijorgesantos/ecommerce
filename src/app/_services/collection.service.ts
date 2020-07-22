import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CollectionService {
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

    addCollection(
        collectionPhoto: string,
        collectionName: string,
        collectionUrl: string,
    ) {
        return this.http.post<any>(`admin/addCollection`, {
            collectionPhoto,
            collectionName,
            collectionUrl
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    getAllCollections() {
        return this.http.get<any>(`admin/getAllCollections`)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    addProductToCollection(
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
        return this.http.post<any>(`admin/addProductToCollection`, {
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

    getAllProductsFromCollection(
        collectionUrl
    ) {
        return this.http.post<any>(`admin/getAllProductsFromCollection`, {
            collectionUrl
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    getSingleCollection(
        collectionUrl
    ) {
        return this.http.post<any>(`admin/getSingleCollection`, {
            collectionUrl
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    getSingleProductFromCollection(
        collectionUrl,
        urlOfProduct
    ){
        return this.http.post<any>(`admin/getSingleProductFromCollection`, {
            collectionUrl,
            urlOfProduct
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    updateCollections() {
    }

    deleteCollection(id: string) {
        return this.http.post<any>(`admin/deleteProductById`, {
            id,
        })
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }
}

