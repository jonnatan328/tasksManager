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
    let taskCreated = this.dataStore.tasks.find(taskCreated => taskCreated.name.toUpperCase() === task.name.toUpperCase());
    if (taskCreated) {
        return {
          code: '301',
          message: 'error'
        }
    } 
    this.dataStore.tasks.push(task);
    this.tasksListSubject.next(Object.assign({}, this.dataStore).tasks);
    return {
      code: '200',
      message: 'success'
    }
  }

  /**
   * Edita una tarea
   * @param task Tarea que se desea guardar
   */
  editTask(task: Task, taskName: string) {
    let updateTask = this.dataStore.tasks.find(taskCreated => taskCreated.name === taskName);
    let index = this.dataStore.tasks.indexOf(updateTask);

    let cloneArray = Object.assign([], this.dataStore.tasks);
    cloneArray.splice(index, 1);
    let taskCreated = cloneArray.find(taskCreated => taskCreated.name.toUpperCase() === task.name.toUpperCase());
    if (taskCreated) {
        return {
          code: '301',
          message: 'error'
        }
    }
    
    this.dataStore.tasks[index] = task;
    this.tasksListSubject.next(Object.assign({}, this.dataStore).tasks);
    return {
      code: '200',
      message: 'success'
    }
  }

  /**
   * Obtiene todas las tareas almacenadas
   */
  getTasks():Observable<Task[]>{
    return this.tasksObject;
  }

  /**
   * Obtiene las tareas agrupadas por proyecto
   */
  getGroupByProject(){
    let key = "project";
    const groupBy = this.dataStore.tasks.reduce(
      (result, item) => {
        (result[item[key].name] = result[item[key].name] || []).push(item);
        return result;
      }, 
      {}
    );
    console.log("Group by: ", groupBy);
    
  }

  cleanData(){
    this.tasksListSubject.next(null);
  }
}
