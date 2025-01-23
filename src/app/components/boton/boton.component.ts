import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BotonStyle } from './boton-style';

@Component({
  selector: 'app-boton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css',
})
export class BotonComponent {
  @Input() texto: string = 'Click Me';
  @Input() disabled: boolean = false;
  @Input() estilo: BotonStyle = {
    borderRadius: '',
    background: '',
    color: '',
    width: '',
  };

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}