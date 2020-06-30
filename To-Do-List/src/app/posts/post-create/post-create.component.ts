import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Post} from "../post.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  content = '';
  title = '';
  @Output() taskCreated = new EventEmitter<Post>();

  selectStatus = ['To do', 'In progress', 'Done'];
  constructor() { }

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
    this.taskCreated.emit(task);
  }

}
