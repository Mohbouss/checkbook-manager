import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ToastrModule} from "ngx-toastr"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckbookComponent } from './checkbook/checkbook.component';
import { AddCheckModalComponent } from './add-check-modal/add-check-modal.component';
import { AddCheckBookModalComponent } from './add-check-book-modal/add-check-book-modal.component';
import { AccordionComponent } from './accordion/accordion.component';
import {MaterialModule} from "./material/material.module";
import {CheckModelService, } from "./services/CheckModel.service";
import {HttpClientModule} from "@angular/common/http";
import { EditCheckBookModalComponent } from './edit-check-book-modal/edit-check-book-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookModelService} from "./services/BookModel.service";
import { EditCheckModelComponent } from './edit-check-model/edit-check-model.component';
@NgModule({
  declarations: [
    AppComponent,
    CheckbookComponent,
    AddCheckModalComponent,
    AddCheckBookModalComponent,
    AccordionComponent,
    EditCheckBookModalComponent,
    EditCheckModelComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [CheckModelService,BookModelService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
