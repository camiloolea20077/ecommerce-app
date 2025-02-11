import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItemCount = cart.reduce((total, item) => total + (item.quantity ?? 1), 0);
    });
  }
}
