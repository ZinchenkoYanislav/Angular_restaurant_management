import { Component, OnInit } from '@angular/core';
import { MenuClass } from 'src/app/api/menuClass';
import { MenusService } from 'src/app/api/MenusService';
import { TableClass } from 'src/app/api/tableClass';
import { TablesService } from 'src/app/api/tablesService';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  constructor(private tablesService: TablesService,    private menusService: MenusService) { }

  tables?: TableClass[]
  menus!: MenuClass[];

  ngOnInit(): void {
    this.getAllTables()
    this.getAllMenu()
  }

  getAllTables() {
    this.tablesService.getAll().subscribe((res) => {
      this.tables = res;
      // console.log(this.tables)
    });
  }

  getAllMenu() {
    this.menusService.getAll().subscribe((res) => {
      this.menus = res;
      console.log(this.menus);
    });
  }

}
