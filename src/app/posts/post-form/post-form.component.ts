import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/post";
import {PostService} from "../../services/post.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  imgSrc: any = './assets/images/image-placeholder.jpg';
  selectedImage: any = '';
  categories: any[] = [];
  postForm: FormGroup;
  category: any;
  post: any;
  formType: string = 'Add';
  constructor(private categoriesService: CategoriesService,
              private fb: FormBuilder,
              private postService: PostService,
              private activatedRoute: ActivatedRoute
  ) {

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: [{value: '', disabled: true}],
      excerpt: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    })

    this.activatedRoute.queryParams.subscribe(value => {
      console.log(value);
      this.postService.get(value['id']).subscribe(post => {
        this.post = post;
        console.log(this.post)
        if(this.post) {
          this.imgSrc = this.post.postImgPath;
          this.formType = 'Edit';
        }
        this.postForm = this.fb.group({
          title: [this.post ? this.post.title : '', [Validators.required, Validators.minLength(10)]],
          permalink: [{value: this.post ? this.post.permalink : '', disabled: true}],
          excerpt: [this.post ? this.post.excerpt : '', [Validators.required, Validators.minLength(10)]],
          category: [this.post ? this.post.category.category : '', Validators.required],
          postImg: ['', Validators.required],
          content: [this.post ? this.post.content : '', Validators.required]
        })
      })
    })
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {    // console.log($event.target.value.replaceAll(" ", "-"));

    // this.postPermalink = $event.target.value.replaceAll(" ", "-");
    // call the setValue to simulate 2-way data binding for reactive form
    this.fc['permalink'].setValue($event.target.value.replaceAll(" ", "-"));
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

  onSubmit() {
    const postData: Post = {
      title: this.fc['title'].getRawValue(),
      permalink: this.fc['permalink'].getRawValue(),
      category: {
        categoryId: this.fc['category'].getRawValue().id,
        category: this.fc['category'].getRawValue().data.category
      },
      postImgPath: '',
      excerpt: this.fc['excerpt'].getRawValue(),
      content: this.fc['content'].getRawValue(),
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    console.log(postData);
    this.postService.uploadImageAndCreatePost(this.selectedImage, postData);
    this.postForm.reset();
    this.imgSrc = './assets/images/image-placeholder.jpg';
  }
}
