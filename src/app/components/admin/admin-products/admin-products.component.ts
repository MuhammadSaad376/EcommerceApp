import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../../models/products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
})
export class AdminProductsComponent {
  products!: Product[];
  filteredProduct: any;
  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.filteredProduct = this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  Submit(query: any) {
    var searchQuery = query?.search || ''; // Get the 'search' field value or default to an empty string
    this.filteredProduct = searchQuery
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : this.products;
  }

  Reset(form: any) {
    form.reset();
    this.filteredProduct = this.products; // Reset to all products
  }
}
