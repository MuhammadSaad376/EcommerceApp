import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  CreateProduct(product: any) {
    this.db.list('products').push(product);
  }
  getAllProducts() {
    return this.db
      .list('products')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a: any) => ({
            key: a.key, // Firebase-generated key
            ...a.payload.val(), // Spread the product data
          }))
        )
      );
  }
  get(productId: any): Observable<any> {
    return this.db.object(`products/${productId}`).valueChanges();
  }
  update(productId: any, product: any) {
    return this.db.object(`products/${productId}`).update(product);
  }
  delete(productId: any) {
    return this.db.object(`products/${productId}`).remove();
  }
}
