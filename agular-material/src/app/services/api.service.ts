import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}


  agregarEquipo(e: any){
    return this.http.post<any>("http://localhost:3000/productos",e);
  }

  getEquipo(id: string){
    return this.http.get<any>(`http://localhost:3000/productos/${id}`)
  }

  getEquipos(){
    return this.http.get<any>(`http://localhost:3000/productos`)
  }

}
