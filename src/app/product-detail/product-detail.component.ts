import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  public detailedProduct: any;
  variantForm: FormGroup;
  selectedVariant: any;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private orderService: OrderService, private fb: FormBuilder) {
    this.variantForm = this.fb.group({
      selectedVariant: [null]
    });

    this.variantForm.get('selectedVariant')?.valueChanges.subscribe(value => {
      this.selectedVariant = value;
    });
  }
  addToOrder(): void {

    if (this.detailedProduct) {
      const { id: productVariantId } = { id: this.selectedVariant.id };
      const quantity = 1;

      this.orderService.addItemToOrder(productVariantId, quantity).subscribe((result: any) => {
        const addedItem = result?.data?.addItemToOrder;

        if (addedItem && addedItem.id) {

          this.router.navigate(['/order', addedItem.code]);
        } else {

          const errorMessage = result?.errors?.[0]?.message || 'An error occurred';
          console.error('Error:', errorMessage);
        }
      });


    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      const productId = params.get('id');
      this.productService.getProductDetail(productId).subscribe((result: any) => {
        this.detailedProduct = result?.data?.product;

        if (this.detailedProduct && this.detailedProduct.variants.length > 0) {
          this.variantForm.patchValue({
            selectedVariant: this.detailedProduct.variants[0]
          });
        }
      });
    });


  }



}
