import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss'],
})
export class ErrorFormComponent {
  @Input() mensaje: string;

  constructor() { }

}
