import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //API_ENDPOINT = 'http://localhost:8000/api';
  API_ENDPOINT = 'https://laravelweb-app.herokuapp.com/api';

  constructor(private httpClient: HttpClient) { }

  get(){
    return this.httpClient.get(this.API_ENDPOINT + '/products');
  }

  save(product: Product){
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.httpClient.post(this.API_ENDPOINT + '/products', product, {headers: headers});
  }

  put(product: Product){
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    return this.httpClient.put(this.API_ENDPOINT + '/products/' + product.id, product, {headers: headers});
  }

  delete(id: any){
    return this.httpClient.delete(this.API_ENDPOINT + '/products/'+ id);
  }
}
