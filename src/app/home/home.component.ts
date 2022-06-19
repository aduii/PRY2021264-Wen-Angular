import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../_services/product.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { DataService } from '../_services/shared.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({ templateUrl: 'home.component.html',
styleUrls: ['./home.component.css'] }
)

export class HomeComponent implements AfterViewInit {

  convertJson!: string;

  products!: Product[];

  aux: number[] = [];

  massive!: Product[];

  massiveEdit: Product[] = [];

  cont = 0;
  err = 0;

  displayedColumns: string[] = ['id','name', 'price', 'type', 'date', 'actions'];
  element_data!: Product[];
  dataSource = new MatTableDataSource<Product>(this.element_data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private productService: ProductService, private httpClient: HttpClient, private router: Router, private sender: DataService ){

    this.productService.get().subscribe((data: any)=> {
      this.products = data;
      this.element_data = data;
    }, (error) => {
      console.log(error);
      alert("Error")
    })

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllReports();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getAllReports(){
    let resp = this.productService.get();
    resp.subscribe(report=>this.dataSource.data=report  as Product[])
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editAll(){
    alert("This option will edit all products. Please be mindful");
    this.sender.variable = this.products;
    this.router.navigate(["/editAllProduct"])
  }

  editSelected(){
    alert("This option will edit all selected products. Please be mindful");
    if(this.aux.length == 0){
      alert("No product was selected");
      return;
    }
    for(let i = 0; i < this.products.length; i++){
      for(let j = 0; j < this.aux.length; j++){
        if(this.products[i].id == this.aux[j]){
          this.massiveEdit.push(this.products[i])
        }
      }
    }
    console.log(this.massiveEdit.length)
    this.sender.variable = this.massiveEdit;
    this.router.navigate(["/editProduct"])
  }

  delete(id: any){
    this.productService.delete(id).subscribe((data: any)=> {
      console.log(id);
      alert('Product Deleted')
      window.location.reload();
    }, (error) => {
      console.log(error);
      console.log(id);
      alert("Product Deleted");
      window.location.reload();
    })

  }

  checkbox(id: any){
    for (let i = 0; i < this.aux.length; i++){
      if(id == this.aux[i]){
        this.aux.splice(i, 1);
        console.log(this.aux);
        return;
      }
    }
    this.aux.push(id)
    console.log(this.aux);
  }



  deleteSelected(){

    if(this.aux.length == 0){
      alert("No product was selected")
      return;
    }
    console.log(this.aux)
      for (let i = 0; i < this.aux.length; i++) {
        console.log(this.aux[i])
        this.productService.delete(this.aux[i]).subscribe((data: any)=> {
          console.log("deleted");

        }, (error) => {
          console.log("All selected products deleted");
          window.location.reload();
      })
    }
  }

  deleteAll(){
    console.log(this.products.length)
      for (let i = 0; i < this.products.length; i++) {
        console.log(this.products[i].id)
        this.productService.delete(this.products[i].id).subscribe((data: any)=> {
          console.log("deleted");

        }, (error) => {
          console.log("All products deleted");
          window.location.reload();
      })
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  onFileChange(ev: any) {
    console.log(ev.target.files)
    const selectedFile = ev.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      console.log(event);
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach(sheet =>{
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        console.log(data);
        this.convertJson = JSON.stringify(data);
        this.importBack(this.convertJson)
        })

      }
    }

  //   ExcelDateToJSDate(serial: any) {
  //     var utc_days  = Math.floor(serial - 25569);
  //     var utc_value = utc_days * 86400;
  //     var date_info = new Date(utc_value * 1000);

  //     var fractional_day = serial - Math.floor(serial) + 0.0000001;

  //     var total_seconds = Math.floor(86400 * fractional_day);

  //     var seconds = total_seconds % 60;

  //     total_seconds -= seconds;

  //     var hours = Math.floor(total_seconds / (60 * 60));
  //     var minutes = Math.floor(total_seconds / 60) % 60;

  //     var sYear = date_info.getFullYear().toString;
  //     var sMonth = date_info.getMonth().toString;
  //     var sDay = date_info.getDate().toString

  //     var format = sYear + "-" + sMonth + "'"

  //     return new Date(date_info.getFullYear(),date_info.getDate(), date_info.getMonth()).toLocaleString();
  //  }

   excelDateToJSDate(excelDate: any) {
    var date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
    var converted_date = date.toISOString().split('T')[0];
    return converted_date;
}

   test(){
    console.log(this.excelDateToJSDate(44240))
    // var test = this.ExcelDateToJSDate(44240).split("/", 3);
    // console.log(test)
   }

  //  dateFormater(number: any){
  //     console.log(this.ExcelDateToJSDate(number))
  //     var test = this.ExcelDateToJSDate(number).split("/", 3);
  //     var day = test[0]
  //     var mont = test[1]
  //     var test2 = test[2].split(",", 1)
  //     var year = test2
  //     var format = year + "-" + mont + "-" + day;
  //     // console.log(format)
  //     return format;
  //   }


    async importMassive(json: any){

      this.massive = <Product[]>JSON.parse(json);
      for(let i = 0; i < this.massive.length; i++){

        this.massive[i].date_input =this.excelDateToJSDate(this.massive[i].date_input);
      }
      const au = Object.keys(this.massive[0]).length;
      if(au == 4){
        alert("OK: Number of columns accepted, initiatin massive import of products")
        let promiesArr = [];
        for(let i = 0; i < this.massive.length; i++){
          this.cont++;
          console.log(i)
          promiesArr.push(
            this.productService.save(this.massive[i]).subscribe((data)=>{
              console.log(data);
              return true;
            }, (error)=>{
              this.err++;
              console.log(error);
              console.log(this.err);
              return false;
            })
          )
        }
        let something = await Promise.all(promiesArr);
        await this.delay(5000);
        return [this.cont!, this.err!];
      }
      else{
        return [];
      }
    }

    async importBack(json: any){
      let response = await this.importMassive(json);
      if(response?.length == 0){
        console.log(response);
        alert("Error: Number of columns differ from table");
      }
      else if(response){
        let trueCont = response[0];
        let trueErr = response[1];
        console.log("Toral cont " + trueCont)
        console.log("Total error: " + trueErr)

        let correct = trueCont! - trueErr!;
        alert( correct +" rows of " + trueCont +" were loaded.");
        window.location.reload();
      }
      else{
        alert("Error: FATAL");
      }


    }


  }


