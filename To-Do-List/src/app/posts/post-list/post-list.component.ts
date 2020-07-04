import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Post} from "../post.model";
import {PostsService} from "../posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy{

  todo: Post[] = [];
  done: Post[] = [];
  inprogress: Post[] = [];
  status = 'todo';
  private postsSub: Subscription;
  private inprogressSub: Subscription;
  private doneSub: Subscription;
  @ViewChild('inprogressrow')
  inprogressrow: ElementRef;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.todo = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.todo = posts;
      });
    this.inprogress = this.postsService.getInProgress();
    this.inprogressSub = this.postsService.getInprogressUpdated()
      .subscribe((posts: Post[]) => {
      this.inprogress = posts;
    });
    this.done = this.postsService.getDone();
    this.doneSub = this.postsService.getDoneUpdated()
      .subscribe((posts: Post[]) => {
        this.done = posts;
      })
  }

  deleteToDoTask(task: Post){
    this.postsService.deleteToDoTask(task);
  }
  deleteInProgressTask(task: Post){
    this.postsService.deleteInProgressTask(task);
  }
  deleteDoneTask(task: Post){
    this.postsService.deleteDoneTask(task);
  }


  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.inprogressSub.unsubscribe();
    this.doneSub.unsubscribe();
  }


  drop(event: CdkDragDrop<Object[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // event.previousContainer.data['status'] = event.container.data['status'];
      // console.log( event.previousContainer.data[0]['status']);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      // event.container.data['status'] = event.previousContainer.data['status'];
      // console.log( event.container.data[0]['status']);
      // event.container.data[0]['status'] = event.previousContainer.data['status'];
      // console.log( event.container.data['status']);
  }}

  changeStatus(event){
    event.previousContainer.data['status'] = event.container.data['status'] = 'inprogress';
  }
}
