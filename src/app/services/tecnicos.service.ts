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

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.rutServicio).pipe(map(res => res as Tecnicos[]));
  }

  getById(id: number) {
    return this.httpClient.get(this.rutServicio + '/' + id).pipe(map(res => res as Tecnicos));
  }

  add(r: Tecnicos) {
    return this.httpClient.post(this.rutServicio, r).pipe(map((res) => res as any));
  }

  update(r: Tecnicos) {
    return this.httpClient.put(this.rutServicio, r).pipe(map((res) => res));
  }

  DELETE(id: number) {
    return this.httpClient.delete(this.rutServicio + '/' + id).pipe(map((res) => res));
  }
}
