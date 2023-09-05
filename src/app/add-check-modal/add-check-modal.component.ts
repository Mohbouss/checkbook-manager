import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import {CheckModelService} from "../services/CheckModel.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatDialog,MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ThemePalette} from "@angular/material/core";


@Component({
  selector: 'app-add-check-modal',
  templateUrl: './add-check-modal.component.html',
  styleUrls: ['./add-check-modal.component.css']
})
export class AddCheckModalComponent implements OnInit {
 checkForm:FormGroup
   constructor(private formBuilder:FormBuilder,private chequeService:CheckModelService ,
               private dialogRef:MatDialogRef<AddCheckModalComponent>) { }
ischecked :boolean
  color: ThemePalette = 'primary'
  checked = false;
  disabled = false;
  ngOnInit(): void {
    this.checkForm = this.formBuilder.group({
      checkNumber: ['', Validators.required],
      Amount: ['', Validators.required],
      PayDate: ['', Validators.required],
      Supplier: ['', Validators.required],
      Notes: [''],
    });
  }

  addCheck(): void {
    if (this.checkForm.valid) {
      const formData = this.checkForm.value;

    const check = {
        CheckNumber: formData.checkNumber,
        Amount: formData.Amount,
        PayDate: formData.PayDate,
        Paid : false,
        IsSender : this.ischecked,
        Supplier: formData.Supplier,
        Notes: formData.Notes,

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
