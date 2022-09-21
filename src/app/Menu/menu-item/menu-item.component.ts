import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuClass } from 'src/app/api/menuClass';
import { FormControl, FormGroup } from '@angular/forms';
import { MenusService } from 'src/app/api/MenusService';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  constructor(private menusService: MenusService) {}

  editForm!: FormGroup;
  display: boolean = false;
  url: any;

  @Input() menu!: MenuClass;
  @Output () deleteMenu: EventEmitter<MenuClass> = new EventEmitter<MenuClass>();

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      img: new FormControl(''),
    });
  }

  onEdit(menu: MenuClass) {
    let newMenu: MenuClass = {
      ...menu,
      name: this.editForm.value.name,
      price: this.editForm.value.price,
      img: this.editForm.value.img,
    };
    this.menusService.update(newMenu).subscribe();
    this.menu = newMenu;
    this.display = false;
  }

  showDialog(menu: MenuClass) {
    console.log(menu);
    this.display = true;
    this.url = this.menu.img;
    this.editForm.get('name')?.patchValue(menu.name);
    this.editForm.get('price')?.patchValue(menu.price);
    this.editForm.get('img')?.patchValue(menu.img);
  }

  showImg() {
    this.url = this.editForm.value.img;
  }
  onDelete(menu: MenuClass) {
    this.deleteMenu.emit(menu);
    console.log('delete')
  }
}
