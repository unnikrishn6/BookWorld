import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title = "Explore Books"

  bookList: any = []

  constructor(private book: BooksService) { }

  ngOnInit() {
    this.book.getBooks().subscribe((data) => {
      this.bookList = data;
    })
  }

}
