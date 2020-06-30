import {Component, OnInit, EventEmitter} from '@angular/core';
import {Post} from "../post.model";
import {NgForm} from "@angular/forms";
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  content = '';
  title = '';
  taskCreated = new EventEmitter<Post>();

  selectStatus = ['To do', 'In progress', 'Done'];
  constructor(public postService: PostsService) {}

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){
    if (form.invalid){
      return;
    }
    const task: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postService.addPost(form.value.title, form.value.content)
  }

}
