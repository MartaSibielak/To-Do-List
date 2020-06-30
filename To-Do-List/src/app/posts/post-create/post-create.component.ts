import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  content = '';
  title = '';
  @Output() taskCreated = new EventEmitter();

  selectStatus = ['To do', 'In progress', 'Done'];
  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(){
    const task = {
      title: this.title,
      content: this.content
    };
    this.taskCreated.emit(task);
  }

}
