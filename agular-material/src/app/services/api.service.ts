import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  refresh$(){
    return this._refresh$;
  }

  agregarEquipo(e: any){
    return this.http.post<any>("http://localhost:3000/productos",e)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }

  getEquipos(){
    return this.http.get<any>(`http://localhost:3000/productos`)
  }

  actualizarEquipo(e: any, id: number){
    return this.http.put<any>(`http://localhost:3000/productos/${id}`,e)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }

  borrarEquipo(id: number){
    return this.http.delete<any>(`http://localhost:3000/productos/${id}`)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    )
  }

}
