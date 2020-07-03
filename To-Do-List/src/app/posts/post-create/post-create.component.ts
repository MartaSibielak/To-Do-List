import {Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import {Post} from "../post.model";
import {FormControl, NgForm} from "@angular/forms";
import {PostsService} from "../posts.service";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  content = '';
  title = '';
  status = 'todo';
  @ViewChild('deadline') deadline: MatDatepicker<Date>;
  priority = 0;

  constructor(public postService: PostsService) {}

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){
    if (form.invalid){
      return;
    }
    const task: Post = {
      title: form.value.title,
      content: form.value.content,
      status: form.value.status,
      deadline: form.value.deadline,
      priority: form.value.priority
    };
    this.postService.addPost(form.value.title, form.value.content, form.value.status, form.value.deadline, form.value.priority);
    console.log(task);
    form.resetForm();
  }


  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return this.priority = value;
  }

}
