import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authGuard: AuthGuard) { }

  ngOnInit() {
  }

  public signout(): void
  {
    localStorage.removeItem("token");
  }
}
