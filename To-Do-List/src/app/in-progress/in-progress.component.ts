import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {PostsService} from "../posts/posts.service";
import {Post} from "../posts/post.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent implements OnInit {

  inProgressList: Post[] = [];
  private postsSub: Subscription;
  constructor(private postsService: PostsService ) { }

  ngOnInit(): void {
    this.inProgressList = this.postsService.getInProgress();
    this.postsSub = this.postsService.getInprogressUpdated()
      .subscribe((posts: Post[]) => {
        if (posts[0].status === 'inprogress'){
          this.inProgressList = posts;
        }

      });
  }

}
