import { Component } from '@angular/core';
import { CategoryService } from '../../../service/category.service';
import { first, Observable } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  categories: any[] = [];
  product: any = {};
  id: any;
  constructor(
    private categorService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categorService.getCategories().subscribe((data) => {
      this.categories = data;

      this.id = this.route.snapshot.paramMap.get('id'); // Get the product ID from route
      if (this.id) {
        this.productService
          .get(this.id)
          .pipe(first()) // Automatically unsubscribe after the first value is emitted
          .subscribe((p) => (this.product = p));
      }
    });
  }
  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.CreateProduct(product);
    this.router.navigate(['/admin/products']);
  }
  Delete(productId: any) {
    if (confirm('Are You Sure You want to Delete The Product'))
      this.productService.delete(productId);
    this.router.navigate(['/admin/products']);
  }
}
