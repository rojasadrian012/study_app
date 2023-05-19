import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { TopicsComponent } from './topics.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TopicsEditComponent } from './topics-edit/topics-edit.component';


@NgModule({
  declarations: [
    TopicsComponent,
    TopicsEditComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class TopicsModule { }
