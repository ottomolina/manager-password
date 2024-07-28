import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BuscarComponent,
      multi: true
    }
  ]
})
export class BuscarComponent  implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Buscar'

  @Output() keyEvent = new EventEmitter();
  @Output() focusEvent = new EventEmitter();

  public value: string = '';

  constructor() { }

  onInput(event: any) {
    this.keyEvent.emit(event.target.value);
  }

  onChange = (value: string) => {};
  onTouch = () => {};

  onFocus() {
    this.focusEvent.emit();
  }

  writeValue(value: string): void {
    this.onChange(value);
    this.value = value;
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
