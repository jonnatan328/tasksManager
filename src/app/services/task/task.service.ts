import { Injectable } from '@angular/core';
import { Task } from "../../models/task/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  tasksObject: Array<Task> = [];

  /**
   * Almacena una tarea
   * @param task Tarea que se desea guardar
   */
  setTask(task: Task) {
    this.tasksObject.push(task);
  }

  /**
   * Obtiene todas las tareas almacenadas
   */
  getTasks():Array<Task>{
    return this.tasksObject
  }

  cleanData(){
    this.tasksObject = [];
  }
}
