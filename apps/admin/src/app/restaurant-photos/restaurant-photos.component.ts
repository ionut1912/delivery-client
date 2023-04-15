import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../../../../libs/shared/services/RestaurantService';
import { PhotosForRestaurantsService } from '../../../../../libs/shared/services/PhotosForRestaurantsService';

@Component({
  selector: 'delivery-client-restaurant-photos',
  templateUrl: './restaurant-photos.component.html',
  styleUrls: ['./restaurant-photos.component.scss'],
})
export class RestaurantPhotosComponent implements OnInit {
  restaurantImages: string[] = [];
  buttonText: string = '';
  constructor(
    private router: ActivatedRoute,
    private restaurantService: RestaurantService,
    private photoForRestaurantService: PhotosForRestaurantsService
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.restaurantService.getRestaurantById(id).subscribe((restaurant) => {
        this.restaurantImages = restaurant.restaurantPhotos.map((x) => x.url);
        this.buttonText =
          this.restaurantImages.length > 0 ? 'Add another photo' : 'Add photo';
      });
    });
  }

  openFile() {
    const inputElement = document.querySelector('input');
    if (inputElement) {
      inputElement.click();
    }
  }

  handle($event: any) {
    const eventTarget = $event.target;
    if (eventTarget != null) {
      const file: File = eventTarget.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.router.params.subscribe((params) => {
        const id = params['id'];
        this.photoForRestaurantService.addPhotoForRestaurant(id, formData);
      });
    }
  }
}
