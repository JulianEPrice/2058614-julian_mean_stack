export class User {
    constructor(
        public first_name:string,
        public last_name:string,
        public username:string,
        public password:string){
    }
}

export class Contact {
    constructor(
        public name:string,
        public phone_number:number){
    }
}