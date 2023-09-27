import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private fs: AngularFirestore) {
  }
  ngOnInit(): void {
  }
  onSubmit(formData: any) {
    let categoryData = {
      category: formData.value.category
    }

    let collectionReference = this.fs.collection('categories').add(categoryData)
        .then(value => {
          console.log(value);
        })
        .catch(reason => {
          console.log(reason)
        })
  }


}
