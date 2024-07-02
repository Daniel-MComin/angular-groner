import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

import { DropdownService } from '../shared/services/dropdown.service';
import { EstadosBr } from '../shared/models/estados-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { FormValidators } from '../shared/services/form-validators';

@Component({
  selector: 'app-data-driven-form',
  templateUrl: './data-driven-form.component.html',
  styleUrl: './data-driven-form.component.css'
})
export class DataDrivenFormComponent {

  formulario: FormGroup;
  estados: Observable<EstadosBr[]>;
  tecnologias: any[];
  frameworks: any[] = ['Angular', 'Vue', 'React', 'React.js'];
  
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService
  ){}

  ngOnInit(){
    this.estados = this.dropDownService.getEstadosBr();
    this.tecnologias = this.dropDownService.getCursos();
    
    this.formulario = this.formBuilder.group({
      nome: ['', [ Validators.required ]],
      email: ['', [ Validators.required, Validators.email]],
      confirmarEmail: ['', [ Validators.required, FormValidators.equalsTo('email')]],
        cep: [ null,  [Validators.required, FormValidators.cepValidator]],
        number: [ '' , Validators.required],
        complemento: [''],
        rua: ['',  Validators.required],
        bairro: ['',  Validators.required],
        cidade: ['',  Validators.required],
        estado: ['',  Validators.required],
        tecnologias: ['',  Validators.required],
        termos: [null, Validators.pattern('true')],
        frameworks: this.buildFrameworks()
    });
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidators.requiredMinCheckbox(1));
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  // submetendo os dados do form para um servidor back end
  onSubmit(){
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map((v:any, i:any)=> v ? this.frameworks[i] : null).filter((v:any) => v !== null)
    })

    console.log(this.formulario);
    if(this.formulario.valid){ 
      this.httpClient.post('https://httpbin.org/post', JSON.stringify(valueSubmit)).pipe(
        map((dados: any) => {
          console.log(dados);
        })
      ).subscribe();
    } else {
      this.formulario.markAllAsTouched()
    }
   }

   onReset(){
     // reseta o formulário
    this.formulario.reset();
   }

   aplicarErro(campo:any){
    return {
      'is-invalid': this.verificarValid(campo)
    }
  }
  
  verificarValid(campo: string){
    return !this.formulario.controls[campo].valid && (this.formulario.controls[campo].touched || this.formulario.controls[campo].dirty)
  }

  verificarCepInvalido(){
    return this.formulario.controls['cep'].hasError('cepInvalido');
  }


  verificarEmail(){
    let campoEmail = this.formulario.controls['email'];
    if(campoEmail.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  consultaCep(){
    let cep = this.formulario.get('cep')?.value
    if (cep != null && cep !== ''){
      this.cepService.consultaCep(cep)?.pipe(map((dados: any) => dados))
      .subscribe(dados => this.populaDados(dados));
      }
    }

populaDados(dados:any){
  this.formulario.patchValue({
      cep: dados.cep,
      rua: dados.logradouro,
      bairro: dados.bairro,
      complemento: dados.complemento,
      cidade: dados.localidade,
      estado: dados.uf,
  })
}

resetaDados(){
  this.formulario.patchValue({
    rua: null,
    bairro: null,
    complemento: null,
    cidade: null,
    estado: null
    })
  }

  setarCursos(){
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  } 
}
