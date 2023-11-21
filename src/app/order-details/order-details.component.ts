import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderCode: string;
  orderDetails: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderCode = params['orderCode'];
      this.loadOrderDetails();
    });
  }

  loadOrderDetails() {
    this.orderService.getOrderDetails(this.orderCode).subscribe((result) => {
      this.orderDetails = result;
      console.log(result)
    });
  }
}
