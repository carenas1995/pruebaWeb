import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Tecnicos } from '../interfaces/tecnicos';

@Injectable({
  providedIn: 'root'
})
export class TecnicosService {

  private rutServicio =  environment.endpoint + '/api/tecnicos';
  public headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
  });

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.rutServicio).pipe(map(( res: any ) => res as Tecnicos[]));
  }

  getById(id: number) {
    return this.httpClient.get(this.rutServicio + '/' + id).pipe(map(( res: any ) => res as Tecnicos));
  }

  add(r: Tecnicos) {
    return this.httpClient.post(this.rutServicio, r).pipe(map(( res: any ) => res as Tecnicos));
  }

  update(r: Tecnicos) {
    return this.httpClient.put(this.rutServicio, r).pipe(map(( res: any ) => res as Tecnicos));
  }

  DELETE(id: number) {
    return this.httpClient.delete(this.rutServicio + '/' + id).pipe(map(( res: any ) => res as Tecnicos));
  }
}
