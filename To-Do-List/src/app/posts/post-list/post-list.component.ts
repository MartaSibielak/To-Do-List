import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  tasks = [
    {title: 'first title', content: 'this is first task content'},
    {title: 'second title', content: 'this is second task content'},
    {title: 'third title', content: 'this is third task content'},

  ];
  todo = [
    {title: 'first title', content: 'this is first task content'},
    {title: 'second title', content: 'this is second task content'},
    {title: 'third title', content: 'this is third task content'},

  ];

  done = [];
  inprogress = [];

  drop(event: CdkDragDrop<Object[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
