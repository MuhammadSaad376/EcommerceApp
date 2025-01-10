import { Component, Input } from '@angular/core';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent {
  category$!: any;
  @Input('category') category: any;
  constructor(private categoryService: CategoryService) {
    this.category$ = this.categoryService.getCategories();
  }
}
