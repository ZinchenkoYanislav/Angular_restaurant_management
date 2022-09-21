import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Waiter } from 'src/app/api/waiter';
import { WaitersService } from 'src/app/api/WaitersService';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-waiter-item',
  templateUrl: './waiter-item.component.html',
  styleUrls: ['./waiter-item.component.scss']
})
export class WaiterItemComponent implements OnInit {
  
  @Input() waiter!: Waiter
  @Output() deleteWaiter: EventEmitter<Waiter> = new EventEmitter<Waiter>();
  avatar: string = "assets/avatar/avatar1.png"

  constructor(private waitersService: WaitersService) { }

  editForm!: FormGroup
  display: boolean = false;

  ngOnInit(): void {

    console.log(this.waiter)

    this.editForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  onDelete(waiter: Waiter) {
    this.deleteWaiter.emit(waiter);
  }

  showDialog(waiter: Waiter) {
    console.log(waiter)
    this.display = true;
    this.editForm.get('name')?.patchValue(waiter.name);
  }

  onEdit(waiter: Waiter) {
    let newWaiter: Waiter = {...waiter, name: this.editForm.value.name}
    this.waitersService.update(newWaiter).subscribe()
    this.waiter = newWaiter
    this.display = false;
  }
}
