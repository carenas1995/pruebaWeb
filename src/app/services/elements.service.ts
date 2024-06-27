import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private rutServicio =  environment.endpoint + '/api/elements';

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.rutServicio).pipe(map(res => res as Element[]));
  }

  getById(id: number) {
    return this.httpClient.get(this.rutServicio + '/' + id).pipe(map(res => res as Element));
  }

  add(r: Element) {
    return this.httpClient.post(this.rutServicio, r).pipe(map((res) => res as any));
  }

  update(r: Element) {
    return this.httpClient.put(this.rutServicio, r).pipe(map((res) => res));
  }

  DELETE(id: number) {
    return this.httpClient.delete(this.rutServicio + '/' + id).pipe(map((res) => res));
  }
}
