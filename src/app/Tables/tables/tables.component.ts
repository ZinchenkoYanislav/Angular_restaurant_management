import { Component, OnInit } from '@angular/core';
import { TableClass } from 'src/app/api/tableClass';
import { TablesService } from 'src/app/api/tablesService';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  constructor(private tablesService: TablesService) { }

  tables?: TableClass[]

  ngOnInit(): void {
    this.getAllTables()
  }

  getAllTables() {
    this.tablesService.getAll().subscribe((res) => {
      this.tables = res;
      // console.log(this.tables)
    });
  }

}
