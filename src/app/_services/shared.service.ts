import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public variable!: any;

  constructor(){}
}

