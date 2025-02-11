import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
    private cartItems: Product[] = [];
    private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);

    getCart() {
        return this.cartSubject.asObservable();
    }

    /**
     * Adds a product to the cart. If the product already exists in the cart,
     * increments its quantity by 1. Otherwise, adds the product to the cart with
     * a quantity of 1.
     * @param product The product to add to the cart
     */
    addToCart(product: Product) {
        const existingProduct = this.cartItems.find(
            (item) => item.id === product.id
        );
        if (existingProduct) {
            existingProduct.quantity! += 1;
        } else {
            this.cartItems.push({ ...product, quantity: 1 });
        }
        this.cartSubject.next(this.cartItems);
    }

    /**
     * Removes a product from the cart. If the product does not exist in the cart,
     * this method does nothing.
     * @param product The product to remove from the cart
     */
    removeFromCart(product: Product) {
        this.cartItems = this.cartItems.filter((item) => item.id !== product.id);
        this.cartSubject.next(this.cartItems);
    }

    /**
     * Clears the cart by removing all products from it.
     * @example
     * const cartService = new CartService();
     * cartService.clearCart();
     * cartService.getCart().subscribe((cart) => {
     *   console.log(cart); // []
     * });
     */
    clearCart() {
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
    }
}
