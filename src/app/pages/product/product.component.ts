import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(public servicioProductos: ProductoService) {}

  ngOnInit(): void {
    this.rating(this.servicioProductos.productoVisto.valoracion);
  }
  plus() {
    var input = document.getElementById('quantity-number')!;
    var num: number = parseInt(input.innerText);
    num++;
    input.innerText = num + '';
  }
  minus() {
    var input = document.getElementById('quantity-number')!;
    var num: number = parseInt(input.innerText);
    if (num > 1) {
      num--;
    }
    input.innerText = num + '';
  }
  rating(valoration: number) {
    
    var starArray = document.getElementsByClassName('star-rating');
    var i: number = starArray.length-5;
    while (valoration > 0) {
      if (valoration < 1 && valoration > 0.7) {
        
        starArray[i].textContent = 'star';
      }
      if (valoration <= 0.7 && valoration > 0.3) {
        starArray[i].textContent = 'star_half';
        console.log("estrella")
      }
      if (valoration >= 1) {
        starArray[i].textContent = 'star';
        
      }
      console.log(valoration)
      valoration--;
      i++;
    }
    console.log(starArray)
  }
}
