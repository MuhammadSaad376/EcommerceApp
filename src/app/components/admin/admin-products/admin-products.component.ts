import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent {
  products: any;
  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
