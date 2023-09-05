
export interface CheckEntry {
  Id: number;
  CheckNumber:number;
  Amount:number;
  IsSender:boolean;
  Supplier:string;
  CreationDate: Date;
  PayDate:Date;
  paid:boolean;
  Notes:string;
  bookId:number;

}
export interface CheckBookEntry{
  Bank:string
  Start:number
  End:number
  Color:string
}
export const CheckBook :CheckBookEntry[]=[

]
