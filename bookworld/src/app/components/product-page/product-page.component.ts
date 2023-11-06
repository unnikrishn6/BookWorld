import { Component, OnInit, TemplateRef } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  title = "Book Overview"

  constructor(private param: ActivatedRoute, private book: BooksService, private cart: CartService, private dialog: MatDialog) { }
  productId: any;
  productData: any;

  ngOnInit(): void {
    this.productId = this.param.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productData = this.book.products.filter((value) => {
        return value['_id'] == this.productId;
      });
    }
  }

  addtoCart(item: any, templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
    this.cart.addtoCart(item)
    console.log(item)
  }
}