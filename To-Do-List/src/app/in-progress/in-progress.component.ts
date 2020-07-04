import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {PostsService} from "../posts/posts.service";
import {Post} from "../posts/post.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent implements OnInit {

  inProgressList: Post[] = [];
  private postsSub: Subscription;
  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.inProgressList = this.postsService.getInProgress();
    this.postsSub = this.postsService.getInprogressUpdated()
      .subscribe((posts: Post[]) => {
        if (posts.length === 0) {
          this.router.navigate([''])
        } else if (posts[0].status === 'inprogress'){
          this.inProgressList = posts;
        }
      });
  }
  deleteInProgressTask(task: Post){
    this.postsService.deleteInProgressTask(task);
  }
}
