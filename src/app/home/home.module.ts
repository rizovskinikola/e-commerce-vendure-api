import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from '../graphql.module';
import {RouterModule, Routes} from "@angular/router";
import { NavModule } from '../nav/nav.module';

const routes: Routes = [{
    path: '',
    component: HomeComponent
  }]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule.forChild(routes),
    GraphQLModule,
    NavModule
  ],
})
export class HomeModule { }
