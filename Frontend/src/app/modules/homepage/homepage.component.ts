import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.document.body.classList.add('homepage-theme');
  }

  ngOnInit() {
  }

}
