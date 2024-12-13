import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../service/category.service';
import { first, Observable } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  @ViewChild('f') form: NgForm | undefined;
  categories: any[] = [];
  product: any = {};
  id: any;
  constructor(
    private categorService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
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
    this.product = {};
    this.router.navigate(['/admin/products']);
  }
  Delete() {
    if (confirm('Are You Sure You want to Delete The Product'))
      this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
