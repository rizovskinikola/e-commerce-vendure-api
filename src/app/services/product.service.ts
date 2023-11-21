import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apollo: Apollo) {}

  getProductDetail(id: string): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query GetProductDetail($id: ID!) {
          product(id: $id) {
            id
            name
            description
            featuredAsset{
              preview
            }
            variants {
              id
              price
              name
            }
          }
        }
      `,
      variables: { id },
    }).valueChanges;
  }
}