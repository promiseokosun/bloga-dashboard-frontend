import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  postPermalink: string = '';
  imgSrc: any = './assets/images/image-placeholder.jpg';
  selectedImage: any = '';

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
}
