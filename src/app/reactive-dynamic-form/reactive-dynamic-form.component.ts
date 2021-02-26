import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reactive-dynamic-form',
  templateUrl: './reactive-dynamic-form.component.html',
  styleUrls: ['./reactive-dynamic-form.component.scss']
})

export class ReactiveDynamicFormComponent implements OnInit, OnDestroy {
  public staticData = {
    name: 'satyam',
    email: 'satyam@gmail.com',
    items: [
      // {
      //   itemName: 'watch',
      //   quantity: 2,
      //   price: 1000,
      //   discount: 10
      // },
      // {
      //   itemName: 't-shirt',
      //   quantity: 2,
      //   price: 500,
      //   discount: 10
      // }
    ]
  };
  public reactiveForm: FormGroup | any;
  public submitted = false;
  public items: FormArray | any;
  private subscription: Subscription | any;
  public priceObj = {
    totalsum: 0,
    priceSum: 0,
    quantitySum: 0,
    discountPrice: 0,
    discountPercentage: 0,
    taxAmount:0
  };

  constructor(private fb: FormBuilder) { }

  initForm() {
    this.reactiveForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', []),
      items: this.fb.array([this.createItem()])
    });
    this.valueChangeWatcher();
  }

  private valueChangeWatcher() {
    this.reactiveForm.controls.name.valueChanges.subscribe((value: any) => {
      if (value === 'satyam') {
        this.reactiveForm.controls.email.setValidators([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
        this.reactiveForm.controls.email.updateValueAndValidity();
      } else {
        this.reactiveForm.controls.email.setValidators(undefined);
        this.reactiveForm.controls.email.setErrors(null);
        this.reactiveForm.controls.email.updateValueAndValidity();
      }
    });
    this.subscription = this.reactiveForm.controls.items.valueChanges.subscribe((items: any) => {
      this.priceObj = {
        totalsum: 0,
        priceSum: 0,
        quantitySum: 0,
        discountPrice: 0,
        discountPercentage: 0,
        taxAmount:0
      };
      items.forEach((item: any,index:number) => {
        if (item?.price || item?.quantity) {
          this.priceObj.priceSum += item.price;
          this.priceObj.quantitySum += item.quantity;
          this.priceObj.discountPercentage += item.discount;
          this.priceObj.discountPrice += (((item.quantity * item.price) * item.discount) / 100);
          this.priceObj.taxAmount += (((item.quantity * item.price) - (((item.quantity * item.price) * item.discount) / 100)) * 5) / 100;
          this.priceObj.totalsum += ((item.quantity * item.price) + (((item.quantity * item.price) - (((item.quantity * item.price) * item.discount) / 100)) * 5) / 100) - (((item.quantity * item.price) * item.discount) / 100);
        }
        // if(item.discount === 10){
        //   this.reactiveForm.controls.items.controls[index].controls.coupon.setValidators([Validators.required]);
        // } 
      });
    });
  }

  public get f() { return this.reactiveForm.controls; }

  public onSubmit() {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      return;
    }
  }

  private createItem() {
    return this.fb.group({
      itemName: this.fb.control(''),
      quantity: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      discount: this.fb.control({ value: '', disabled: false }),
      coupon: this.fb.control('')
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

  private setValue() {
    this.reactiveForm.controls.name.patchValue(this.staticData.name);
    this.reactiveForm.controls.email.patchValue(this.staticData.email);
    this.setValueFun();
  }

  private setValueFun() {
    // let array = this.reactiveForm.get('items') as FormArray;
    // array.clear();
    // for (let x of this.staticData.items) {
    //   this.reactiveForm.controls.items.push(this.fb.group({
    //     itemName: x.itemName,
    //     quantity: x.quantity,
    //     price:x.price,
    //     discount:x.discount,
    //     coupon:null
    //   }));
    // }
    if (this.staticData.items.length) {
      let array = this.reactiveForm.get('items') as FormArray;
      array.clear();
      for (let obj in this.staticData.items) {
        array.push(this.createItem());
        array.at(array.length - 1).patchValue(this.staticData.items[obj]);
      }
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.setValue();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
