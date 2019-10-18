import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {
  public titulo:string;
  
  /**
   * Crea la instancia del componente error
   */
  constructor() { 
    this.titulo = "Error!!! Página no encontrada";
  }

  ngOnInit() {
  }

}
