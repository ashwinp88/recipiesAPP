import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-ok-cancel',
  templateUrl: './modal-ok-cancel.component.html',
  styleUrls: ['./modal-ok-cancel.component.css']
})
export class ModalOkCancelComponent implements OnInit {
  @Input() modalTitle = 'Title';
  @Input() modalContent = 'Content';
  @Input() modalOkBtnCaption = 'OK';
  @Input() modalCancelButtonCaption = 'Cancel';
  @Input() modalBtnCancelVisible = true;

  constructor(public activeModal: NgbActiveModal,
              ) { }

  ngOnInit() {
  }

}
