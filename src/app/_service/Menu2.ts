
export  interface  UserViewModel {
  test: string;
  cartabl: CartablViewModel;
  form: FormViewModel[];
  Department: depview[];
}

export  interface   CartablViewModel {
  UserName: string;
}
export  interface  FormViewModel {
  FormName: string;
}
export  interface depview {
  deptName: string;
}
