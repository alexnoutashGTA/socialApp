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
  }
  postsCollection: any;
  dataList: any;
  // @ts-ignore
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  ngOnInit() {
    this.transport.getPosts().subscribe(data => {
      this.postsCollection = data;
      for (let i = 0; i < 10; i++) {
      this.dataList.push(this.postsCollection[i]);
    }
    });
  }

  loadData(event) {
    const newIndex = this.dataList.length;
    setTimeout(() => {
      console.log('Done');
      for (let i = newIndex; i < newIndex + 10; i++) {
        this.dataList.push(this.postsCollection[i]);
      }
      event.target.complete();
      if (this.dataList.length === this.postsCollection.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
