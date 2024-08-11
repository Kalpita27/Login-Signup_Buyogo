import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private elementRef: ElementRef, private _route:Router, private _http:HttpClient, private formbuilder:FormBuilder) {}
  loginForm:FormGroup|any;
  signupForm:FormGroup|any;
  
  ngOnInit(): void {
  // Form validation
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', Validators.required]                    
    });
    this.signupForm = this.formbuilder.group({
      fname: ['', Validators.required],                      
      lname: ['', Validators.required],                      
      mobile: ['', Validators.required],                     
      email: ['', [Validators.required, Validators.email]],  
      password: ['', Validators.required]                    
    });
  }

  logIn(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();  // <--- Mark all fields as touched to trigger validation feedback
      return;
    }

    this._http.get<any>("http://localhost:3000/signup").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });

      if (user) {
        alert("Hurray, Login Successful!!!");
        this.loginForm.reset();
        this._route.navigate(['']);
      } else {
        alert("User not Found Fill the correct Credentials");
      }
    }, err => {
      alert("Something Went Wrong");
    });
   }
   
   signUp(){
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();  // <--- Mark all fields as touched to trigger validation feedback
      return;
    }

    this._http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe(res => {
      alert("Registration Successfully Completed!!!");
      this.signupForm.reset();
      this._route.navigate(['login']);
    }, err => {
      alert("Something Went Wrong");
    });
   }
   
     
     ngAfterViewInit() {
       const signInBtn = this.elementRef.nativeElement.querySelector('#sign-in-btn');
       const signUpBtn = this.elementRef.nativeElement.querySelector('#sign-up-btn');
       const container = this.elementRef.nativeElement.querySelector('.container');
   
       signUpBtn.addEventListener('click', () => {
         container.classList.add('sign-up-mode');
       });
   
       signInBtn.addEventListener('click', () => {
         container.classList.remove('sign-up-mode');
       });
     }
   
   
}
