import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ButtonModule} from 'primeng/button';
import { HttpClientModule }    from '@angular/common/http';
import {CardModule} from 'primeng/card';

import { WaitersComponent } from './Waiters/waiters/waiters.component';

import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './Menu/menu/menu.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WaiterItemComponent } from './Waiters/waiter-item/waiter-item.component';
import {ImageModule} from 'primeng/image';
import { MenuItemComponent } from './Menu/menu-item/menu-item.component';
import { TablesComponent } from './Tables/tables/tables.component';
import { TableItemComponent } from './Tables/table-item/table-item.component';
// import {DataViewModule} from 'primeng/dataview';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {InputNumberModule} from 'primeng/inputnumber';
import { OrderComponent } from './Tables/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    WaitersComponent,
    MenuComponent,
    WaiterItemComponent,
    MenuItemComponent,
    TablesComponent,
    TableItemComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    MessageModule,
    TabMenuModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    AvatarModule,
    AvatarGroupModule,
    DialogModule, 
    BrowserAnimationsModule,
    ImageModule,
    ScrollPanelModule,
    InputNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
