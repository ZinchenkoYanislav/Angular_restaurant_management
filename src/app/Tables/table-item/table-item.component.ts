import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { MenuClass } from 'src/app/api/menuClass';
import { MenusService } from 'src/app/api/MenusService';
import { OrderClass } from 'src/app/api/orderClass';
import { TableClass } from 'src/app/api/tableClass';
import { TablesService } from 'src/app/api/tablesService';

@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})
export class TableItemComponent implements OnInit {
  @Input() table!: TableClass;
  @Input()menus! : MenuClass[]
  // menus?: MenuClass[];
  orders: OrderClass[] = [];
  display: boolean = false;
  totalOrders: number = 0;
  tableIsTake: boolean = false
  valueCount = 0

  constructor(
    private menusService: MenusService,
    private tablesService: TablesService
  ) {}

  ngOnInit(): void {
    this.tableStatus()
    // this.getAllMenu();
    this.orders = this.table.order
    // console.log(this.table)
    this.calcSumOrders()
  }
  tableStatus(){
    if(this.table.order.length === 0){
      this.tableIsTake = false
      console.log(2)
    } else {
      this.tableIsTake = true
    }
  }

  getAllMenu() {
    this.menusService.getAll().subscribe((res) => {
      this.menus = res;
      console.log(this.menus);
    });
  }

  addOrder(menu: MenuClass) {
    let isOrder = this.orders!.find((t) => t.name === menu.name);
    let newOrder;
    if (isOrder) {
      newOrder = isOrder;
      if (isOrder.count) {
        newOrder = { ...isOrder, count: isOrder.count + 1 };
      }
      this.orders = this.orders?.filter((item) => item.name !== menu.name);
      this.orders!.push(newOrder);
    } else {
      newOrder = { name: menu.name, price: menu.price, count: 1 };
      this.orders!.push(newOrder);
    }
    this.orders = this.orders.sort(this.SortArray)
    this.calcSumOrders()
    this.onEdit(this.table, this.orders)
    this.tableStatus()
  }

  calcSumOrders(){
    this.totalOrders = 0;
    this.orders.forEach((item) => {
      if (item.price && item.count) {
        this.totalOrders += +item.price * item.count;
      }
    });
  }

  changeCount(order: any){
    this.orders = this.orders?.filter((item) => item.name !== order.name);
    this.orders!.push(order);
    this.orders = this.orders.sort(this.SortArray)
    this.onEdit(this.table, this.orders)
    this.calcSumOrders()
  }

  SortArray(x:any, y:any){
    return x.name.localeCompare(y.name);
}


  onEdit(table: TableClass, orders: any) {
    let newTable: TableClass = {
      ...table,
      order: orders
    };
    this.tablesService.update(newTable).subscribe();
    // this.menu = newMenu;
  }

  closeBill(){
    let conf = confirm('Do you whant close the bill?')
    if(conf){
      this.orders = [];
      let newTable: TableClass = {
        ...this.table,
        order: []
      };
      this.tablesService.update(newTable).subscribe();
    }
    this.tableIsTake = false
    this.totalOrders = 0;
  }
}
