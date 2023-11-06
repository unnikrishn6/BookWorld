import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})

export class BooksService {
  products: [] = []
  details: [] = []

  constructor(private http: HttpClient) { }

  url="http://localhost:3000"

  getBooks() {
    return this.http.get(`${this.url}/api/getAll`).pipe(map((res: any) => {
      this.products = res
      console.log(this.products)
      return res;
    }))
  }

  getDetails() {
    return this.http.get(`${this.url}/api/getBill`).pipe(map((res: any) => {
      this.details = res
      console.log(this.details)
      return res;
    }))
  }
}