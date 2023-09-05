import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {find, Subscription} from "rxjs";
import {CheckEntry} from "../services/user";
import {MatPaginator} from "@angular/material/paginator";
import {CheckModelService} from "../services/CheckModel.service";
import {MatDialog} from "@angular/material/dialog";
import {EditCheckModelComponent} from "../edit-check-model/edit-check-model.component";
import {BookModelService} from "../services/BookModel.service";
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  //accordion component
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private chequeService: CheckModelService, private bookservice: BookModelService, public dialog: MatDialog,
              private toastr: ToastrService) {
  }

  months = [
    {id: 0, name: "Janvier"},
    {id: 1, name: "Février"},
    {id: 2, name: "Mars"},
    {id: 3, name: "Avril"},
    {id: 4, name: "Mai"},
    {id: 5, name: "Juin",},
    {id: 6, name: "Juillet"},
    {id: 7, name: "Août"},
    {id: 8, name: "Septembre"},
    {id: 9, name: "Octobre"},
    {id: 10, name: "Novembre"},
    {id: 11, name: "Décembre"}]
  //accordion component

  payed: number = 0
  unPayed: number = 0
//table component
  displayedColumns: string[] = ["pay", 'isSender', 'paydate', 'numero', "montant", "Observation", "fournisseur", "Options"]
  dataSources = [[], [], [], [], [], [], [], [], [], [], [], []]

  dataPayementState = [[this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
    [this.payed, this.unPayed],
  ]
  checksData: CheckEntry[] = [];
  isEdit: boolean
  bookData: any
  subscribe: Subscription
  color
  @Input() MonthIndex

  ngOnInit(): void {
    this.GetCheck()

  }

  GetCheck() {
    this.chequeService.getChecks().subscribe(
      (x: any) => {
        console.log("x", x)
        this.checksData = [...x]
        this.bookservice.GetAllBooks().subscribe(
          (y: any) => {
            this.bookData = y
            console.log(this.bookData)
            console.log(this.checksData)
            for (let i of this.checksData) {
              this.bookData.find((x: any) => {
                if (x.bookId == i.bookId) {
                  i["color"] = x.color
                }
              })
            }

          })

        this.functionGroupingByMonth(this.checksData)

      },
)
}

functionGroupingByMonth(data)
{

  for (let i of data) {

    const dateObject = new Date(i.payDate);
    const month = dateObject.getMonth();
    this.dataSources[month].push(i)
    ///useing the deep copy to avoid the change in the original array
    this.dataSources[month] = [...this.dataSources[month]];
  }
  for (let i = 0; i < this.dataSources.length; i++) {
    let payed = 0
    let notPayed = 0
    for (let data of this.dataSources[i]) {
      if (data.paid) {
        payed += data.amount
        this.dataPayementState[i][0] = payed

      } else {
        notPayed += data.amount

        this.dataPayementState[i][1] = notPayed
      }
    }

  }


}


//editCheck
editCheck(rows)
{
  let dialogRef = this.dialog.open(EditCheckModelComponent, {
    width: '600px',
    data: {
      rows: rows,
    }

  });
  dialogRef.afterClosed().subscribe(result => {

    const color = result.color;
    delete result.color; // Remove the "color" property
    if (result) {
      this.chequeService.updateCheck(result).subscribe({
        next: (x: any) => {
          x["color"] = color
          const dateObject = new Date(x.payDate);
          const month = dateObject.getMonth();
          const monthData = this.dataSources[month];
          const index = monthData.findIndex((item) => item.id === x.id);
          if (index !== -1) {
            monthData[index] = x;
            this.dataSources[month] = [...monthData];
          }

        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } else {
      console.log("this dialog is closed wihout data")
    }

  })
}

deleteCheck(row)
{

  if (confirm("Are you sure to delete this check ?")) {
    var checkId = row.id
    this.toastr.success("Chèque supprimée avec succès", "Succés", {timeOut: 3000})
    this.chequeService.deleteCheck(checkId).subscribe({
      next: (x: any) => {
        const dateObject = new Date(row.payDate);
        const month = dateObject.getMonth();
        this.deleteCheckFromView(month, row.id)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}


deleteCheckFromView(monthIndex
:
number, id
:
number
)
{
  const monthData = this.dataSources[monthIndex];
  const index = monthData.findIndex((item) => item.id === id);
  if (index !== -1) {
    monthData.splice(index, 1);
    this.dataSources[monthIndex] = [...monthData];
  }
}

checkPaid(row)
{
  row.paid = !row.paid
  this.chequeService.updateCheck(row).subscribe({
    next: (x: any) => {
    }
  })
}
}







