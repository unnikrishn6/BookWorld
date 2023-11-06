import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  title = "Admin Interface"

  url="http://localhost:3000";

  constructor(private http: HttpClient, private book: BooksService) { }

  name!: string
  src!: string
  price!: string
  description!: string

  bookList: any = []
  details:any=[]
  length!: number
  orders!:number
  boo:boolean=false
  foo:boolean=false

  ngOnInit() {
    this.book.getBooks().subscribe((data) => {
      this.bookList = data;
      this.length = this.bookList.length
    })

    this.book.getDetails().subscribe((data) => {
      this.details = data;
      this.orders=this.details.length
    })
  }

  showAdd(){
    this.boo=!this.boo;
  }

  showDel(){
    this.foo=!this.foo;
  }

  addBook() {
    const book = {
      name: this.name,
      src: this.src,
      price: this.price,
      description: this.description
    };

    this.http.post(`${this.url}/api/add`, book).subscribe(
      response => {
        console.log('Book added successfully:', response);
        this.ngOnInit()
      },
      error => {
        console.error('Error adding book:', error);
      }
    );
  }

  deleteBook(id: any) {
    this.http.delete(`${this.url}/api/delete/${id}`).subscribe(
      response => {
        console.log('Book deleted successfully.', response);
        this.ngOnInit()
      },
      error => {
        console.error('Error deleting book:', error);
      }
    )
  }
}
