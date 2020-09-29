import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo';
import { CalenderService } from '../calendar/calender.service';
import { Calitem } from '../models/calItem';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private calService: CalenderService,
    private localDb: Storage,
  ) {

  }
  taskList = new BehaviorSubject<Todo[]>([]);
  _todos;

  getTodosObservable() {
    return this.taskList.asObservable();
  }

  getTodosFromGoal(todoIds: Array<string>) {
    const goalTodos = [];
    if (todoIds.length > 0) {
      todoIds.forEach(exTodoId => {
        this.taskList.getValue().forEach(todo => {
          if (exTodoId == todo.id)
            goalTodos.push(todo);
        });
      });
    }
    return goalTodos;
  }

  addTodo(name: string, state: string) {
    let todo = new Todo(name, state);
    this.taskList.getValue().push(todo);
    this.updateTodos();

  }
  addSingleTodo(todo: Todo) {
    this.taskList.getValue().push(todo);
    this.updateTodos();

  }
  addTodoList(todos: Array<Todo>) {
    if (todos) {
      todos.forEach(el => {
        this.taskList.getValue().push(el);
      })
      this.updateTodos();
    }
  }
  deleteTodo(index: number) {
    this.taskList.getValue().splice(index, 1);
    this.updateTodos();
  }
  addToCalender(event, index) {
    const calenderItem = new Calitem(this.taskList.getValue()[index].name, event.startTime, event.endTime);
    calenderItem.externalId = this.taskList.getValue()[index].id;
    calenderItem.allDay = true;
    this.calService.addEventToCalendar(calenderItem);
    this.setTodoStates();
  }

  addTodayToCalender(index) {
    const calenderItem = new Calitem(this.taskList.getValue()[index].name, new Date(), new Date());
    calenderItem.externalId = this.taskList.getValue()[index].id;
    calenderItem.allDay = true;
    this.calService.addEventToCalendar(calenderItem);
    this.setTodoStates();
  }
  changeState(index: number) {
    // this.taskList.getValue()[index].isToday = !this.taskList.getValue()[index].isToday;
    this.updateTodos();
  }
  updateTodos() {
    this.localDb.set('todos', this.taskList.getValue());
  }
  loadToArry() {
    if (this._todos) {

      this._todos.forEach(element => {
        this.taskList.getValue().push(element);
      });

    }
    this.setTodoStates();
  }
  setTodoStates() {
    console.log(this.calService.getDatesWithIds()[1]);

    const todoCalenderPairs = this.calService.getDatesWithIds();
    this.taskList.getValue().forEach(todo => {
      todoCalenderPairs.forEach(pair => {
        if (todo.id == pair.id)
          todo.state = pair.state;
      })
    })
  }

  loadTodos() {
    return new Promise((resolve, reject) => {
      this.localDb.get('todos')
        .then(todos => {
          resolve(todos);
          this._todos = todos
        })
        .catch(reject);
    });
  }


}
