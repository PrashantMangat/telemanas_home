import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  newsDetails: any;
  imgUrl: any;
  videoUrl: any;

  url: string;
  urlSafe: SafeResourceUrl;
  imgurlSafe: SafeResourceUrl;

  imgSafe: string;
  VideoShow: boolean = false;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.newsDetails = JSON.parse(sessionStorage.getItem('newsDetailsData'));
    if (this.newsDetails.videourl === "") {
    } else {
      this.VideoShow = true;
      this.url = this.newsDetails.videourl;
    }
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.imgSafe = this.newsDetails.imageurl;

    // this.videoUrl = "https://www.youtube.com/embed/omOQmfismqQ";

    // this.imgUrl = "https://static.toiimg.com/thumb/msid-88385213,imgsize-64210,width-400,resizemode-4/88385213.jpg"
  }

}
