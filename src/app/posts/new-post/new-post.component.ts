import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  postPermalink: string = '';
  imgSrc: any = './assets/images/image-placeholder.jpg';
  selectedImage: any = '';
  categories: any[] = [];
  htmlContent: any = '';


  constructor(private categoriesService: CategoriesService) {
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  onTitleChanged($event: any) {
    // console.log($event.target.value.replaceAll(" ", "-"));
    this.postPermalink = $event.target.value.replaceAll(" ", "-");
  }

  showPreview($event: any) {
    let fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    }
    fileReader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  loadCategories() {
    this.categoriesService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

}
