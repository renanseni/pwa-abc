import { Component, ViewChild } from '@angular/core';
import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PWA - Test';
  latitude: any;
  longitude: any;
  @ViewChild('cameraView') videoElement: any;
  video: any;

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
  }

  openGeolocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = +position.coords.latitude;
      this.longitude = +position.coords.longitude;
    });
  }
  openCamera() {
    this.initCamera({ video: true, audio: false });
  }

  initCamera(config: any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }
}
