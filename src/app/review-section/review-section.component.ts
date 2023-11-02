import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APINAME } from '../shared/shared.constant';
import { CommonApiCallingService } from '../shared/common-api-calling.service';

@Component({
  selector: 'app-review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})

export class ReviewSectionComponent implements OnInit {
  private apiURL = "https://salesapi.advanced-taxsolutions.com/reviews/createCrmActivityForReview";
  public reviewObj = { name: '', email: '', review: '' };
  public message: any;
  
  constructor(private http: HttpClient,private commonApiCallingService:CommonApiCallingService) { }

  public addReview() {
    this.commonApiCallingService.postURL(APINAME.Review,this.reviewObj).then((response:any) =>{
      this.message = response.data;
    });
  }

  ngOnInit(): void {}

}
