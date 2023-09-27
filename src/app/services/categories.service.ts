import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {map, Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  collectionName = 'categories';

  constructor(private fs: AngularFirestore, private toastr: ToastrService) { }

  add(data: any) {
    this.fs.collection(this.collectionName).add(data).then(value => {
      console.log(data)
      this.toastr.success('Data Inserted Successfully!')
    }).catch(reason => {
      console.log(reason)
    });
  }

  getAll(){
    return this.fs.collection(this.collectionName).snapshotChanges().pipe(
        map(categories => {
          return categories.map(category => {
            const data = category.payload.doc.data();
            const id = category.payload.doc.id;
            return {id, data};
          })
        })
    )
  }

  edit (id: string, editData: any) {
    this.fs.collection(this.collectionName).doc(id).update(editData).then(value => {
      this.toastr.success('Category Updated Successfully ..!');
    });
  }

  delete(id: string) {
    // this.fs.collection(this.collectionName).doc(id).delete().then(value => {
    //   this.toastr.success('Category Deleted Successfully ..!')
    // });

    this.fs.doc(`${this.collectionName}/${id}`).delete().then(value => {
      this.toastr.success('Category Deleted Successfully ..!')
    });
  }
}
