import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";


export class FormValidators{

  // função para validar número mínimo de checkboxes marcadas no from
 static requiredMinCheckbox(min = 1) {
    return (formArray: AbstractControl)=>{
      const totalChecked = (<FormArray>formArray).controls.filter(v => v.value).length;
      return totalChecked >= min ? null : { required: true };
    }
  }

// validador de cep
static cepValidator(control: FormControl){
  const cep = control.value;
  if(cep && cep !== ' '){
    var validacep = /^[0-9]{8}$/;
    return validacep.test(cep) ? null : { cepInvalido: true }
  }
  return null
}

static equalsTo(otherField: string){
  const validator: ValidatorFn = (formControl: AbstractControl) => {
      if (formControl instanceof FormControl) {
          if (otherField == null){
              throw new Error('É necessário informar um campo.');
          }
          if (!formControl.root || !(<FormGroup>formControl.root).controls){
              return null;
          }
          const field = (<FormGroup>formControl.root).get(otherField);

          if (!field){
              throw new Error('É necessário informar um campo válido.');
          }

          if (field.value !== formControl.value){
              return { equalsTo: otherField };
          }
          return null;
      }
      throw new Error('formControl não é uma instância de FormControl');
    };
  return validator;
  }
}