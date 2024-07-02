import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control',
  templateUrl: './campo-control.component.html',
  styleUrl: './campo-control.component.css'
})
export class CampoControlComponent {
@Input() mostrarErro: boolean = false
@Input() msgErro: string = ''
}
