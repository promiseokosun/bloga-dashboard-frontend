import { Injectable } from '@angular/core';
import {Post} from "../models/post";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {map} from "rxjs";
import {Params, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  collectionName: string = 'posts';
  constructor(private fs: AngularFirestore, private toastr: ToastrService,
              private storage: AngularFireStorage, private router: Router) { }

  add(postData: Post) {
    this.fs.collection(this.collectionName).add(postData).then(value => {
      this.toastr.success('Post Added Successfully ..!')
    })
  }

  uploadImageAndSavePost(selectedImgPath: string, postData: Post, formType: string, editId: string) {
    const filePath = `postaImages/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImgPath).then(a => {
      console.log("Post image uploaded successfully");
      this.storage.ref(filePath).getDownloadURL().subscribe(url => {
        console.log(url);
        postData.postImgPath = url;
        console.log('moi-postData: ' + postData.category.category)
        if(formType == 'Add') {
          this.add(postData)
        } else {
          // this.edit(editId, postData);
          this.editImageAndPost(editId, postData, postData.postImgPath, selectedImgPath);
          this.router.navigate(['/posts']).then(r => console.log(r));
        }
      })
    })
  }

  getAll() {
    return this.fs.collection(this.collectionName).snapshotChanges().pipe(map(posts => {
      return posts.map(post => {
        const id = post.payload.doc.id;
        const data = post.payload.doc.data();
        return {id, data};
      })
    }));
  }

  get(id: string) {
    return this.fs.doc(`${this.collectionName}/${id}`).valueChanges();
  }

  edit(id: string, postData: Post) {
    this.fs.doc(`${this.collectionName}/${id}`).update(postData).then(() => {
     this.toastr.success('Post Updated Successfully ..!');
    })
  }

  editImageAndPost(id: string, postData: Post, postImgPath: string, selectedImgPath: string) {
    this.edit(id, postData);
  }

  delete(id: string) {
    this.fs.doc(`${this.collectionName}/${id}`).delete().then(() => {
      this.toastr.warning('Post Deleted Successfully ..!');
    })
  }

  deleteImageAndDeletePost(id: string, postImgPath: string) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      console.log(`Image deleted from storage: ${postImgPath}`)
      this.delete(id);
    })
  }

  markFeatured(id: string, featuredData: any) {
    this.fs.doc(`${this.collectionName}/${id}`).update(featuredData).then(() => {
      this.toastr.info('Feature Updated Successfully ..!');
    })
  }

}
