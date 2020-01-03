import { Component, OnInit } from '@angular/core';
import { BeersService } from '../sdk/custom/beers.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.page.html',
  styleUrls: ['./moviedetails.page.scss'],
})
export class MoviedetailsPage implements OnInit {
  information = null;
  loading = true;
  constructor(private activatedRoute: ActivatedRoute, private movieService: BeersService) { this.backbutton(); }
  backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
  });
  }
  ngOnInit() {
    // Get the ID that was passed with the URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // Get the information from the API
    this.movieService.getDetails(id).subscribe(result => {
      this.information = result;
      this.loading = false;
    });
  }
}
