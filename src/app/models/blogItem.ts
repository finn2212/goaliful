import { Todo } from './todo';
import { newArray } from '@angular/compiler/src/util';

export class Blogitem {
  date: Date;
  title: string;
  text: string;
  longText: string;
  todos: Array<Todo>;


  constructor(title: string, text: string, longText: string) {
    this.title = title;
    this.text = text;
    this.longText = longText;
    this.todos = new Array();

  }
}