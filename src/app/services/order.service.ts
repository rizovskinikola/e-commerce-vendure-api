import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private apollo: Apollo) {}


  addItemToOrder(productVariantId: string, quantity: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
        addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
          ... on Order {
            id
            code
          }
        }
      }
           
      `,
      variables: {
        productVariantId,
        quantity,
      },
    });
  }
  getOrderDetails(code: string): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query GetOrderDetails($code: String!) {
          orderByCode (code: $code){
            code
          }
        }
      `,
      variables: {
        code,
      },
    }).valueChanges;
  }

  
}

