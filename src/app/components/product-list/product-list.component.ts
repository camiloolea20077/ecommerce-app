import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import * as bootstrap from 'bootstrap';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  page: number = 1;
  pageSize: number = 6;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  
    const alertContainer = document.getElementById('cart-alert');
    if (alertContainer) {
      alertContainer.innerHTML = `
        <div class="alert alert-info alert-dismissible fade show" role="alert">
          <strong>${product.title}</strong> se ha agregado al carrito.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
    }
  }
  
  ngAfterViewInit(): void {
    // Inicializar tooltips de Bootstrap después de que la vista cargue
    setTimeout(() => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }, 500);
  }
}
