import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.sass']
})
export class ListProjectComponent implements OnInit {

  tasksGrouped: any = [];
  projects: Array<string>;
  elementAccordionClass: string;

  constructor(
    private taskService: TaskService
  ) { 
    this.tasksGrouped = this.taskService.getGroupByProject();
    this.projects = Object.keys(this.tasksGrouped);
    this.elementAccordionClass = "element-accordion";
    console.log(this.tasksGrouped);
  }
  
  ngOnInit() {
    
  }

}
