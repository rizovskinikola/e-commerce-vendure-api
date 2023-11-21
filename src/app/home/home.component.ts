import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

interface ProductSortParameter {
  createdAt: 'ASC' | 'DESC';
}

interface ProductFilterParameter {
  name?: StringOperators;
}

interface StringOperators {
  contains: string;
}


export const GET_PRODUCTS = gql`
  query GetProducts($take: Int, $sort: ProductSortParameter, $filter: ProductFilterParameter) {
    products(options: { take: $take, sort: $sort, filter: $filter }) {
      totalItems
      items {
        id
        name
        featuredAsset {
          preview
          createdAt
          updatedAt
        }
        variants {
          price
          name
        }
      }
    }
    
  }
`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: any[] = [];
  public numberProducts: number = 100;
  public currentSortOrder: 'ASC' | 'DESC' = 'ASC';
  public filterName: string = '';
  public filterWarning: string | null = null; 
  public productVariants: any[] = []
  
  constructor(private apollo: Apollo, private router: Router, private productService: ProductService) {}


goToProductDetail(id: string): void {
  this.productService.getProductDetail(id).subscribe((result: any) => {
    const detailedProduct = result?.data?.product;
    if (detailedProduct) {
      this.router.navigate(['/product', id]);  
    }
  });
}

  getProducts( sort: ProductSortParameter = { createdAt: 'ASC' }, filter: ProductFilterParameter = {}) {
    const take = this.numberProducts
    this.apollo.watchQuery({
      query: GET_PRODUCTS,
      variables: {
        take,
        sort,
        filter,
      },
    }).valueChanges.subscribe((result: any) => {
      this.products = result?.data.products.items || [];
      this.productVariants = result?.data.products.items.variants || [];
  });
  }
  
  applyFilter() {

    if (!this.filterName.trim()) {
      this.filterWarning = 'Filter value cannot be empty!';
      return ;
    }

    const filter: ProductFilterParameter = {
      name: {
        contains: this.filterName,
      },
    };

    this.filterWarning = null; 
    this.getProducts( { createdAt: this.currentSortOrder }, filter);
  }

  applyFilterAndSort(filterValue: string, sortOrder?: 'ASC' | 'DESC') {
    const filter: ProductFilterParameter = {
      name: {
        contains: filterValue,
      },
    };

    const sort: ProductSortParameter = { createdAt: sortOrder || this.currentSortOrder };

    this.getProducts( sort, filter);
  }
  resetFilters() {
    this.filterName = '';
    this.filterWarning = null;
    this.getProducts();
  }
  

  ngOnInit(): void {
    this.getProducts();
  }
}



