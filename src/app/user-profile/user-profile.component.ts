import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClickedUserService } from '../services/clickedUserService/clicked-user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  id: number | undefined;
  user: any;
  private sub: any;

  constructor(private route: ActivatedRoute, private clickedUserService: ClickedUserService) {
    console.log("User Profile Works!");
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
      this.clickedUserService.getUser(this.id).subscribe((response) => {
        this.user = response;
        console.log(this.user);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
