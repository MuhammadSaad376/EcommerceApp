import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from '../models/products';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}
  create() {
    return this.db.list('/shopping-cart').push({
      createdDate: new Date().getTime(),
    });
  }
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart' + cartId);
  }
  // getTotalCart() {
  //   return this.db.object('shopping-cart');
  // }
  async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result: any = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object(
      '/shopping-cart/' + cartId + '/items' + product.key
    );
    console.log(item$);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        const updatedItem = item
          ? { Quantity: item.Quantity + 1 }
          : { product, Quantity: 1 };

        item$.update(updatedItem);
        console.log(updatedItem);
      });
  }
}
