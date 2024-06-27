import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Tecelement } from '../interfaces/tecelement';

@Injectable({
  providedIn: 'root'
})
export class TecelementsService {

  private rutServicio =  environment.endpoint + '/api/tecelements';

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.rutServicio).pipe(map(res => res as Tecelement[]));
  }

  getById(id: number) {
    return this.httpClient.get(this.rutServicio + '/' + id).pipe(map(res => res as Tecelement));
  }

  add(r: Tecelement) {
    return this.httpClient.post(this.rutServicio, r).pipe(map((res) => res as any));
  }

  update(r: Tecelement) {
    return this.httpClient.put(this.rutServicio, r).pipe(map((res) => res));
  }

  DELETE(id: number) {
    return this.httpClient.delete(this.rutServicio + '/' + id).pipe(map((res) => res));
  }
}
