import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import { GraphQLModule } from '../graphql.module';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{
    path: '',
    component: OrderDetailsComponent
  }]

@NgModule({
  declarations: [OrderDetailsComponent],
  imports: [
    CommonModule,
    GraphQLModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderDetailsModule { }



