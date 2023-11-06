import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartList: any = []
  productList = new BehaviorSubject([])

  getProducts() {
    return this.productList.asObservable()
  }

  addtoCart(product: any) {
    const existingProduct = this.cartList.find((p: any) => p['_id'] === product['_id']);

    if (!existingProduct) {
      let cart = this.cartList.push(product)
      cart = { ...cart, "userID": localStorage.getItem("userID") }
      this.productList.next(this.cartList)
      this.getPrice()
    }
  }

  getPrice(): number {
    let grandTotal = 0
    this.cartList.map((sum: any) => {
      grandTotal += sum.price
    })
    return grandTotal
  }

  deleteItem(product: any) {
    const index = this.cartList.indexOf(product);
    this.cartList.splice(index, 1);
  }

  removeAll() {
    this.cartList = []
    this.productList.next(this.cartList)
  }

}