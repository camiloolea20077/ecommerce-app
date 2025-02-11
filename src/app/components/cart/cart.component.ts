import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  increaseQuantity(item: Product): void {
    item.quantity! += 1;
    this.calculateTotal();
  }

  decreaseQuantity(item: Product): void {
    if (item.quantity! > 1) {
      item.quantity! -= 1;
    } else {
      this.removeFromCart(item);
    }
    this.calculateTotal();
  }

  removeFromCart(item: Product): void {
    this.cartService.removeFromCart(item);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity!, 0);
  }

  checkout(): void {
    alert('Compra finalizada. ¡Gracias por tu pedido!');
    this.cartService.clearCart();
  }
}
