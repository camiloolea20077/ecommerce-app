import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private apiUrl = 'https://fakestoreapi.com/products';

    constructor(private http: HttpClient) { }

    /**
     * Retrieve a list of products from the Fake Store API
     * @returns An observable containing an array of products
     */
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    /**
     * Retrieve a product by its ID from the Fake Store API
     * @param id The product ID to retrieve
     * @returns An observable containing the product
     */
    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }
}