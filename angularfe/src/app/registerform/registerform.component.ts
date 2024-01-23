import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserdataService } from '../services/userdata.service';
@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {
  countries: any[] = [];
  states: any[] =[];
  cities: any[]=[];
  constructor(private http: HttpClient, userData: UserdataService){

  }
  ngOnInit(): void {
    this.http.get("http://localhost:4000").subscribe((res:any)=>{
        this.countries = res
      })
  }
  registrationForm : any = new FormGroup({
    first_name: new FormControl('',[Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
    phone_number: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    designation: new FormControl('',[Validators.required]),
    dob_date: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required]),
    photo: new FormControl('',[Validators.required]),
    country: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    pincode: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),

  })
  // validations
  get first_name(){
    return this.registrationForm.get('first_name')
  }
  get last_name(){
    return this.registrationForm.get('last_name')
  }
  get gender(){
    return this.registrationForm.get('gender')
  }
  get phone_number(){
    return this.registrationForm.get('phone_number')
  }
  get email(){
    return this.registrationForm.get('email')
  }
  get designation(){
    return this.registrationForm.get('designation')
  }
  get dob_date(){
    return this.registrationForm.get('dob_date')
  }
  get age(){
    return this.registrationForm.get('age')
  }
  get photo(){
    return this.registrationForm.get("photo")
  }
  get country(){
    return this.registrationForm.get('country')
  }
  get state(){
    return this.registrationForm.get('state')
  }
  get city(){
    return this.registrationForm.get('city')
  }
  get pincode(){
    return this.registrationForm.get('pincode')
  }

  register(){
    const state = this.states.filter((item)=>{
      return this.registrationForm.value.state == item.state_id
    })
    const country = this.countries.filter((item)=>{
      return this.registrationForm.value.country == item.country_id
    })
    let birthday = this.registrationForm.value.dob_date
    let dob = new Date(birthday)
    const epochTime = Math.floor(dob.getTime());
    this.registrationForm.patchValue({
      dob_date: epochTime
    })
    this.registrationForm.patchValue({
      country: country[0].country_name,
      state: state[0].state_name
    })
    const data = this.registrationForm.value
    this.http.post("http://localhost:4000/insertData",data).subscribe((res)=>{
      window.location.reload()
    })
  }
  calculateAge(event: any){
    let dob = event.target.value;
    const birthDate = new Date(dob);
    const currentDate = new Date(); 
    let ageDiff = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      ageDiff = ageDiff - 1;
    } else {
      ageDiff = ageDiff;
    }
    this.registrationForm.patchValue({
      age: ageDiff
    })
  }
  getfile(event : any){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      const formData = new FormData();
      formData.append('file', file);
      this.http.post("http://localhost:4000",formData).subscribe((res:any)=>{
        this.registrationForm.patchValue({photo:res.imgName})
      })
    }
  }

  getStates(event : any){
    const id = event.target.value
    this.http.get(`http://localhost:4000/states/${id}`).subscribe((res:any)=>{
     this.states = res;
    })
  }
  getCities(event : any){
    const id = event.target.value
    this.http.get(`http://localhost:4000/cities/${id}`).subscribe((res:any)=>{
     this.cities = res;
    })
  }
}
