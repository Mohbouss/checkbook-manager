import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AddCheckModalComponent} from "../add-check-modal/add-check-modal.component";
import {CheckModelService} from "../services/CheckModel.service";
import {CheckEntry} from "../services/user";
import {AddCheckBookModalComponent} from "../add-check-book-modal/add-check-book-modal.component";
import {BookModelService} from "../services/BookModel.service";
import {EditCheckBookModalComponent} from "../edit-check-book-modal/edit-check-book-modal.component";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.css']
})
export class CheckbookComponent implements OnInit {
  isEdit: boolean
  checkData: any
  CheckBookData: any
  checksData: any
  mainPaid: number = 0
  mainUnPaid: number = 0


  constructor(private dialog: MatDialog, private checkModelService: CheckModelService, private checkbookService: BookModelService,
              private toastr: ToastrService       ) {
  }

  ngOnInit(): void {
    this.checkbookService.GetAllBooks().subscribe({
      next: (x: any) => {
        this.CheckBookData = x
      }
    })


    this.GetCheck()
  }


  GetCheck() {
    this.checkModelService.getChecks().subscribe({
      next: (x:any) => {
        this.checksData = x
        for (let i of x) {
          if (i.paid === true) {
            this.mainPaid += i.amount
          } else {
            this.mainUnPaid += i.amount
          }
        }
      }
    })
  }




  openDialog(): void {
    let dialogRef = this.dialog.open(AddCheckModalComponent, {
      width: '600px',
      data: {
        rows: {
          checkNumber: null,
          Amount: null,
          CreationDate: '',
          PayDate: '',
          Supplier: '',
          Notes: ''

        },
      }

    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.checkModelService.addCheck(result).subscribe({
          next: (x: any) => {
            this.toastr.success("Le chèque   ajouté avec succès","Succés",{timeOut: 3000})
            //set delay
            setTimeout(() => {
              window.location.reload()
            }, 3000);
          },
            error: (err: any) => {
             if (err.status===500)
              {
                const errorMessage: string = err.error;
                const startIdx = errorMessage.indexOf(': ') + 2;
                const endIdx = errorMessage.indexOf('\r\n');
                const extractedErrorMessage = errorMessage.slice(startIdx, endIdx);
                this.toastr.error(extractedErrorMessage, "Error", {timeOut: 3000})
              }
             else if(err.status===400){
               this.toastr.error("Entrée invalide. Veuillez vérifier vos saisies et réessayer.", "Error", {timeOut: 3000})
             }

            }

        }

        )
        // Handle any response data if needed
      } else {
        console.log('Dialog closed without any data.');
      }
    });
  }

  openBookDialog(): void {
    let dialogRef = this.dialog.open(AddCheckBookModalComponent, {
      width: '600px',
      data: {
        rows: {
          BookID: 0,
          Bank: '',
          Start: 0,
          End: 0,
          Color: ''
        },
      }

    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.checkbookService.AddBook(result.data).subscribe({
            next: (x: any) => {
              if (x) {
                this.toastr.success("Carnet Ajoutée avec Succés","Succés",{timeOut: 3000})
                setTimeout(() => {
                  window.location.reload()
                }, 3000);
              }

            },
            error: (err: any) => {
              const errorMessage: string = err.error;
              const startIdx = errorMessage.indexOf(': ') + 2;
              const endIdx = errorMessage.indexOf('\r\n');
              const extractedErrorMessage = errorMessage.slice(startIdx, endIdx);
              if (extractedErrorMessage === "The book overlaps with an existing book"){
                this.toastr.error('Le Carnet chevauche un Carnet existant',"Error",{timeOut: 3000})
              }
              else{
                this.toastr.error(extractedErrorMessage,"Error",{timeOut: 3000})
              }
            }
          }
        )}

       else {
         console.log('Dialog closed without any data.');
       }
    });

  }
  openEditDialog(): void {
    let dialogRef = this.dialog.open(EditCheckBookModalComponent, {
      width: '600px',

      data: {
        rows: {
          Bank: "",
          Start: "",
          End: "",
          Color: "",
        },
      }

    })
    dialogRef.afterClosed().subscribe((result) => {
        if (result) {

          this.checkbookService.editBook(result).subscribe({
            next: (x: any) => {
              this.toastr.success(" Carnet modifié avec succès","Success",{timeOut: 3000})
              setTimeout(() => {
                window.location.reload()
              }, 3000);

            },
            error: (err: any) => {
              console.log(err)

            }
          })
        }
      }
    )
  }



  }
