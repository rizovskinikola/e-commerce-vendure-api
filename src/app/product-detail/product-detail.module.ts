import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import {RouterModule, Routes} from "@angular/router";
import { GraphQLModule } from '../graphql.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavModule } from '../nav/nav.module';
import { CustomCurrencyPipe } from '../custom-currency.pipe';


const routes: Routes = [{ 
  path: '', component: ProductDetailComponent
 }]


@NgModule({
  declarations: [
    CustomCurrencyPipe,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GraphQLModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavModule
  ],
})
export class ProductDetailModule { }



