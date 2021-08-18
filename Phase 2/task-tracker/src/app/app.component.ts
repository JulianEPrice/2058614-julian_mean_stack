import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Tracker';
  displayedColumns: string[] = ['id', 'name', 'task', 'deadline'];
  tasks: Array<Task> = new Array();
  
  constructor() {    
  }
  
  @ViewChild(MatTable) table!: MatTable<Task>;

  addData(id: any, name: any, task: any, deadline: any) {
    this.tasks.push(new Task(id.value, name.value, task.value, deadline.value));
    this.table.renderRows();
  }
}