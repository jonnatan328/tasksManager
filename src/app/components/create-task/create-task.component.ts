import { Component, OnInit } from '@angular/core';
import { project } from 'src/app/models/project/project';

import { ProjectService } from "../../services/project/project.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BsModalRef } from 'ngx-bootstrap/modal';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.sass']
})
export class CreateTaskComponent implements OnInit {

  locale = 'es';
  projects: Array<project>;
  createTaskForm: FormGroup;
  bsConfig: {};
  task: Task;

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder,
    private localeService: BsLocaleService
  ) { 
    this.projects = this.projectService.getProjects();
    this.localeService.use(this.locale); // Configura el datepicker en espanol
    this.bsConfig = { // configuracion para el datepicker
       isAnimated: true,
        dateInputFormat: 'MMMM Do YYYY',
        containerClass: 'theme-dark-blue' 
      }
  }

  ngOnInit() {
    this.createTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      deadline: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  /**
   * Valida y envia la informacion de la tarea para que ser guardada
   */
  onSubmit(){
    
    if (this.createTaskForm.invalid) {
      return;
    }

    this.task = new Task(this.createTaskFormCtrl.name.value, 
      this.createTaskFormCtrl.project.value,
      this.createTaskFormCtrl.deadline.value,
      this.createTaskFormCtrl.comment.value
    )
    
    this.taskService.saveTask(this.task);
    this.bsModalRef.hide();
    
  }

  /**
   * Obtiene controls del formulario
   */
  get createTaskFormCtrl() { return this.createTaskForm.controls}


}
