import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadosBr } from '../models/estados-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

    getEstadosBr(){
      return this.http.get<EstadosBr[]>('assets/estados.json');
    }

    getCargos(){
      return [
        {nome: "dev", nivel: "junior", desc: "dev jr"},
        {nome: "dev", nivel: "pleno", desc: "dev pl"},
        {nome: "dev", nivel: "senior", desc: "dev sr"}
      ]
    }

    getCursos(){
      return [ 
        {nome: "java", descri: "Java"},
        {nome: "javascript", descri: "Javascript"},
        {nome: "php", descri: "PHP"},
        {nome: "python", descri: "Python"}
      ]
    }
  constructor(private http: HttpClient) { }
}
