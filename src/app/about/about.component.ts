import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  fontSize = 'mm';
  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    let id = sessionStorage.getItem('about');
    this.viewportScroller.scrollToAnchor(id);
    
  }

public onClick(elementId: string): void { 
  this.viewportScroller.scrollToAnchor(elementId);
}
}
