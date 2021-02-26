import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  public reactiveForm: FormGroup | any;
  submitted = false;
  items: FormArray | any;
  subscriber: Subscription | any;
  public totalsum:number = 0;
  public priceSum:number = 0;
  public quantitySum:number = 0;
  public discountPrice:number = 0;
  public discountPercentage:number = 0;
  constructor(private fb: FormBuilder) { }

  initForm() {
    this.reactiveForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      items: this.fb.array([this.createItem()])
    })
    this.valueSubscriber();
  }

  valueSubscriber() {
    this.subscriber = this.reactiveForm.controls?.items.valueChanges.subscribe((items: any) => {
       this.totalsum = 0;
       this.priceSum = 0;
       this.quantitySum = 0;
       this.discountPrice = 0;
       this.discountPercentage = 0;
      items.forEach((item: any) => {
        if (item.quantity || item.price) {
          this.totalsum = (item.quantity * item.price);
          this.priceSum += item.price;
          this.quantitySum += item.quantity;
          this.discountPercentage += item.discount;
          this.discountPrice += (((item.quantity * item.price) * item.discount)/100);
        }
      });
    })
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: this.fb.control(''),
      quantity: this.fb.control('',[Validators.required,Validators.min(1)]),
      price: this.fb.control(''),
      discount:this.fb.control({value: '', disabled: false})
    });
  }

  addItem(): void {
    this.items = this.reactiveForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  removeItem(index: any) {
    this.items = this.reactiveForm.get('items') as FormArray;
    this.items.removeAt(index);
  }

  get f() { return this.reactiveForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      return;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }
}
