import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "./posts/post.model";

@Pipe({
  name: 'changeStatus'
})
export class ChangeStatusPipe implements PipeTransform  {


  transform(value: number): string {
    if (value === 1){
      return 'low'
    }else if (value === 2){
      return 'middle'
    }else if (value === 3){
      return 'high'
    }
  }

}
