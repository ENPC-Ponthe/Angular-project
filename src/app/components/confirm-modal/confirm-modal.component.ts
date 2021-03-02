import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, transition } from '@angular/animations';

import { KEY_CODE } from '../image-viewer/image-viewer.component';
import { fadeOut, fadeIn, unfoldIn, unfoldOut } from 'src/app/constants/Animations';

const OVERLAY_OPACITY = 0.65;

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  animations: [
    trigger('modal', [
      transition(':enter', [unfoldIn('0.75s')]),
      transition(':leave', [unfoldOut('0.75s')])
    ]),
    trigger('overlay', [
      transition(':enter', [fadeIn(150, OVERLAY_OPACITY)]),
      transition(':leave', [fadeOut(150, OVERLAY_OPACITY)])
    ])
  ]
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() cancelText: string;
  @Input() validateText: string;
  @Input() visible: boolean;
  @Output() closeValidate = new EventEmitter<{}>();
  @Output() closeCancel = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  }

  onCloseModalCancel() {
    this.closeCancel.next();
  }

  onCloseModalValidate() {
    this.closeValidate.next();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.visible && event.code === KEY_CODE.ESCAPE) {
      this.onCloseModalCancel();
    }
  }
}
