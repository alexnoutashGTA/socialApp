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
    this.contributorInfoList = [];
    this.presentationDetailedSlice = [];
  }
  postsCollection: any;
  presentationSlice: any;
  contributorInfoList: any;
  presentationDetailedSlice: any;

  ngOnInit() {
    // load first 10 Posts
    this.transport.getPosts().subscribe(data => {
      this.postsCollection = data;
      this.addDataToPresenter();
    });
  }

  // load data when scrolling
  loadData(event) {
    setTimeout(() => {
      this.addDataToPresenter();
      event.target.complete();
      if (this.presentationSlice.length === this.postsCollection.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  // get Posts
  addDataToPresenter() {
      const startindex = this.presentationSlice.length;
      this.presentationSlice.push(...this.postsCollection.slice(startindex, startindex + 10));
      this.addDetailToPresenter();
  }

  // Get Post details, name, company and comments number
  addDetailToPresenter()  {
    this.presentationSlice.forEach(async record => {
      let  detail: any;
      let postComments: any;
      const detailRecordIndex = this.contributorInfoList.indexOf(contributer => contributer.id === record.userId);
      if (detailRecordIndex < 0) {
        // get contributor detail
        detail = await this.transport.getContributorDetail(record.userId);
        this.contributorInfoList.push(detail);
        // get comments
        postComments = await this.transport.getPostComment(record.id);
      } else {
        detail = this.contributorInfoList[detailRecordIndex];
      }
      // get relevant comments
      const relevantpostComments = postComments.filter(com => com.postId === record.id);

      // create the object to present
      const presentatonObj =  (relevantpostComments && relevantpostComments.length > 0) ?
          {...record, ...detail, ...{count: relevantpostComments.length}} : {...record, ...detail, ...{count: 0}};
      // records to display
      this.presentationDetailedSlice.push(presentatonObj);
    });
  }
}
