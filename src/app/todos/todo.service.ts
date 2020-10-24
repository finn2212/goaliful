import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo';
import { CalenderService } from '../calendar/calender.service';
import { Calitem } from '../models/calItem';
import { Storage } from '@ionic/storage';
import { Goal } from '../models/goal';
import { newArray } from '@angular/compiler/src/util';
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
    goalTodos.sort(this.sortTodos('prio'));
    return goalTodos;
  }

  addTodo(name: string, state: string, prio: number) {
    let todo = new Todo(name, state, prio);
    this.taskList.getValue().push(todo);
    this.updateTodos();
    this.taskList.getValue().sort(this.sortTodos('prio'));
  }
  addSingleTodo(todo: Todo) {
    this.taskList.getValue().push(todo);
    this.updateTodos();
    this.taskList.getValue().sort(this.sortTodos('prio'));
  }
  addTodoList(todos: Array<Todo>) {
    if (todos) {
      todos.forEach(el => {
        this.taskList.getValue().push(el);
      })
      this.taskList.getValue().sort(this.sortTodos('prio'));
      this.updateTodos();
    }

  }
  deleteTodo(index: number) {

    //console.log(this.taskList.getValue()[index].id);
    if (this.taskList.getValue()[index].externalId) {
      this.taskList.getValue()[index].done = true;
      this.calService.deleteCalenderItem(this.taskList.getValue()[index].id);
    } else {
      this.calService.deleteCalenderItem(this.taskList.getValue()[index].id);
      this.taskList.getValue().splice(index, 1);
    }

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
  deleteAllTodosFromGoal(goal: Goal) {
    console.log("elemente in der Liste:" + this.taskList.getValue().length);

    const todelete: Todo[] = new Array();
    this.taskList.getValue().forEach(function (todo) {
      if (todo.externalId === goal.id) {
        todelete.push(todo);
      }
    });
    todelete.forEach(todelete => {
      const index: number = this.taskList.getValue().indexOf(todelete);
      if (index !== -1) {
        this.taskList.getValue().splice(index, 1);
      }
    })

    console.log("elemente in der Liste:" + this.taskList.getValue().length);

  }

  setTodoStates() {
    console.log(this.calService.getDatesWithIds()[1]);

    const todoCalenderPairs = this.calService.getDatesWithIds();
    this.taskList.getValue().forEach(todo => {
      let todoisset = false;
      todoCalenderPairs.forEach(pair => {
        if (todo.id == pair.id) {
          todo.state = pair.state;
          todoisset = true;
        }


      })
      if (!todoisset) {
        todo.state = "sometime";
      }

    })
  }

  sortTodos(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
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
