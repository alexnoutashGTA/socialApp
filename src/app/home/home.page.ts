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
    this.presentationSlice = [];
    this.contributerInfoList = [];
    this.presentationDetailedSlice = [];
  }
  postsCollection: any;
  presentationSlice: any;
  contributerInfoList: any;
  presentationDetailedSlice: any;
  // @ts-ignore
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  ngOnInit() {
    this.transport.getPosts().subscribe(data => {
      this.postsCollection = data;
      this.addDataToPresenter();
    });
  }

  loadData(event) {
    const newIndex = this.presentationSlice.length;
    setTimeout(() => {
      this.addDataToPresenter();
      event.target.complete();
      if (this.presentationSlice.length === this.postsCollection.length) {
        event.target.disabled = true;
      }
    }, 500);
  }
  addDataToPresenter() {
      const startindex = this.presentationSlice.length;
      this.presentationSlice.push(...this.postsCollection.slice(startindex, startindex + 10));
      this.addDetailToPresenter();
  }
  addDetailToPresenter()  {
    this.presentationSlice.forEach(async record => {
      let  detail: any;
      const detailRecordIndex = this.contributerInfoList.indexOf(contributer => contributer.id === record.userId);
      if (detailRecordIndex < 0) {
        detail = await this.transport.getContributorDetail(record.userId);
        this.contributerInfoList.push(detail);
      } else {
        detail = this.contributerInfoList[detailRecordIndex];
      }
      this.presentationDetailedSlice.push({...record, ...detail});
    });
  }
}
