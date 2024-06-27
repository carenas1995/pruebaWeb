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

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.rutServicio).pipe(map(res => res as Sucursales[]));
  }

  getById(id: number) {
    return this.httpClient.get(this.rutServicio + '/' + id).pipe(map(res => res as Sucursales));
  }

  add(r: Sucursales) {
    return this.httpClient.post(this.rutServicio, r).pipe(map((res) => res as any));
  }

  update(r: Sucursales) {
    return this.httpClient.put(this.rutServicio, r).pipe(map((res) => res));
  }

  DELETE(id: number) {
    return this.httpClient.delete(this.rutServicio + '/' + id).pipe(map((res) => res));
  }
}
