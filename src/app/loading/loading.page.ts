import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalenderService } from '../calendar/calender.service';
import { GoalsService } from '../goals/goals.service';
import { TodoService } from '../todos/todo.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(
    private router: Router,
    private calService: CalenderService,
    private goalService: GoalsService,
    private todoService: TodoService) {

  }
  dataLoaded: boolean = false;

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.wait2();
  }
  wait2() {

    if (!this.dataLoaded) {
      Promise.all([
        this.goalService.loadGoal(),
        this.todoService.loadTodos(),
        this.calService.loadEvents()])
        .then(values => {
          this.goalService.loadToArry();
          this.calService.loadToArry();
          this.todoService.loadToArry();
          this.router.navigateByUrl('/tabs/todos');
          this.dataLoaded = true;
        });
    } else {
      this.router.navigateByUrl('/tabs/todos');
    }

  }


}
