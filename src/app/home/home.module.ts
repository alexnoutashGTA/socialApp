import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {Transport} from '../transport/transport.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HomePage } from './home.page';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,
      MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  providers: [Transport],
  declarations: [HomePage]
})
export class HomePageModule {}
