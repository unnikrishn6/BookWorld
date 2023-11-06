import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  title = "Your Shopping Bag"

  cartProducts: any = []
  grandTotal!: number

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart.getProducts().subscribe(res => {
      this.cartProducts = res;
      this.grandTotal = this.cart.getPrice();
      console.log(res)
    })
  }

  deleteItem(item: any) {
    this.cart.deleteItem(item)
    this.grandTotal -= item.price;
    console.log(this.cartProducts)
  }

  emptyCart() {
    this.cart.removeAll()
  }

}