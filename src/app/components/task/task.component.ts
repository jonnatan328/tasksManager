import { Component, OnInit } from '@angular/core';
import { Task } from "../../models/task/task";

import { TaskService } from "../../services/task/task.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {
  
  public tasks: Array<Task>;
  public searchText: string;
  public bsModalRef: BsModalRef;

  constructor(
    private taskService: TaskService,
    private modalService: BsModalService
  ) { 
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

}
