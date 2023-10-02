import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { ToastrModule } from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AllPostComponent } from './posts/all-post/all-post.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {NgOptimizedImage} from "@angular/common";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostComponent,
    PostFormComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({closeButton: true}),
        AngularEditorModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        NgOptimizedImage,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
