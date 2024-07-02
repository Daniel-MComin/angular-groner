import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent {
  constructor(private http: HttpClient) { }

  aplicarErro(campo:any){
    return {
      'is-invalid': this.verificarValid(campo)
    }
  }
  
  verificarValid(campo:any){
    return !campo.valid && campo.touched
  }
  
  onSubmit(form: any){
    console.log(form)

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value)).pipe(map((dados: any) => dados)).subscribe(dados => console.log(dados))
  }

  consultaCep(cep:any, form:any){
      cep = cep.replace (/\D/g, '');
   
      if (cep != null && cep !== '') {
        let validacep = /^[0-9]{8}$/;
   
        if (validacep.test(cep)){
          this.resetaDados(form);
       
          this.http.get(`//viacep.com.br/ws/${cep}/json/`)
            .pipe(map((dados: any) => dados))
            .subscribe(dados => this.populaDados(dados, form));
        }
      }
  }

  populaDados(dados:any, form:any){
    form.form.patchValue({
      endereço:{
        cep: dados.cep,
        rua: dados.logradouro,
        bairro: dados.bairro,
        complemento: dados.complemento,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }

  resetaDados(form:any){
    form.form.patchValue({
    endereço:{
      rua: null,
      bairro: null,
      complemento: null,
      cidade: null,
      estado: null
    }
  })
}
}
