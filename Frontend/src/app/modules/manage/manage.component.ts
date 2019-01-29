import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.document.body.classList.add('manage-theme');
  }

  ngOnInit() {
  }

}
