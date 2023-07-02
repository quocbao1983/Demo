export interface KhachhangVttech {
  id : String
  CustID : number
  Name : String
  Phone1 : String
  DocCode: String
  CustOld: String
  CustCode: String
  Created: string
  Target: String
  TargetInTime: String
  Revenue: String
  RevenueInTime: String
  IsNew: String
  SourceName :String
  GroupName: String
}
export interface User {
  id?: string;
  Hoten?: string;
  SDT?: string;
  email?: string;
  Name?:string;
  password?: string;
  profile?: string;
  Role?:string;
  Phanquyen?:any;
  Menu?:any;
  Sapxep?:number
  Trangthai?:number
  Status?:boolean
  Ghichu?:string
  idTao?:string
  Ngaytao?:Date
}
export interface Profile {
  id:string
  idUser:string
  idCongty:any[]
  idKhoi:any[]
  idPhongban:any[]
  idBophan:any[]
  idVitri:any[]
  Sapxep:number
  Trangthai:number
  Ghichu:string
  idTao:string
  Ngaytao:Date
}
export interface Congty {
  id:string
  Tiedue:string
  Mota:string
  idKhoi:any[]
  Sapxep:number
  Trangthai:number
  Ghichu:string
  idTao:string
  Ngaytao:Date
}

export interface ConfigForm {
  id?:string
  Tieude?:string
  Mota?:string
  Sapxep?:number
  Trangthai?:number
  Ghichu?:string
  idTao?:string
  Ngaytao?:Date
}
export interface FormField {
  id?:string
  idFrom?:string
  Tieude?:string
  icon?:string
  type?:string
  width?:string
  Sapxep?:number
  Trangthai?:number
  Ghichu?:string
  idTao?:string
  Ngaytao?:Date
}
export interface ListPhanQuyen {
    id?:string,
    idPhanquyen?: string,
    Module?: string,
    Macode?: string,
    Mota?: string,
    Sapxep?: number,
    Trangthai?: boolean,
    Ghichu?: string,
    idTao?: string,
    Ngaytao?: Date
}
export interface Phanquyen {
    id?:string,
    CanView?: boolean,
    CanCreate?: boolean,
    CanEdit?: boolean,
    CanDelete?: boolean,
    Sapxep?: number,
    Trangthai?: boolean,
    Ghichu?: string,
    idTao?: string,
    Ngaytao?: Date,
    User?: any,
    Listphanquyen?: any
}
export const TTDonhang =
[
  {id:1,Tieude:"Đơn Mới"},
  {id:2,Tieude:"Đã Gửi Hàng"},
  {id:3,Tieude:"Đã Nhận"},
  {id:4,Tieude:"Hủy Đơn"},
]
