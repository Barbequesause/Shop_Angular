import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  //do budowania formularza
  private router = inject(Router);
  //do przechodzenia na inną stronę z kodu
  private snackBar = inject(MatSnackBar);
  //mały komunikat (toast) na dole
  private orders = inject(OrderService);
  //"wysyła" zamówienie
  cart = inject(CartService);

  sending = signal(false);
  //czy właśnie się wysyła (do wyłączenia przycisku)

  //formularz z walidacją (reactive forms)
  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    //na start puste, required = nie może zostać puste
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    //musi wyglądać jak e-mail
    address: ['', Validators.required],
    city: ['', Validators.required],
    payment: ['BLIK'],
    //domyślnie BLIK
    blikCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    //dokładnie 6 cyfr
    cardNumber: [''],
    //reguły dla karty włączamy dopiero jak ktoś wybierze kartę
  });

  payment = toSignal(this.form.controls.payment.valueChanges, { initialValue: 'BLIK' });
  //aktualna forma płatności, html dzięki temu wie które pole pokazać

  constructor() {
    //jak ktoś zmieni formę płatności to przełączamy które pole jest sprawdzane
    this.form.controls.payment.valueChanges.pipe(takeUntilDestroyed()).subscribe((payment) => {
      const blik = this.form.controls.blikCode;
      const card = this.form.controls.cardNumber;

      blik.setValidators(
        payment === 'BLIK' ? [Validators.required, Validators.pattern(/^\d{6}$/)] : [],
      );
      //BLIK -> kod wymagany (6 cyfr), inaczej bez reguł
      card.setValidators(
        payment === 'Karta' ? [Validators.required, Validators.pattern(/^\d{16}$/)] : [],
      );
      //karta -> numer wymagany (16 cyfr), inaczej bez reguł

      blik.updateValueAndValidity();
      card.updateValueAndValidity();
      //po zmianie reguł sprawdzamy pola jeszcze raz
    });
  }

  async send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      //pokazuje błędy przy wszystkich polach
      return;
    }

    this.sending.set(true);
    try {
      const v = this.form.getRawValue();
      //wszystkie wartości z formularza
      await this.orders.placeOrder({
        name: v.firstName + ' ' + v.lastName,
        address: v.address + ', ' + v.city,
        payment: v.payment,
        items: this.cart.items(),
        total: this.cart.total(),
      });
      //await = czeka aż "wysyłka" się skończy
      await this.router.navigate(['/summary']);
      //udało się -> podsumowanie
      this.cart.clear();
      //i czyścimy koszyk
    } catch (error) {
      //jak wyskoczył błąd (te 10%) to toast
      this.snackBar.open((error as Error).message, 'OK', { duration: 5000 });
    } finally {
      this.sending.set(false);
      //na koniec odblokowuje przycisk (czy się udało czy nie)
    }
  }
}
