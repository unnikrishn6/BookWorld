import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {
  title = "Request a Book"

  book = ""

  constructor(private dialog: MatDialog, private http: HttpClient) { }

  request(templateRef: TemplateRef<any>) {
    const request = {
      book: this.book
    };
    
    this.http.post(`http://localhost:3000/api/request`, request).subscribe(
      response => {
        console.log('Book added successfully:', response);
        this.dialog.open(templateRef);
      },
      error => {
        console.error('Error adding book:', error);
      }
    );
  }
}
