import { Component, Input } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCartComponent } from '../components/shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input('product') product: any;
  @Input('show-action') showAction = true;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private shoppingCartService: ShoppingCartService) {}
  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
  }
  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.key];
    console.log('Total Items', item);
    return item ? item.Quantity : 0;
  }
  // getQuantity(): number {
  //   if (!this.shoppingCart || !this.shoppingCart.items) return 0;

  //   const item = this.shoppingCart.items[this.product.key];
  //   console.log('Total Items:', item);
  //   return item?.Quantity ?? 0; // Use optional chaining and nullish coalescing
  // }
}
