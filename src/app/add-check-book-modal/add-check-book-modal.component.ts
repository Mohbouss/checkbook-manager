import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CheckModelService} from "../services/CheckModel.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-check-book-modal',
  templateUrl: './add-check-book-modal.component.html',
  styleUrls: ['./add-check-book-modal.component.css']
})
export class AddCheckBookModalComponent implements OnInit {
  message: string;
  checkBookData:any
  BookForm:FormGroup
  constructor(private formBuilder:FormBuilder,private chequeService:CheckModelService ,
              @Inject(MAT_DIALOG_DATA) data:any,
              public dialogRef:MatDialogRef<AddCheckBookModalComponent>) {
    this.checkBookData=data.rows
  }


    ngOnInit(): void {
    this.BookForm = this.formBuilder.group({
      Bank: new FormControl(null, Validators.required),
      Start: new FormControl(null, Validators.required),
      End: new FormControl(null, [Validators.required]),
      Color: new FormControl('#000000', Validators.required)
        });
      }
  onStartKeyDown(event: KeyboardEvent) {
    // Get the pressed key using event.key or event.code
    const pressedKey = event.key || event.code;

    // Check if the pressed key is 'e', '+', or '-'
    if (pressedKey === 'e' || pressedKey === '+' || pressedKey === '-') {
      event.preventDefault(); // Prevent the default action (block the key)
    }
  }

  validateEnd(){
    const startValue = this.BookForm.value.Start;
    const endValue = this.BookForm.value.End;

    if (startValue !== null && endValue !== null && endValue > startValue) {
      return true ;
    }
    console.log("invalidEnd")
    this.message = 'End Date must be greater than Start Date';
    return false;
  }

  SaveBook() {
    if (this.BookForm.valid) {
      if (this.validateEnd()) {
      this.checkBookData.Bank = this.BookForm.value.Bank;
      this.checkBookData.Start = this.BookForm.value.Start;
      this.checkBookData.End = this.BookForm.value.End
      this.checkBookData.Color = this.BookForm.value.Color
        console.log("valid")
      // Close the dialog and pass the updated data and isEdit flag back to the parent component
      this.dialogRef.close({ data: this.checkBookData });
    }
  }
  }

  CloseDialog() {
    this.dialogRef.close(null);
  }


}
