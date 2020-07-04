import { Component, OnInit } from '@angular/core';
import {Post} from "../posts/post.model";
import {Subscription} from "rxjs";
import {PostsService} from "../posts/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: Post[] = [];
  private postsSub: Subscription;
  constructor(private postsService: PostsService, private router: Router ) { }

  ngOnInit(): void {
    this.todoList = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        if (posts.length === 0){
          this.router.navigate([''])
        }else if (posts[0].status === 'todo'){
          this.todoList = posts;
        }
      });
  }
  deleteToDoTask(task: Post){
    this.postsService.deleteToDoTask(task);

  }

}
