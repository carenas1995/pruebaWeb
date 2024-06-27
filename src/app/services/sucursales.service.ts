import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Sucursales } from '../interfaces/sucursales';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  private rutServicio =  environment.endpoint + '/api/sucursales';
  public headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
  });

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.rutServicio).pipe(map(( res: any ) => res as Sucursales[]));
  }

  getById(id: number) {
    return this.httpClient.get(this.rutServicio + '/' + id).pipe(map(( res: any ) => res as Sucursales));
  }

  add(r: Sucursales) {
    return this.httpClient.post(this.rutServicio, r).pipe(map(( res: any ) => res as Sucursales));
  }

  update(r: Sucursales) {
    return this.httpClient.put(this.rutServicio, r).pipe(map(( res: any ) => res as Sucursales));
  }

  DELETE(id: number) {
    return this.httpClient.delete(this.rutServicio + '/' + id).pipe(map(( res: any ) => res as Sucursales));
  }
}
