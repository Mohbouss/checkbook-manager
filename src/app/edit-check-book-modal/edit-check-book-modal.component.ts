import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CheckModelService} from "../services/CheckModel.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddCheckBookModalComponent} from "../add-check-book-modal/add-check-book-modal.component";
import {BookModelService} from "../services/BookModel.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-edit-check-book-modal',
  templateUrl: './edit-check-book-modal.component.html',
  styleUrls: ['./edit-check-book-modal.component.css']
})
export class EditCheckBookModalComponent implements OnInit {

  updateBookData: any
  checkBookData: any
  Books: any
  defaultBankName: any
  selectedBook: any
  selectedId: number
  BookForm: FormGroup
  selectBox: boolean = false
  inputBox: boolean = true

  constructor(private formBuilder: FormBuilder, private chequeService: CheckModelService, private bookService: BookModelService,
              @Inject(MAT_DIALOG_DATA) data: any,
              public dialogRef: MatDialogRef<AddCheckBookModalComponent>, private toastr: ToastrService ) {
    this.checkBookData = data.rows
    this.defaultBankName=this.checkBookData.Bank
  }


  ngOnInit(): void {
    this.bookService.GetAllBooks().subscribe(result => {
      this.Books = result


    })
    this.BookForm = this.formBuilder.group({
      Bank: new FormControl("", Validators.required),
      Start: new FormControl("", Validators.required),
      End: new FormControl("", Validators.required),
      Color: new FormControl("#000000", Validators.required)

    });

  }

  onBookSelected(event: any) {
    this.selectedBook = event.value;
   this.selectedId=this.selectedBook.bookId

    this.BookForm.patchValue({
      Bank: this.selectedBook.bank,   // Assuming your book object has a 'bank' property
      Start: this.selectedBook.start, // Assuming your book object has a 'start' property
      End: this.selectedBook.end,     // Assuming your book object has an 'end' property
      Color: this.selectedBook.color, // Assuming your book object has a 'color' property
    });
  }

deleteBook(){

  this.bookService.deleteBook(this.selectedId).subscribe({
    next: (x: any) => {
      this.dialogRef.close(null);
      this.toastr.success('Carnet Supprimé avec succés', 'Succés', {timeOut: 3000});
    },
    error: (err) => {
      console.log(err);
      if (err.status===500)
      {
        const errorMessage: string = err.error;
        const startIdx = errorMessage.indexOf(": ") + 3;
        const endIdx = errorMessage.indexOf('\r\n')-1;
        const extractedErrorMessage = errorMessage.slice(startIdx, endIdx);
        this.toastr.error(extractedErrorMessage, "Error", {timeOut: 3000})
      }
      else if (err.status===400)
      {
        this.toastr.error("Vous n'avez sélectionné aucun carnet à supprimer.", "Error", {timeOut: 3000})
      }
    }
  });
}



  UpdateBook() {
    if (this.BookForm.valid) {
      this.updateBookData = {
        Bank: this.BookForm.value.Bank,
        BookId: this.selectedId,
        Start: this.BookForm.value.Start,
        End: this.BookForm.value.End,
        Color: this.BookForm.value.Color
      };
      // Close the dialog and pass the updated data and isEdit flag back to the parent component
      this.dialogRef.close(this.updateBookData);
    }
  }

  closeDialog(){

    this.dialogRef.close(null);
  }



}
