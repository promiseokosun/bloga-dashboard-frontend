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
      category: formData.value.category,
      status: "Active"
    }

    let subCategoryData = {
      subCat: 'subCatValue'
    }


    this.fs.collection('categories').add(categoryData)
        .then(value => {
          console.log(value);
          this.fs.collection('categories').doc(value.id).collection('subcategories').add(subCategoryData)
              .then(value1 => {
                console.log(value1)
              }).catch(reason => {
            console.log('Error saving subcategory: ' + reason)
          })
        })
        .catch(reason => {
          console.log(reason);
        });
  }


}
