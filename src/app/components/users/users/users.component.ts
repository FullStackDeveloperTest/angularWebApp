import { Component } from '@angular/core';
import { UsersService } from '../../../services/usersService/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  title = 'testFullStackDeveloper';
  searchText: string = '';
  USERS!: {
    id: number,
    name: string,
    email: string,
    password: string,
    image: string,
    address: string,
    phoneNumber: string,
    age: number,
    createdAt: string,
    updatedAt: string
  }[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  constructor(private usersService: UsersService, private router: Router){}
  ngOnInit(){
    this.userList();
  }
  userList():void{
    this.usersService.getAllUsers().subscribe((response) => {
      this.USERS = response;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.userList();
  }
  onTableSizeDataChange(event: any){
    this.tableSize = event.target.value;
    this.page = 1; 
    this.userList();
  }
  logOut() {
    this.router.navigate(['/']);
  }
  get filteredUsers() {
    return this.USERS.filter(user =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
