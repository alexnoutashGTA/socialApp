import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Transport {
  private postsUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {

  }
  //Get Posts
  getPosts() {
    return this.http.get(this.postsUrl.concat('posts'));
  }
  //Get Contributor
  getContributorDetail(id) {
    return this.http.get(this.postsUrl.concat('users/',id)).toPromise();
  }
  //Get Comments
  getPostComment(id) {
    return this.http.get(this.postsUrl.concat('posts/',id,'/comments')).toPromise();
  }
}
