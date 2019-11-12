import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.sass']
})
export class ListProjectComponent implements OnInit {

  tasksGrouped: any = [];

  constructor(
    private taskService: TaskService
  ) { 
    
  }
  
  ngOnInit() {
    
    this.tasksGrouped = this.taskService.getGroupByProject();
    console.log(this.tasksGrouped);
  }

}
