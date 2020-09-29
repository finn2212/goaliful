import { Component, OnInit } from '@angular/core';
import { TalkServiceService } from '../talk-service.service';
import { Blogitem } from 'src/app/models/blogItem';
import { TodoService } from 'src/app/todos/todo.service';
import { GoalsService } from 'src/app/goals/goals.service';

@Component({
  selector: 'app-talk-detail',
  templateUrl: './talk-detail.page.html',
  styleUrls: ['./talk-detail.page.scss'],
})
export class TalkDetailPage implements OnInit {
  blogItem: Blogitem;

  constructor(
    private talkService: TalkServiceService,
    private todoService: TodoService,
    private goalService: GoalsService) { }

  ngOnInit() {
    this.blogItem = this.talkService.selectedBlogItem;


  }
  ionViewWillEnter() {
    this.blogItem = this.talkService.selectedBlogItem;

  }
  addGoal() {
    this.goalService.newGoalTodos = this.blogItem.todos;
    this.goalService.newGoalName = this.blogItem.title;
    this.goalService.newGoalWhy = this.blogItem.text;
    this.goalService.newGoalDesc = this.blogItem.text;
    this.goalService.createGoal()
  }
  addTodo() {

    this.blogItem.todos.forEach(todo => {
      this.todoService.addSingleTodo(todo);
    });
  }
}
