import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit{
  faqList : Array<any> = []
  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.apiService.getFAQs().subscribe((data: any) => {
      this.faqList = data;
    })
  }


}
