import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}
  // getCategory() {
  //   return this.db.list('categories');
  // }
  getCategories(): Observable<any[]> {
    return this.db.list('/categories').valueChanges(); // Returns an array of category objects
  }
  // getProductsByCategory(category: string) {
  //   return this.db
  //     .list(
  //       'categories',
  //       (ref) => ref.orderByChild('category').equalTo(category) // Filter by category field
  //     )
  //     .snapshotChanges()
  //     .pipe(
  //       map((actions) =>
  //         actions.map((a: any) => ({ key: a.key, ...a.payload.val() }))
  //       )
  //     );
  // }
}
