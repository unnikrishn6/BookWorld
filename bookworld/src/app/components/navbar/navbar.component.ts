import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  totalItem: number | undefined;

  constructor(private service: CartService) { }

  @Input() title = ""

  ngOnInit(): void {
    this.service.getProducts().subscribe(
      res => {
        this.totalItem = res.length;
      }
    )
  }
}
