import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {Category} from "../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: any[] = [];
  formCategory: string = "";
  formType = "Add";
  categoryId = "";
  constructor(private categoriesService: CategoriesService) {
  }
  ngOnInit(): void {
    this.categoriesService.getAll().subscribe(categories => {
      console.log(categories);
      this.categoryArray = categories;
    });
  }
  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    }

    if(this.formType === "Add") {
      this.categoriesService.add(categoryData);
    } else if(this.formType === "Edit") {
      this.categoriesService.edit(this.categoryId, categoryData);
      this.formType = "Add";
    }
    formData.reset();
  }


  onEdit(id: string, category: string) {
    this.formCategory = category;
    this.formType = "Edit";
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.categoriesService.delete(id);
  }
}
