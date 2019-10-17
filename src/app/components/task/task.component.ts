import { Component, OnInit } from '@angular/core';
import { Task } from "../../models/task/task";

import { TaskService } from "../../services/task/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  
  public tasks: Array<Task>;

  constructor(
    private taskService: TaskService
  ) { 
    this.tasks = taskService.getTasks();
  }

  ngOnInit() {
  }

}
