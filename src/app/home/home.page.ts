import { Component, ViewChild, OnInit } from '@angular/core';
import {Transport} from '../transport/transport.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
      private transport: Transport) {
    this.dataList = [];

    for (let i = 0; i < 10; i++) {
      this.dataList.push('Item number ' + this.dataList.length);
    }
  }
  postsCollection: any;
  dataList: any;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  ngOnInit() {
    this.transport.getPosts().subscribe(data => {
      this.postsCollection = data;  });
  }


  loadData(event) {

    setTimeout(() => {
      console.log('Done');
      for (let i = 0; i < 10; i++) {
        this.dataList.push('Item number ' + this.dataList.length);
      }
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length === 100) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
