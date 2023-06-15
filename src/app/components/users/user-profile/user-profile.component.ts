import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClickedUserService } from '../../../services/clickedUserService/clicked-user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  id: number | undefined;
  user!: {
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
  };
  private sub: any;

  constructor(private route: ActivatedRoute, private clickedUserService: ClickedUserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
      this.clickedUserService.getUser(this.id).subscribe((response) => {
        this.user = response;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
