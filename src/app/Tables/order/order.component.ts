import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderClass } from 'src/app/api/orderClass';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() order!: any
  @Output() changeCount: EventEmitter<OrderClass> = new EventEmitter<OrderClass>();
  
  orderForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      count: new FormControl('0'),
    });
    this.orderForm.get('count')?.patchValue(this.order.count)
  }
 onChangeCount(){
  this.order.count = this.orderForm.value.count
  this.changeCount.emit(this.order)
 }
}
