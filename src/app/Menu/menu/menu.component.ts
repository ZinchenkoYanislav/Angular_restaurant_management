import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MenuClass } from 'src/app/api/menuClass';
import { MenusService } from 'src/app/api/MenusService';
import {ImageModule} from 'primeng/image';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private menusService: MenusService) { }

  private readonly _destroying$ = new Subject<void>();

  menus?: MenuClass[]

  menuForm!: FormGroup;
  menuFormStatus: boolean = false

  url: any;
  msg = '';

  ngOnInit(): void {
    this.getAllMenu()
    this.menuForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      img: new FormControl('')
    });
  }

  getAllMenu() {
    this.menusService.getAll().subscribe((res) => {
      this.menus = res;
      console.log(this.menus)
    });
  }

  showImg(){
    this.url = this.menuForm.value.img
  }

  onSubmit() {
    console.log(this.menuForm);
    if (this.menuForm.invalid) {
      return;
    }

    let stream$: Observable<MenuClass>;

    const NEW_MENU: MenuClass = this.menuForm.value;

    stream$ = this.menusService.create(NEW_MENU);
    stream$.pipe(takeUntil(this._destroying$)).subscribe((data: MenuClass) => {
      this.menus?.push(data);
    });
  }

  deleteMenu(menu: MenuClass) {
    this.menusService.delete(menu).subscribe()
    this.menus = this.menus?.filter((item) => item.id !== menu.id);
  }
  

  // selectFile(event: any) {
  //   if (!event.target.files[0] || event.target.files[0].length == 0) {
  //     this.msg = 'You must select an image';
  //     return;
  //   }

  //   let mimeType = event.target.files[0].type;

  //   if (mimeType.match(/image\/*/) == null) {
  //     this.msg = 'Must be only image';
  //     return;
  //   }

  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);

  //   reader.onload = (_event) => {
  //     this.msg = '';
  //     this.url = reader.result;
  //     console.log(this.url)
  //   };
  // }

  
  // onEdit(menu: MenuClass) {
  //   let newMenu: MenuClass = {...menu, name: this.editForm.value.name}
  //   this.menusService.update(newMenu).subscribe()
  //   // this.waiter = newWaiter
  //   this.display = false;
  // }
}
