import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/products';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute, Route } from '@angular/router';
import { ShoppingCartService } from '../../service/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  filteredProduct!: any;
  cart: any;
  subscription!: Subscription;

  category: any;
  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,

    private route: ActivatedRoute
  ) {
    this.productService.getAllProducts().subscribe((product) => {
      //we also use SwitchMap for Multiple Asyn Operations bcz 2 times subsribe are used here
      this.products = product;

      this.route.queryParamMap.subscribe((param) => {
        this.category = param.get('category');
        this.filteredProduct = this.category
          ? this.products.filter((p) => p.category == this.category)
          : this.products;
      });
    });
  }
  async ngOnInit(): Promise<void> {
    const cartObject = await this.shoppingCartService.getCart(); // AngularFireObject
    this.subscription = cartObject.valueChanges().subscribe((cart) => {
      this.cart = cart;
      console.log('Total Cart is ', cart);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
