import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventType } from 'src/app/interfaces/event-type';
import { BaseService } from '../interfaces/base-service';
import { TableClass } from './tableClass';

@Injectable({
  providedIn: 'root',
})
export class TablesService extends BaseService<TableClass> {
  constructor(private http: HttpClient) {
    super();
  }

  baseUrl = 'https://625958dd43fda1299a0c6198.mockapi.io/tables';

  getAll(): Observable<TableClass[]> {
    return this.http.get<TableClass[]>(this.baseUrl);
  }

  create(newMenu: TableClass) {
    return this.http.post<TableClass>(this.baseUrl, newMenu).pipe(
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

delete(deletedTable: TableClass) {
  return this.http
      .delete<TableClass>(`${this.baseUrl}/${deletedTable.id}`, {
      })
      .pipe(
          map((data) => {
              this.onChanges(EventType.Deleted, [deletedTable]);
              return deletedTable;
          })
      );
}

update(editTable: TableClass) {
  return this.http.put<TableClass>(`${this.baseUrl}/${editTable.id}`, {
    ...editTable,
  })
  .pipe(
    map((data) => {
      this.onChanges(EventType.Updated, [editTable]);
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
