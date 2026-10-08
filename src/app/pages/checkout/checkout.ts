import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from '../../cart/cart';
import { CartService } from '../../cart.service';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-checkout',
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    Cart,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private orders = inject(OrderService);
  cart = inject(CartService);

  sending = signal(false);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    payment: ['BLIK'],
    blikCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    cardNumber: [''],
  });

  payment = toSignal(this.form.controls.payment.valueChanges, { initialValue: 'BLIK' });

  constructor() {
    this.form.controls.payment.valueChanges.pipe(takeUntilDestroyed()).subscribe((payment) => {
      const blik = this.form.controls.blikCode;
      const card = this.form.controls.cardNumber;

      blik.setValidators(
        payment === 'BLIK' ? [Validators.required, Validators.pattern(/^\d{6}$/)] : [],
      );
      card.setValidators(
        payment === 'Karta' ? [Validators.required, Validators.pattern(/^\d{16}$/)] : [],
      );

      blik.updateValueAndValidity();
      card.updateValueAndValidity();
    });
  }

  async send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    try {
      const v = this.form.getRawValue();
      await this.orders.placeOrder({
        name: v.firstName + ' ' + v.lastName,
        address: v.address + ', ' + v.city,
        payment: v.payment,
        items: this.cart.items(),
        total: this.cart.total(),
      });
      await this.router.navigate(['/summary']);
      this.cart.clear();
    } catch (error) {
      this.snackBar.open((error as Error).message, 'OK', { duration: 5000 });
    } finally {
      this.sending.set(false);
    }
  }
}
