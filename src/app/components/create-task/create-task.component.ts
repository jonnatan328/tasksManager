import { Component, OnInit } from '@angular/core';
import { project } from 'src/app/models/project/project';

import { ProjectService } from "../../services/project/project.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.sass']
})
export class CreateTaskComponent implements OnInit {

  projects: Array<project>;
  createTaskForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder
  ) { 
    this.projects = this.projectService.getProjects();
  }

  ngOnInit() {
    this.createTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      deadline: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  onSubmit(){
    console.log("Guardando tarea...");
    
  }

  get createTaskFormCtrl() { return this.createTaskForm.controls}

    /**
     * Manejador de errores del select de proyectos
     */
   public handleError = (controlName: string, errorName: string) => {
    return this.createTaskForm.controls[controlName].hasError(errorName);
  }
}
