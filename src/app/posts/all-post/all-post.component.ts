import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {getAll} from "@angular/fire/remote-config";

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  allPosts: any[] = [];

  constructor(private postService: PostService) {
  }
  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
     return this.postService.getAll().subscribe(value => {
       this.allPosts = value;
     });
  }

  protected readonly Date = Date;

  onDelete(id: string, postImgPath: string) {
    if(window.confirm('Are you sure you want to delete this post?')) {
      this.postService.deleteImageAndDeletePost(id, postImgPath);
    }
  }

  onFeatured(id: string, isFeatured: boolean) {
    const featuredData = {
      isFeatured: isFeatured
    }
    this.postService.markFeatured(id, featuredData);
  }
}
