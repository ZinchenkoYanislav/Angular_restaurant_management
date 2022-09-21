import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waiter } from './waiter';
import { map } from 'rxjs/operators';
import { EventType } from 'src/app/interfaces/event-type';
import { BaseService } from '../interfaces/base-service';

@Injectable({
  providedIn: 'root',
})
export class WaitersService extends BaseService<Waiter> {
  constructor(private http: HttpClient) {
    super();
  }

  baseUrl = 'https://625958dd43fda1299a0c6198.mockapi.io/waiters';

  getAll(): Observable<Waiter[]> {
    return this.http.get<Waiter[]>(this.baseUrl);
  }

  create(newWaiter: Waiter) {
    return this.http.post<Waiter>(this.baseUrl, newWaiter).pipe(
      map((data) => {
          this.onChanges(EventType.Created, [data]);
          return data;
      })
  );
  }

//   delete(deletedWaiter: Waiter): Observable<Waiter> {
//     console.log('del')
//     return this.http.delete<Waiter>(`${this.baseUrl}/${deletedWaiter.id}`)
// }

delete(deletedWaiter: Waiter) {
  return this.http
      .delete<Waiter>(`${this.baseUrl}/${deletedWaiter.id}`, {
      })
      .pipe(
          map((data) => {
              this.onChanges(EventType.Deleted, [deletedWaiter]);
              return deletedWaiter;
          })
      );
}

update(editWaiter: Waiter) {
  return this.http.put<Waiter>(`${this.baseUrl}/${editWaiter.id}`, {
    ...editWaiter,
    name: editWaiter.name
  })
  .pipe(
    map((data) => {
      this.onChanges(EventType.Updated, [editWaiter]);
      console.log(data)
        return data;
    })
  )
}

// edit(editWaiter: Waiter) {
//   return this.http.put<Waiter>(`${this.baseUrl}`, editWaiter.id).pipe(
//       map((data) => {
//           this.onChanges(EventType.Updated, [editWaiter]);
//           return data;
//       })
//   );
// }
}
