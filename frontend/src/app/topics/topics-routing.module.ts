import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './topics.component';

const routes: Routes = [
  {
    path: '', component: TopicsComponent,
  },
  {
    path: 'topics-edit/id:', component: TopicsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule { }
