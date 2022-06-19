import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  product: Product = {
    name: null!,
    price: undefined!,
    type: null!,
    date_input: null!
  };

  id: any;
  edited: boolean = false;
  products!: Product[];

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id)
    if(this.id){
      this.edited = true;
      this.productService.get().subscribe((data: any)=>{
        this.products = data;
        this.product = this.products.find((m)=>{return m.id == this.id})!
        console.log(this.product);
      }, (error)=> {
        console.log(error);
      })
    }
  }

  ngOnInit(): void {
  }

  test(){
    console.log(this.product.date_input)
  }

  saveProduct(){
    if(this.edited){
      this.productService.put(this.product).subscribe((data)=>{
        alert('Product updated');
        console.log(data);
        this.router.navigate(["/"])
      }, (error)=>{
        console.log(error);
        alert('Error: One or more fields are empty');
      }
      )
    }
    else{
      console.log(this.product.date_input)
      this.productService.save(this.product).subscribe((data)=>{
        alert('Product created');
        console.log(data);
        this.router.navigate(["/"])
      }, (error)=>{
        console.log(error);
        alert('Error: One or more fields are empty');
      }
      )
    }

  }

}
