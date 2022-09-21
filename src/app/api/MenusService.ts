import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Waiter } from './waiter';
import { map } from 'rxjs/operators';
import { EventType } from 'src/app/interfaces/event-type';
import { BaseService } from '../interfaces/base-service';
import { MenuClass } from './menuClass';

@Injectable({
  providedIn: 'root',
})
export class MenusService extends BaseService<MenuClass> {
  constructor(private http: HttpClient) {
    super();
  }

  baseUrl = 'https://625958dd43fda1299a0c6198.mockapi.io/menu';

  getAll(): Observable<MenuClass[]> {
    return this.http.get<MenuClass[]>(this.baseUrl);
  }

  create(newMenu: MenuClass) {
    return this.http.post<MenuClass>(this.baseUrl, newMenu).pipe(
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

delete(deletedMenu: MenuClass) {
  return this.http
      .delete<MenuClass>(`${this.baseUrl}/${deletedMenu.id}`, {
      })
      .pipe(
          map((data) => {
              this.onChanges(EventType.Deleted, [deletedMenu]);
              return deletedMenu;
          })
      );
}

update(editMenu: MenuClass) {
  return this.http.put<MenuClass>(`${this.baseUrl}/${editMenu.id}`, {
    ...editMenu,
  })
  .pipe(
    map((data) => {
      this.onChanges(EventType.Updated, [editMenu]);
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
