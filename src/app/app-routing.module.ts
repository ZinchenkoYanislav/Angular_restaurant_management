import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Menu/menu/menu.component';
import { TablesComponent } from './Tables/tables/tables.component';
import { WaitersComponent } from './Waiters/waiters/waiters.component';

const routes: Routes = [
  {path: '', component: WaitersComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'tables', component: TablesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
