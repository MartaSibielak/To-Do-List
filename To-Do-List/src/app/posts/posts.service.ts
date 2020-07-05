import {Post} from "./post.model";
import {Injectable} from "@angular/core";
import {iif, Subject} from "rxjs";
import {NgForm} from "@angular/forms";

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private inprogress: Post[] = [];
  private done: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private inProgressUpdated = new Subject<Post[]>();
  private doneUpdated = new Subject<Post[]>();
  newInfo: Post;

  getPosts(){
    return [...this.posts];
  }

  getInProgress(){
    return [...this.inprogress];
  }
  getDone(){
    return [...this.done];
  }
  getPostsUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  getInprogressUpdated(){
    return this.inProgressUpdated.asObservable();
  }
  getDoneUpdated(){
    return this.doneUpdated.asObservable();
  }

  addPost(title: string, content: string, status: string, deadline: Date, priority: number){
    const post: Post = {title: title, content: content, status: status, deadline: deadline, priority: priority};
    if (status === 'inprogress'){
      this.inprogress.push(post);
      this.inProgressUpdated.next([...this.inprogress]);
    }else if (status === 'done'){
      this.done.push(post);
      this.doneUpdated.next([...this.done])
    }else if(status === 'todo'){
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    }
  }
  deleteToDoTask(task: Post){
    const index: number = this.posts.indexOf(task);
    if (index !== -1){
      this.posts = this.posts.filter(item => item !== task)
    }
    this.updateList(this.postsUpdated, this.posts)
  }

  deleteInProgressTask(task: Post){
    const index: number = this.inprogress.indexOf(task);
    if (index !== -1){
      this.inprogress = this.inprogress.filter(item => item !== task)
    }
    this.updateList(this.inProgressUpdated, this.inprogress)
  }
  deleteDoneTask(task: Post){
    const index: number = this.done.indexOf(task);
    if (index !== -1){
      this.done = this.done.filter(item => item !== task)
    }
    this.updateList(this.doneUpdated, this.done)
  }
  updateList(updList: Subject<Post[]>, list: Post[]){
    updList.next([...list])
  }

  updateTask(task: Post){
    const index: number = this.inprogress.indexOf(task);
    if (index !== -1){
      console.log(task)
    }
  }


}
