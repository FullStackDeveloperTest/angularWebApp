import { Component } from '@angular/core';
import { UsersService } from '../services/usersService/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  title = 'testFullStackDeveloper';
  USERS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  constructor(private usersService: UsersService){}
  ngOnInit(){
    console.log()
    this.userList();
  }
  userList():void{
    this.usersService.getAllUsers().subscribe((response) => {
      this.USERS = response;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    console.log("ontabledatachange");
    this.userList();
  }
  onTableSizeDataChange(event: any){
    this.tableSize = event.target.value;
    this.page = 1; 
    this.userList();
  }
}
