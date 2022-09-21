import { Component, OnInit } from '@angular/core';
import { WaitersService } from '../../api/WaitersService';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, pipe, Subject } from 'rxjs';
import { Waiter } from '../../api/waiter';
import { switchMap, takeUntil } from 'rxjs/operators';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.component.html',
  styleUrls: ['./waiters.component.scss'],
})
export class WaitersComponent implements OnInit {
  constructor(private waitersService: WaitersService) {}

  private readonly _destroying$ = new Subject<void>();

  showAddForm: boolean = false

  waiters?: Waiter[];

  avatar: string = "assets/avatar/avatar1.png"

  registrationForm!: FormGroup;
  editForm!: FormGroup

  ngOnInit(): void {

    this.getAllWaiters();
    this.registrationForm = new FormGroup({
      name: new FormControl(''),
    });
  }
  

  getAllWaiters() {
    this.waitersService.getAll().subscribe((res) => {
      console.log(res);
      this.waiters = res;
    });
  }

  onSubmit() {
    console.log(this.registrationForm);
    if (this.registrationForm.invalid) {
      return;
    }

    let stream$: Observable<Waiter>;

    const NEW_WAITER: Waiter = this.registrationForm.value;

    stream$ = this.waitersService.create(NEW_WAITER);
    stream$.pipe(takeUntil(this._destroying$)).subscribe((data: Waiter) => {
      this.waiters?.push(data);
    });
  }

  deleteWaiter(waiter: Waiter) {
    this.waitersService.delete(waiter).subscribe()
    this.waiters = this.waiters?.filter((item) => item.id !== waiter.id);
  }

  // onEdit(waiter: Waiter) {
  //   console.log(waiter)
  //   let newWaiter: Waiter = {...waiter, name: this.editForm.value.name}
  //   // console.log(newWaiter)
  //   this.waitersService.update(newWaiter).subscribe()
  //   this.waiters!.find(t => t.id === waiter.id)!.name = this.editForm.value.name
  // }
}
