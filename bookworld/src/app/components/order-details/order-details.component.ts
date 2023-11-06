import { Component } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  title = "Order Details"
  details:any=[]
  cartProducts:any=[]

  constructor(private service:BooksService,private cart: CartService){}


  ngOnInit() {
    this.service.getDetails().subscribe((data) => {
      this.details = data;
      this.cartProducts=data[0].cartList;
      console.log(this.cartProducts)
    })
    this.cart.removeAll();
  }
}
