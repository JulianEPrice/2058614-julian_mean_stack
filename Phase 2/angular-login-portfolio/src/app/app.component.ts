import { Component, OnInit } from '@angular/core';
import { User, Contact } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-login-portfolio';
  condition = false;
  showRegistration: boolean;
  showLogin: boolean;
  showMyPortfolio: boolean;

  contacts: Array<Contact> = new Array();
  users: Array<User> = new Array();

  constructor() {
    this.showRegistration = true;
    this.showLogin = false;
    this.showMyPortfolio = false;
   }
  ngOnInit(): void {
  }
  
  addContactInformation(nameRef: any, phoneNumberRef: any){
    let name = nameRef.value;
    let phone = phoneNumberRef.value;
    this.contacts.push(new Contact(name, phone));
  }

  register(firstName: any, lastName: any, username: any, password: any) {
    this.users.push(new User(firstName.value, lastName.value, username.value, password.value));
  }

  login(username: any, password: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username == username.value && this.users[i].password == password.value) {
        this.hide('welcome');
      }
    }
  }

  hide(info: string) {
    if (info == "sign_up") {
      this.showRegistration = true;
      this.showLogin = false;
      this.showMyPortfolio = false;
    } else if (info == "login") {
      this.showRegistration = false;
      this.showLogin = true;
      this.showMyPortfolio = false;
    } else if (info == "welcome") {
      this.showRegistration = false;
      this.showLogin = false;
      this.showMyPortfolio = true;
    }
  }
}