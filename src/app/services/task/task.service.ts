import { Injectable } from '@angular/core';
import { Task } from "../../models/task/task";
import { BehaviorSubject, Observable } from 'rxjs';
import { project } from 'src/app/models/project/project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksListSubject: BehaviorSubject<Task[]>;
  private dataStore: { tasks: Task[] };
  tasksObject: Observable<Task[]>;
  

  constructor() {
    this.tasksListSubject = new BehaviorSubject<Task[]>([new Task("Tarea 1", new project("12222","Proyecto 1"), "21-10-2019", "Comment")]);
    this.dataStore = { tasks: [new Task("Tarea 1", new project("12222","Proyecto 1"), "21-10-2019", "Comment")]};
    this.tasksObject = this.tasksListSubject.asObservable();
  }

  /**
   * Almacena una tarea
   * @param task Tarea que se desea guardar
   */
  saveTask(task: Task) {
    this.dataStore.tasks.push(task);
    this.tasksListSubject.next(Object.assign({}, this.dataStore).tasks);
  }

  /**
   * Obtiene todas las tareas almacenadas
   */
  getTasks():Observable<Task[]>{
    return this.tasksObject;
  }

  cleanData(){
    this.tasksListSubject.next(null);
  }
}
