import { Component,  OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-map-info',
  templateUrl: './home-map-info.component.html',
  styleUrls: ['./home-map-info.component.css']
})
export class HomeMapInfoComponent implements OnInit {

  @Input()
  public mapService1;

  public region = 'Hover Map';
  public total_cases: number;

  constructor() { }

  ngOnInit() {
   
    this.mapService1.onRegionHover.subscribe((emitData) => {
      this.region = emitData.data;
      this.total_cases = emitData.total_cases;
    });
  }
}
