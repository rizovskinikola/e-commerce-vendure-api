import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
  ], 
  exports: [ 
    NavComponent
  ]
})
export class NavModule { }
