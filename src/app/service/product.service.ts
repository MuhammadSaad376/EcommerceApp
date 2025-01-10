import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  CreateProduct(product: any) {
    this.db.list('products').push(product);
  }
  getAllProducts() {
    // let query = this.db.list('products').query;
    // query = query.limitToFirst(pageSize).startAt(page * pageSize);

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
  getFilteredProducts(
    page: number,
    pageSize: number,
    search: string = '',
    orderBy: string = 'title', // Default sorting column
    orderDirection: string = 'asc' // Default sorting direction
  ) {
    const baseQuery = this.db.list('products'); // Reference to the database

    // First query: Fetch total number of records
    const totalRecords$ = baseQuery.snapshotChanges().pipe(
      map((actions) => actions.length) // Total count of all records
    );

    // Second query: Fetch filtered and paginated data
    const paginatedData$ = this.db
      .list('products', (ref) => {
        let query = ref.orderByChild(orderBy); // Order by the specified field

        if (search) {
          // Apply search filter
          query = query.startAt(search).endAt(search + '\uf8ff');
        }

        // Fetch enough data for the current page
        query = query.limitToFirst(pageSize * (page + 1)); // Fetch records up to the end of the page

        return query;
      })
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const products = actions.map((a: any) => ({
            key: a.key,
            ...a.payload.val(),
          }));

          // Paginate the data to match the requested page
          return products.slice(page * pageSize, (page + 1) * pageSize);
        })
      );

    // Combine total records and paginated data
    return totalRecords$.pipe(
      switchMap((totalRecords) =>
        paginatedData$.pipe(
          map((data) => ({
            recordsTotal: totalRecords, // Correct total count of records
            recordsFiltered: totalRecords, // Filtered count of records
            data, // Paginated data
          }))
        )
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
