import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {

        path: 'goals',
        loadChildren: () => import('../goals/goals.module').then(m => m.GoalsPageModule)
      },
      {
        path: 'calender',
        loadChildren: () => import('../calendar/caladar/caladar.module').then(m => m.CaladarPageModule)
      },
      {
        path: 'calendar-detail',
        loadChildren: () => import('../calendar/calendar-detail/calendar-detail.module').then(m => m.CalendarDetailPageModule)
      },
      {
        path: 'todos',
        loadChildren: () => import('../todos/todos.module').then(m => m.TodosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/todos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/calender',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
