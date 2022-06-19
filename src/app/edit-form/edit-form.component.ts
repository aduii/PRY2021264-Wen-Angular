import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductService } from '../_services/product.service';
import { DataService } from '../_services/shared.service';



@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  product: Product = {
    name: null!,
    price: undefined!,
    type: null!,
    date_input: null!
  };

  aux!: Product[];

  constructor(private sender: DataService, private productService: ProductService, private httpClient: HttpClient, private router: Router) {

    }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

    async inputTest(){
      if(this.product.name == null || this.product.name == "" || this.product.price == null || this.product.price == undefined || this.product.type == "" || this.product.type == null){
        alert("One or more fields are empty.");
        return;
      }else{
        console.log(this.product)
        for(let i = 0; i < this.aux.length; i++){
          this.product.id = this.aux[i].id;
          await this.productService.put(this.product).subscribe((data)=>{
            console.log(data);
          }, (error)=>{
            console.log(error);
          }
          )
        }
      }
      alert("Updating. Please wait")
      this.router.navigate(["/"])
    }

  ngOnInit(): void {
    this.aux = this.sender.variable;
    console.log(this.aux);
  }

}
