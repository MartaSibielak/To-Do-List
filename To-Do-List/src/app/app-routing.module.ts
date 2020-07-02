import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostListComponent} from "./posts/post-list/post-list.component";
import {PostCreateComponent} from "./posts/post-create/post-create.component";
import {TodoComponent} from "./todo/todo.component";
import {InProgressComponent} from "./in-progress/in-progress.component";
import {DoneComponent} from "./done/done.component";


const routes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'create', component: PostCreateComponent},
  { path: 'todo', component: TodoComponent },
  { path: 'inprogress', component: InProgressComponent },
  { path: 'done', component: DoneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
