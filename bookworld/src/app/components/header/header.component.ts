import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string | undefined

  constructor(private router: Router, private user: UserService, private cart: CartService, private auth: AuthService) { }

  ngOnInit(): void {
    this.user.userName$.subscribe(userName => {
      this.userName = userName;
    });
  }

  showLogin() {
    if (this.router.url.startsWith('/login') || this.router.url.startsWith('/signup') || this.router.url.endsWith("/")) {
      return true;
    }
    return false;
  }

  logOut() {
    this.cart.removeAll()
    this.auth.logout()
  }

}
