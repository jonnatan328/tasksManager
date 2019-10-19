import { Injectable } from '@angular/core';
import { project } from 'src/app/models/project/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsArray: Array<project>;

  constructor() { 
    this.projectsArray = [new project(1,'Proyecto 1'), 
      new project(2,'Proyecto 2'),
      new project(3,'Proyecto 3'),
      new project(4,'Proyecto 4'),
      new project(5,'Proyecto 5')]
  }

  /**
   * Obtiene todas los projectos almacenados
   */
  getProjects(){
    return this.projectsArray;
  }
}
