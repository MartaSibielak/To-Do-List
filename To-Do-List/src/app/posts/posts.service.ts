import {Post} from "./post.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {

  private posts: Post[] = [];
  private inprogress: Post[] = [];
  private done: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private inProgressUpdated = new Subject<Post[]>();
  private doneUpdated = new Subject<Post[]>();

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

  addPost(title: string, content: string, status: string){

     const post: Post = {title: title, content: content, status: status};
    if (status === 'inprogress'){
      this.inprogress.push(post);
      this.inProgressUpdated.next([...this.inprogress]);
      console.log(post)
    }else if (status === 'done'){
      this.done.push(post);
      this.doneUpdated.next([...this.done])
    }else if(status === 'todo'){
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    }
    }
}
