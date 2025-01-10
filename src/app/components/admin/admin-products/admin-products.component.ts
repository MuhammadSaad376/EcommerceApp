import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../../models/products';
import { Config } from 'datatables.net';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'], // Corrected to styleUrls
})
export class AdminProductsComponent implements OnInit {
  dtOptions: Config = {}; // DataTable configuration
  products!: Product[]; // Array to store all products
  filteredProduct: Product[] = []; // Array to store filtered products
  recordsTotal: number = 0; // Total records count for pagination
  recordsFiltered: number = 0;
  // data: Product[] | undefined; // Adjust Product type if needed
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Set DataTable options
    this.dtOptions = {
      serverSide: true, // Enable server-side processing
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        const page = dataTablesParameters.start / dataTablesParameters.length; // Page number (0-indexed)
        const pageSize = dataTablesParameters.length; // Page size
        const search = dataTablesParameters.search.value; // Search query

        const sortColumnIndex = dataTablesParameters.order[0].column; // Index of the sorted column
        const sortDirection = dataTablesParameters.order[0].dir; // Sort direction ('asc' or 'desc')
        const sortColumn = dataTablesParameters.columns[sortColumnIndex].data; // Column data property

        // Get products with pagination and search filter
        this.productService
          .getFilteredProducts(
            page,
            pageSize,
            search,
            sortColumn,
            sortDirection
          )
          .subscribe(
            (resp: any) => {
              // Set pagination info and data
              this.recordsTotal = resp.recordsTotal;
              this.recordsFiltered = resp.recordsFiltered;
              this.products = resp.data;
              console.log(resp);

              // Pass data to DataTable callback
              callback({
                recordsTotal: this.recordsTotal, // Total number of records
                recordsFiltered: this.recordsFiltered, // Filtered records count
                data: this.products, // Data for the current page
              });
            },
            (error) => {
              console.error('Error fetching products:', error);
            }
          );
      },
      columns: [
        { title: 'Title', data: 'title' },
        { title: 'Price', data: 'price' },
        { title: 'Category', data: 'category' },
        // { title: 'Id', data: 'key' },

        {
          title: 'Actions',
          data: null, // No data here, we will define the content manually
          render: (data: any) => {
            return `<a href="#" class="btn btn-primary edit-btn" data-key="${data.key}">Edit</a>`;
          },
          orderable: false, // Disable sorting on the 'Actions' column
        },
        { title: 'URL', data: 'basicurl' },
      ],
      order: [[0, 'asc']], // Default sorting by 'Title'
      //order1: [[1, 'asc']],
    };
  }

  ngAfterViewInit(): void {
    // Use event delegation to listen for clicks on dynamically rendered buttons
    document.addEventListener('click', (event: any) => {
      event.preventDefault();
      if (event.target && event.target.classList.contains('edit-btn')) {
        const productKey = event.target.getAttribute('data-key'); // Get product key
        this.router.navigate(['/admin/products/', productKey]); // Navigate to edit page with product key
      }
    });
  }

  // Submit search query to filter products
  Submit(query: any): void {
    const searchQuery = query?.search || ''; // Get the 'search' field value or default to an empty string
    this.filteredProduct = searchQuery
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : this.products;
  }

  // Reset the form and filtered data
  Reset(form: NgForm): void {
    form.reset();
    this.filteredProduct = this.products; // Reset to all products
  }
}
