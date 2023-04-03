import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/Order';
import { OrderItem } from 'src/app/common/OrderItem';
import { Purchase } from 'src/app/common/Purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { KartikShopFormService } from 'src/app/services/kartik-shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
   checkoutFormGroup:FormGroup;
   totalPrice:number = 0;
   totalQuantity:number = 0;


   creditCardYears:number[]=[];
   creditCardMonths:number[]=[];

   countries:Country[]=[];
   shippingAddressStates:State[]=[];
   billingAddressStates:State[]=[];   

   
  constructor(private formBuilder:FormBuilder,
    private kartikShopForm:KartikShopFormService,
    private customerDetailsService: CustomerDetailsService,
    private cartService:CartService,
    private checkoutService:CheckoutService,
    private router:Router) { }

  ngOnInit() {
        this.reviewCartDetails();

    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        email:new FormControl('',
                              [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
        ),
      }),
      shippingAddress:this.formBuilder.group({
        street:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),

      }),
      billingAddress:this.formBuilder.group({
        street:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),

      }),
      creditCardInformation:this.formBuilder.group({
        cardType:new FormControl('',[Validators.required]),
        nameOnCard:new FormControl('',[Validators.required,Validators.minLength(2),ShopValidators.notOnlyWhitespace]),
        cardNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('',[Validators.required,Validators.pattern('[0-3]{3}')]),
        expirationMonth:new FormControl('',[Validators.required]),
        expirationYear:new FormControl('',[Validators.required])
      }),
    });
    //populate credit card months
    const startMonth:number=new Date().getMonth();
    console.log("startMonth:"+startMonth);
    this.kartikShopForm.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved credit card months:"+JSON.stringify(data));
        this.creditCardMonths=data;
      }
    );
    //populate credit card years
    this.kartikShopForm.getCreditCardYear().subscribe(
      data=>{
        console.log("Retrieved credit card years:"+JSON.stringify(data));
        this.creditCardYears=data;
      }
    );
    //populate countries
    this.kartikShopForm.getCountires().subscribe(
      data=>{
        console.log("Retrieved countires:"+JSON.stringify(data));
        this.countries=data;
      }
    );

  }
  reviewCartDetails() {
       //subscribe to cartService.total Quantity
       this.cartService.totalQuantity.subscribe(
       totalQuantity=>this.totalQuantity=totalQuantity
       );
       //subscribe to cartService total price
       this.cartService.totalPrice.subscribe(
        totalPrice=>this.totalPrice=totalPrice
       );

  }
  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}
  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}
  
  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  
  get creditCardInformationCardType(){return this.checkoutFormGroup.get('creditCardInformation.cardType');}
  get creditCardInformationCardNumber(){return this.checkoutFormGroup.get('creditCardInformation.cardNumber');}
  get creditCardInformationNameOnCard(){return this.checkoutFormGroup.get('creditCardInformation.nameOnCard');}
  get creditCardInformationSecurityCode(){return this.checkoutFormGroup.get('creditCardInformation.securityCode');}
  get creditCardInformationExpirationMonth(){return this.checkoutFormGroup.get('creditCardInformation.expirationMonth');}
  get creditCardInformationExpirationYear(){return this.checkoutFormGroup.get('creditCardInformation.expirationYear');}

  


