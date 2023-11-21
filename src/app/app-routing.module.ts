import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { OrderDetailsModule } from './order-details/order-details.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => HomeModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => ProductDetailModule)
  },
  {
    path: 'order/:orderCode',
    loadChildren: () => import('./order-details/order-details.module').then(m => OrderDetailsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
