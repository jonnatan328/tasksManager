import { Component, OnInit } from '@angular/core';
import { Task } from "../../models/task/task";

import { TaskService } from "../../services/task/task.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  
  public tasks: Observable<Task[]>;
  public searchText: string;
  public bsModalRef: BsModalRef;

  constructor(
    private taskService: TaskService,
    private modalService: BsModalService,
    private router: Router,
    private shareDataService: ShareDataService
  ) {
    this.searchText = ""; 
    this.tasks = this.taskService.getTasks();
  }
  
  ngOnInit() {
  }

  /**
   * Limpia el campo para filtrar
   */
  clearFilter() {
    this.searchText = "";
  }

  /**
   * Abre modal que contiene el formulario para crear una tarea.
   */
  openModalCreateTask(){
    const initialState = {
      title: 'Crear tarea'
    };
    this.bsModalRef = this.modalService.show(CreateTaskComponent, {initialState});
  }

  routeToTaskDetails(task){
    this.shareDataService.setData("taskToEdit", task);
    this.router.navigate(['/editTask'])
  }

}
