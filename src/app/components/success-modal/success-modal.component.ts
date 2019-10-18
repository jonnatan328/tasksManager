import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.sass']
})
export class SuccessModalComponent implements OnInit {

  /**
   * Crea la instancia del componente del modal de exito
   * @param bsModalRef 
   */
  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
