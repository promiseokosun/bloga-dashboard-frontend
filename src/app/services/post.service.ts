import { Injectable } from '@angular/core';
import {Post} from "../models/post";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {map} from "rxjs";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  collectionName: string = 'posts';
  constructor(private fs: AngularFirestore, private toastr: ToastrService, private storage: AngularFireStorage) { }

  add(postData: Post) {
    this.fs.collection(this.collectionName).add(postData).then(value => {
      this.toastr.success('Post Added Successfully ..!')
    })
  }

  uploadImageAndCreatePost(selectedImgPath: string, postData: Post) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImgPath).then(a => {
      console.log("Post image uploaded successfully");
      this.storage.ref(filePath).getDownloadURL().subscribe(url => {
        console.log(url);
        postData.postImgPath = url;
        this.add(postData);
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

}
