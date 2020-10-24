import { Injectable } from '@angular/core';
import { Blogitem } from '../models/blogItem';

import { Todo } from 'src/app/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TalkServiceService {
  selectedBlogItem: Blogitem;

  constructor() {
    //this.createBlogItems();
  }
  bloglist: Blogitem[] = new Array();


  // createBlogItems() {
  //   const item1 = new Blogitem('Umgang mit Stress', 'dasd', "Positivity to Go is our heart project, where we want to take you on our journey to self-realization and mental well-being. We focus on the strengths, positive qualities and experiences of life. Positivity to Go supports you to create a fulfilling life and to go your individual way successfully. Whether you reach your full potential depends largely on yourself! Together with you we would like to find out, how you can realize this potential and what makes you happy. We share our experiences with you to inspire & motivate you and to help you finding your individual way in all areas of life.  With Positivity to Go we take you on new adventures, share our experiences and positivity, inspire you to achieve your goals and strive for mental well-being in order to make the best of our lives together!");

  //   item1.todos.push(new Todo("lernen", "sometime"));
  //   item1.todos.push(new Todo("Spielen", "sometime"));
  //   item1.todos.push(new Todo("Planen", "sometime"));
  //   item1.todos.push(new Todo("Bla bla", "sometime"));
  //   item1.todos.push(new Todo("XCV", "sometime"));

  //   const item2 = new Blogitem("Mentales Wohnbefinden", "bla bla bla bla bla x y z", "Positivity to Go is our heart project, where we want to take you on our journey to self-realization and mental well-being. We focus on the strengths, positive qualities and experiences of life. Positivity to Go supports you to create a fulfilling life and to go your individual way successfully. Whether you reach your full potential depends largely on yourself! Together with you we would like to find out, how you can realize this potential and what makes you happy. We share our experiences with you to inspire & motivate you and to help you finding your individual way in all areas of life.  With Positivity to Go we take you on new adventures, share our experiences and positivity, inspire you to achieve your goals and strive for mental well-being in order to make the best of our lives together!");

  //   item2.todos.push(new Todo("xcv", "sometime"));
  //   item2.todos.push(new Todo("Bla ", "sometime"));
  //   item2.todos.push(new Todo("mimi", "sometime"));
  //   item2.todos.push(new Todo("Bla bla", "sometime"));
  //   item2.todos.push(new Todo("XCV", "sometime"));

  //   this.bloglist.push(item1);
  //   this.bloglist.push(item2);



  // }
  getBlogItems() {
    return this.bloglist;
  }

}
