import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  title = "Checkout"

  grandTotal!: number

  constructor(private service: CartService, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.service.getProducts().subscribe(res => {
      this.grandTotal = this.service.getPrice();
      console.log(res)
    })
  }

  billForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('', [Validators.required,Validators.minLength(10)]),
    country: new FormControl('India'),
    card: new FormControl(''),
    upi: new FormControl(''),
    id: new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  numericOnly(event: { key: string; }): boolean {
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    return result;
  }

  pay(templateRef: TemplateRef<any>) {
    const details = {
      name: this.billForm.controls.name.value,
      phone: this.billForm.controls.phone.value,
      grandTotal: this.grandTotal,
      cartList: [] = this.service.cartList
    };

    this.http.post(`http://localhost:3000/api/bill`, details).subscribe(
      response => {
        console.log('Success:', response);
        this.dialog.open(templateRef);
      },
      error => {
        console.error('Error adding:', error);
      }
    );
  }
}
