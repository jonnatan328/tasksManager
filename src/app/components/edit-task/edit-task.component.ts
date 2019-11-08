import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { project } from 'src/app/models/project/project';
import { BsLocaleService } from 'ngx-bootstrap';
import { ProjectService } from 'src/app/services/project/project.service';
import { ShareDataService } from 'src/app/services/shareData/share-data.service';
import { Task } from 'src/app/models/task/task';
import { TaskService } from 'src/app/services/task/task.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.sass']
})
export class EditTaskComponent implements OnInit {

  locale = 'es';
  editTaskForm: FormGroup;
  projects: Array<project>;
  bsConfig: {};
  dateFormat: string;
  task: Task;
  taskNameToEdit: string;

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private projectService: ProjectService,
    private shareDataService: ShareDataService,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.projects = this.projectService.getProjects();
    this.localeService.use(this.locale); // Configura el datepicker en espanol
    this.dateFormat = 'dd-MM-yyyy';
    this.bsConfig = { // configuracion para el datepicker
       isAnimated: true,
        dateInputFormat: 'MMMM DD YYYY',
        containerClass: 'theme-dark-blue' 
      }
  }

  ngOnInit() {
    this.editTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      project: ['', Validators.required],
      deadline: ['', Validators.required],
      comment: ['', Validators.required],
    })
    let task = this.shareDataService.getData("taskToEdit");
    this.setDefaultValues(task);
  }

  /**
   * Obtiene controls del formulario
   */
  get editTaskFormCtrl() { return this.editTaskForm.controls}

  setDefaultValues(task: Task){
    this.editTaskFormCtrl.name.setValue(task.name);
    this.editTaskFormCtrl.project.setValue(task.project);
    this.editTaskFormCtrl.deadline.setValue(task.deadline);
    this.editTaskFormCtrl.comment.setValue(task.comment);

    this.taskNameToEdit = task.name;
  }

  onSubmit(){
    
    if (this.editTaskForm.invalid) {
      return;
    }

    console.log("Fecha: ", this.editTaskFormCtrl.deadline.value);
    
    this.task = new Task(this.editTaskFormCtrl.name.value, 
      this.editTaskFormCtrl.project.value,
      this.datePipe.transform(this.editTaskFormCtrl.deadline.value, this.dateFormat),
      this.editTaskFormCtrl.comment.value
    )
    
    let response = this.taskService.editTask(this.task, this.taskNameToEdit);
    if (response.code === "200") {
      this.router.navigate(['/']);
    } else if(response.code === "301") {
      this.toastr.error('', "Ya existe un tarea con el nombre ingresado.", {
        positionClass: 'toast-bottom-center'
      });
    }
    
  }
}
