import { Component, OnInit } from '@angular/core';
import { GoalsService } from './goals.service'
import { Goal } from '../models/goal'
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {


  goals;
  isActiveGoals = true;

  constructor(
    private goalsService: GoalsService,
    private router: Router,
  ) {

    this.goalsService.getGoalsObservable().subscribe(res => {
      console.log('new Value: ', res);
      this.goals = res;
    });
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    console.log("checking if done");
    this.goalsService.checkAllIsDone();
  }

  onGoalSelected(goal: Goal) {
    this.goalsService.selectedGoal = goal;
    this.router.navigateByUrl('/tabs/goals/goal-detail');
  }

  newGoal() {
    this.router.navigateByUrl('/tabs/goals/choose-category');
  }
  segmentChanged(ev: any) {
    this.isActiveGoals = !this.isActiveGoals;
    console.log("only ative: " + this.isActiveGoals)
  }

  finischGoal(goal: Goal) {
    goal.activ = false;
    this.goalsService.updateGoal();
  }
  deleteGoal(goal: Goal) {
    this.goalsService.deleteGoal(goal);
  }
}
