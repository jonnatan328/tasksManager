import { Injectable } from '@angular/core';
import { Task } from "../../models/task/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  tasksObject: Array<Task> = [];

  setTask(task: Task) {
    this.tasksObject.push(task);
  }

  getTasks():Array<Task>{
    return this.tasksObject
  }

  cleanData(){
    this.tasksObject = [];
  }
}
