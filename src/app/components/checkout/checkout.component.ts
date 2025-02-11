import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [ReactiveFormsModule]
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  total = 0;

  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('\\d{16}')]],
      expiration: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
      cvv: ['', [Validators.required, Validators.pattern('\\d{3}')]]
    });

    this.cartService.getCart().subscribe(cart => {
      this.total = cart.reduce((sum, item) => sum + (item.price * (item.quantity ?? 1)), 0);
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.cartService.clearCart();
      this.checkoutForm.reset();
      const alertContainer = document.getElementById('checkout-alert');
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            ¡Compra realizada con éxito! Redirigiendo a la página de inicio...
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
      }

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    } else {
      const alertContainer = document.getElementById('checkout-alert');
      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Por favor, completa todos los campos correctamente antes de continuar.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
      }
    }
  }
}
