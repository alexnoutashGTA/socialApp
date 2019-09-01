import {Component, OnInit} from '@angular/core';
import {Transport} from '../transport/transport.service';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
      private transport: Transport){}
  postsCollection: any;
  ngOnInit() {
    this.transport.getPosts().subscribe(data => {
      this.postsCollection = data;  });
  }
}
