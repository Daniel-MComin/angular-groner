import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlComponent } from './campo-control/campo-control.component';
import { DropdownService } from './services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    FormDebugComponent, 
    CampoControlComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    CampoControlComponent,
    FormDebugComponent
  ],
  providers: [ DropdownService ]
})
export class SharedModule {}
