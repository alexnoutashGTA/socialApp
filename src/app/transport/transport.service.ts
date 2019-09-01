import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Transport {
  postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  contributerDetailUrl = new String('https://jsonplaceholder.typicode.com/users/')
  constructor(private http: HttpClient) {

  }
  getPosts() {
    return this.http.get(this.postsUrl);
  }
  getContributorDetail(id) {
    return this.http.get(this.contributerDetailUrl.concat(id));
  }
}
