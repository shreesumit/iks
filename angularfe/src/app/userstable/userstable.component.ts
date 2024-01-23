import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-userstable',
  templateUrl: './userstable.component.html',
  styleUrl: './userstable.component.css',
})
export class UserstableComponent {
  users: any[] = [];
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  uId=undefined;
  show = false;
  // imageVariable : any = undefined;
  constructor(private http: HttpClient,userData: UserdataService) {
    userData.users().subscribe((data:any)=> this.users = data)
    // console.log("tttttttttt",this.users)
  }
  ngOnInit(): void {
    // this.http
    //   .get('http://localhost:4000/getUsersData')
    //   .subscribe((res: any) => {
    //     this.users = res;
    //   });
    
    this.http.get('http://localhost:4000').subscribe((res: any) => {
      this.countries = res;
    });
    this.http.get('http://localhost:4000/forState').subscribe((res: any) => {
      this.states = res;
    });
    this.http.get('http://localhost:4000/forCity').subscribe((res: any) => {
      this.cities = res;
    });
  }
  registrationForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    gender: new FormControl(''),
    phone_number: new FormControl(''),
    email: new FormControl(''),
    designation: new FormControl(''),
    dob_date: new FormControl(),
    age: new FormControl(),
    photo: new FormControl(),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
  });

  register() {
    const state = this.states.filter((item) => {
      return this.registrationForm.value.state == item.state_id;
    });
    const country = this.countries.filter((item) => {
      return this.registrationForm.value.country == item.country_id;
    });
    let birthday = this.registrationForm.value.dob_date;
    let dob = new Date(birthday);
    const epochTime = Math.floor(dob.getTime());
    this.registrationForm.patchValue({
      dob_date: epochTime,
    });
    this.registrationForm.patchValue({
      country: country[0].country_name,
      state: state[0].state_name,
    });
    const data = this.registrationForm.value;
    this.http
      .post(`http://localhost:4000/updateData/${this.uId}`, data)
      .subscribe((res) => {
        window.location.reload()
      });
  }

  calculateAge(event: any) {
    let dob = event.target.value;
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let ageDiff = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      ageDiff = ageDiff - 1;
    } else {
      ageDiff = ageDiff;
    }
    this.registrationForm.patchValue({
      age: ageDiff,
    });
  }
  getfile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.http
        .post('http://localhost:4000', formData)
        .subscribe((res: any) => {
          this.registrationForm.patchValue({ photo: res.imgName });
        });
    }
  }
  getStates(event: any) {
    const id = event.target.value;
    this.http
      .get(`http://localhost:4000/states/${id}`)
      .subscribe((res: any) => {
        this.states = res;
      });
  }
  getCities(event: any) {
    const id = event.target.value;
    this.http
      .get(`http://localhost:4000/cities/${id}`)
      .subscribe((res: any) => {
        this.cities = res;
      });
  }
  getDate(date: any) {
    const dtObject = new Date(parseInt(date));
    const formattedDate = dtObject.toISOString().split('T')[0];
    return formattedDate;
  }

  prefillForm(id: any) {
    this.uId = id;
    this.http
      .get(`http://localhost:4000/getUser/${id}`)
      .subscribe((res: any) => {
        let country = this.countries.filter((item)=>{
          return item.country_name === res[0].country
        })
        let state = this.states.filter((item)=>{
          return item.state_name === res[0].state
        })
        // this.http.get(`http://localhost:4000/images/${res[0].photo}`, { responseType: 'blob' }).subscribe((data: any) => {
        //   const reader = new FileReader();
        //   reader.onloadend = () => {
        //     this.imageVariable = reader.result;
        //     console.log(this.imageVariable)
        //   };
        //   reader.readAsDataURL(data);
        // });
        this.registrationForm.patchValue({
          first_name: res[0].first_name,
          last_name: res[0].last_name,
          gender: res[0].gender,
          phone_number: res[0].phone_number,
          email: res[0].email,
          designation: res[0].designation,
          dob_date:  this.getDate(res[0].dob_date),
          age: res[0].age,
          // photo: this.imageVariable,
          country: country[0].country_id,
          state: state[0].state_id,
          city: res[0].city,
          pincode: res[0].pincode,
        });
      });
      this.show = true;
  }
  closeModel(){
    this.show = false;
  }
}
