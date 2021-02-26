import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reactive-form-example',
  templateUrl: './reactive-form-example.component.html',
  styleUrls: ['./reactive-form-example.component.scss']
})

export class ReactiveFormExampleComponent implements OnInit, OnDestroy {
  public reactiveForm: FormGroup | any;
  public items: FormArray;
  public submitted: boolean = false;
  private subscriber: Subscription;
  public staticData = {
    name: 'satyam',
    email: 'satyam@gmail.com',
    items: [
      {
        itemName: 'watch',
        quantity: 2,
        price: 1000,
        discount: 10
      },
      {
        itemName: 't-shirt',
        quantity: 2,
        price: 500,
        discount: 10
      }
    ]
  };
  public totalPriceCal = {
    totalQuantity: 0,
    totalPrice: 0,
    totalDiscountPercentage: 0,
    totalDiscount:0,
    totalSum: 0
  }

  constructor(private fb: FormBuilder) { }

  initForm() {
    this.reactiveForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control(''),
      items: this.fb.array([this.createItem()])
    });
    this.valueChangeWatcher();
  }

  private valueChangeWatcher() {
    this.reactiveForm.controls.name.valueChanges.subscribe((value)=>{
      if(value === "satyam"){
        this.reactiveForm.controls.email.setValidators([Validators.required, Validators.email]);
        this.reactiveForm.controls.email.updateValueAndValidity();
      } else {
        this.reactiveForm.controls.email.setValidators(undefined);
        this.reactiveForm.controls.email.setErrors(null);
        this.reactiveForm.controls.email.updateValueAndValidity();
      }
    });
    this.subscriber = this.reactiveForm.controls.items.valueChanges.subscribe((items: any) => {
      this.totalPriceCal = {
        totalQuantity: 0,
        totalPrice: 0,
        totalDiscountPercentage: 0,
        totalDiscount: 0,
        totalSum: 0
      };
      items.forEach(item => {
        this.totalPriceCal.totalQuantity += item.quantity;
        this.totalPriceCal.totalPrice += item.price;
        this.totalPriceCal.totalDiscountPercentage += item.discount;
        this.totalPriceCal.totalDiscount += ((item.quantity * item.price) * item.discount)/100;
        this.totalPriceCal.totalSum += (item.quantity * item.price);
      });
    })
  }

  private createItem() {
    return this.fb.group({
      itemName: this.fb.control('', Validators.required),
      quantity: this.fb.control('', Validators.required),
      price: this.fb.control('', Validators.required),
      discount: this.fb.control('', Validators.required),
      SGST: this.fb.control('', Validators.required)
    });
  }

  public addItem() {
    this.items = this.reactiveForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  public removeItem(index: number) {
    this.items = this.reactiveForm.get('items') as FormArray;
    this.items.removeAt(index);
  }

  public onSubmit() {
    this.submitted = true;
    if (this.f.invalid) {
      return;
    }
  }

  public get f() { return this.reactiveForm.controls; }

  private setValue() {
    this.reactiveForm.controls.name.setValue(this.staticData.name);
    this.reactiveForm.controls.email.setValue(this.staticData.email);
    this.setItemValue();
  }

  private setItemValue() {
    let array = this.reactiveForm.get('items') as FormArray;
    array.clear();
    this.staticData.items.forEach((item) => {
      this.reactiveForm.controls.items.push(this.fb.group({
        itemName: item.itemName,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        SGST: null
      }));
    });
  }

  ngOnInit() {
    this.initForm();
    this.setValue();
  }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }
}
