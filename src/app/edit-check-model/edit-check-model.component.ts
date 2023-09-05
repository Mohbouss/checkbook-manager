import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CheckModelService} from "../services/CheckModel.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccordionComponent} from "../accordion/accordion.component";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-edit-check-model',
  templateUrl: './edit-check-model.component.html',
  styleUrls: ['./edit-check-model.component.css']
})

export class EditCheckModelComponent implements OnInit {
checkData:any
checkEditForm:FormGroup
  ischecked :boolean
  color: ThemePalette = 'primary'
  checked = false;
  disabled = false;

  constructor(private formBuilder:FormBuilder,private chequeService:CheckModelService ,
              @Inject(MAT_DIALOG_DATA) data: any,
              private dialogRef:MatDialogRef<EditCheckModelComponent>) {
    this.checkData=data.rows
  }
  ngOnInit(): void {
    this.checkEditForm = this.formBuilder.group({
      checkNumber: [this.checkData.checkNumber, Validators.required],
      Amount: [this.checkData.amount, Validators.required],
      isSender : [this.checkData.isSender,Validators.required],
      PayDate: [this.checkData.payDate, Validators.required],
      creationDate: [this.checkData.payDate, Validators.required],
      Supplier: [this.checkData.supplier, Validators.required],
      Notes: [this.checkData.notes],
    });

    // this.checkEditForm.patchValue({
    //   checkNumber: this.checkData.checkNumber,   // Assuming your book object has a 'bank' property
    //   // Start: this.selectedBook.start, // Assuming your book object has a 'start' property
    //   // End: this.selectedBook.end,     // Assuming your book object has an 'end' property
    //   // Color: this.selectedBook.color, // Assuming your book object has a 'color' property
    // });
  }

  editCheck(): void {
    if (this.checkEditForm.valid) {
      const formData = this.checkEditForm.value;

      const check = {
        id: this.checkData.id,
        CheckNumber: formData.checkNumber,
        Amount: formData.Amount,
        Paid : this.checkData.paid,
        BookId: this.checkData.bookId,
        IsSender : this.ischecked,
        PayDate: formData.PayDate,
        Supplier: formData.Supplier,
        Notes: formData.Notes,
        color: this.checkData.color,

      };
      this.dialogRef.close( check );
    }
  }


  closeDialog(): void {
        this.dialogRef.close(); // Close the dialog without any data

  }
  onChange(event:any){
    this.ischecked=event.checked
  }

}
