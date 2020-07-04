import { Component, OnInit } from '@angular/core';
import {Post} from "../posts/post.model";
import {Subscription} from "rxjs";
import {PostsService} from "../posts/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {

  doneList: Post[] = [];
  private postsSub: Subscription;
  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.doneList = this.postsService.getDone();
    this.postsSub = this.postsService.getDoneUpdated()
      .subscribe((posts: Post[]) => {
        if (posts.length === 0) {
          this.router.navigate([''])
        }if (posts[0].status === 'done'){
          this.doneList = posts;
        }
      });
  }
  deleteDoneTask(task: Post){
    this.postsService.deleteDoneTask(task);
  }
}
