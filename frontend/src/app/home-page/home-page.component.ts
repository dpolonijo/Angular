import { Component, OnInit } from '@angular/core';
import "jquery";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('body').append('Bootstrap and Jquery works !!!');
  }

}
