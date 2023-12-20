import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {Todo} from '../models/todo';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/api/todos`);
  }

  getTodoByID(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.baseUrl}/api/todos/${id}`);
  }
}
