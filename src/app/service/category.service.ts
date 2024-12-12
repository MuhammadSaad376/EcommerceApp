import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

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
}