//  get street(){return this.checkoutFormGroup.get('shippingAddress.street');}
 // get city(){return this.checkoutFormGroup.get('shippingAddress.city');}
  //get zipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}

  //get street1(){return this.checkoutFormGroup.get('billingAddress.street');}
  //get city1(){return this.checkoutFormGroup.get('billingAddress.city');}
  //get zipCode1(){return this.checkoutFormGroup.get('billingAddress.zipCode');}


  

 onSubmit(){
  console.log("Handling the submit button");
  if(this.checkoutFormGroup.invalid){
    this.checkoutFormGroup.markAllAsTouched();
    return;
  }
//set up order
let order=new Order();
order.totalPrice=this.totalPrice;
order.totalQuantity=this.totalQuantity;

//get cart item
const cartItems=this.cartService.cartItems;

//create orderItems from cartites
//logn way
//let orderItems:OrderItem[]=[];
//for(let i=0;i<cartItems.length;i++){
 // orderItems[i]=new OrderItem(cartItems[i]);
//}
//short way
let orderItems:OrderItem[]=cartItems.map(tempCartItem=>new OrderItem(tempCartItem));

//set up purchase
let purchase=new Purchase();

//purchase -shipping address

purchase.shippingAddress=this.checkoutFormGroup.controls['shippingAddress'].value;
const shippingState:State=JSON.parse(JSON.stringify(purchase.shippingAddress.state));
const shippingCountry:Country=JSON.parse(JSON.stringify(purchase.shippingAddress.country));
purchase.shippingAddress.state=shippingState.name;
purchase.shippingAddress.country=shippingCountry.name;




//purchase -billing

purchase.billingAddress=this.checkoutFormGroup.controls['billingAddress'].value;
const billingState:State=JSON.parse(JSON.stringify(purchase.billingAddress.state));
const billingCountry:Country=JSON.parse(JSON.stringify(purchase.billingAddress.country));
purchase.billingAddress.state=billingState.name;
purchase.billingAddress.country=billingCountry.name;


//purchase - order and order  tiites
purchase.order=order;
purchase.orderItems=orderItems;

//cusotmer
purchase.customer=this.checkoutFormGroup.controls['customer'].value;

//rest api call
this.checkoutService.placeOrder(purchase).subscribe(
  {
    //happy path
    next:response=>{
      alert(`your order has been received.\ Order tracking number: ${response.orderTrackingNumber}`);
      //reset cart
      this.resetCart();
    },

    //error path
    error:err=>{
      alert(`there was an error:${err.message}`);
    }

  }
);

  // console.log(this.checkoutFormGroup.get('customer').value,(this.checkoutFormGroup.get('shippingAddress').value)
  // ,(this.checkoutFormGroup.get('shippingAddress').value));
  // console.log(this.checkoutFormGroup.get('billingAddress').value);

  // console.log("the email address is"+this.checkoutFormGroup.get('customer').value.email);
  // console.log("the shipping address country is"+this.checkoutFormGroup.get('shippingAddress').value.country.name);
  // console.log("the shipping address state is"+this.checkoutFormGroup.get('shippingAddress').value.state.name);

  //send data to backend
  //const customerDetails = {
    //firstName: this.checkoutFormGroup.get('customer.firstName1').value,
    //lastName: this.checkoutFormGroup.get('customer.lastName').value,
    //email: this.checkoutFormGroup.get('customer.email').value,
 //   street: this.checkoutFormGroup.get('shippingAddress.street').value,
   // city: this.checkoutFormGroup.get('shippingAddress.city').value,
  //  state: { name: this.checkoutFormGroup.get('shippingAddress.state').value },
   // country: { name: this.checkoutFormGroup.get('shippingAddress.country').value },
   // zipCode: this.checkoutFormGroup.get('shippingAddress.zipCode').value
  //};

  //this.customerDetailsService.saveCustomerDetails(customerDetails).subscribe(response => {
  //  console.log('Success:', response);
  //}, error => {
   // console.log('Error:', error);
  //});
 

 }
  resetCart() {
    //reset cart data 
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);


    //reset form data 
this.checkoutFormGroup.reset();

    //getback
    this.router.navigateByUrl("/products");
  }
 copyShippingAddressToBillingAddress(event){
  if(event.target.checked){
    this.checkoutFormGroup.controls.billingAddress
    .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

  }
 }
 handleMonthsAndYears(){
  const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
  const currentYear:number=new Date().getFullYear();
  const selectedYear:number=Number(creditCardFormGroup.value.expirationYear);
  //if the current year equals the selected year, then start with the current month
  let startMonth:number;
  if(currentYear === selectedYear){
    startMonth = new Date().getMonth()+1;
 } 
  else{
    startMonth = 1;
  }
  this.kartikShopForm.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log("Retrieved credit card months: "+JSON.stringify(data));
      this.creditCardMonths=data;
    }
  );

}
getStates(formGroupName:string){
    const formGroup=this.checkoutFormGroup.get(formGroupName);
    const countryCode=formGroup.value.country.code;
    const countryName=formGroup.value.country.name;
    console.log(`${formGroupName} country Code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);
    this.kartikShopForm.getState(countryCode).subscribe(
      data=>{
        if(formGroupName==='shippingAddress'){
          this.shippingAddressStates=data;
        }
        else //if(formGroupName==='billingAddress'){
          {
          this.billingAddressStates=data;
        }
        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
     
}
}
