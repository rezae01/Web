import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { MenuItems } from '../shared/menu-items/menu-items';
import {UserViewModel} from './Menu2';
import {Observable} from 'rxjs';
import {post} from './post';
import {json} from "ng2-validation/dist/json";
import {any} from "codelyzer/util/function";

@Injectable()
export class UserService {
list: any;
public  Url_app: string;
  constructor(private http: Http) {
  this.Url_app='http://localhost:1920';
 }

Crtableuser(): Observable <post[]> {
  return this.http.get(this.Url_app + '/api/Caretable/CartableUser', this.jwt()).map(res => res.json());
}
 UserId(): Observable<any>{
    return this.http.get(this.Url_app + '/api/Public/GetLoginUserId', this.jwt()).map(res => res.json());
 }
//--------------------------
// \\tfsserver\FileServer\Common\Web
  //----------------------- requst for form component form real
  Saverequst(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/Billing/RegisterRealRequester', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  //---------------------------------------- requst for form component form legal
  SaverequstLegal(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/Billing/RegisterLegalRequester', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  //---------------------------------------- requst for form component from new demand
  SaverequstNewDemand(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/Billing/RegisterBranchInFirstStep', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }

// ---------------------------------------------------  تفکیک
  Integration(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/IntegrationandSeparation/SeparationRequest', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  Separation(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/IntegrationandSeparation/SeparationRequest', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  //---------------------------------------- name file 
    // sendNameFile1(data): Observable<any[]> {
    //   let reza = JSON.parse(localStorage.getItem('currentUser'));
    //   // alert(JSON.stringify(data));
    //   // console.log(JSON.stringify(data));
    //   let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    //   headers.append("Content-Type", 'application/json');
    //   let options = new RequestOptions({ headers: headers });
    //   return this.http.post( this.Url_app +'/api/Public/UploadFile', JSON.stringify(data) , options).map(
    //   (res: Response) => res.json() || {}
    //   );
    // }
  //------------------------------------------
  SendNameFile(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app +'/api/Billing/ChangeRequstBranchDetail', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  //---------------------------------------- gridCoulumens
  GETgridculomens(data: any): Observable<any[]>{
    return this.http.get(this.Url_app + '/api/Caretable/GridCoulumens?listid=' + localStorage.getItem('getitem') + '&userid=' + localStorage.getItem('userId'), this.jwt()).map(res => res.json());
  }
  //----------------------------------------gridCoulumens in gird
  GETgridculomensGrid(data: any): Observable<any[]>{
    return this.http.get(this.Url_app + '/api/Caretable/GridData?listid='+ 600 + '&userid=' + localStorage.getItem('userId'), this.jwt()).map(res => res.json());
  }

  getImageSend(): Observable<any[]>{
    // return null
    // return this.http.get(this.Url_app + 'api/Public/GetUploadFile?BranchCode='+ data, this.jwt()).map(res => res.json());
    return this.http.get(this.Url_app + '/api/Public/GetUploadFile?BranchCode=1', this.jwt()).map(res => res.json());
  }

  //----------------------------------------  سازمان صادر کننده
  GetParameter(): Observable<any[]>{
    return this.http.get(this.Url_app + '/api/Billing/GetParameter?maincode=1129', this.jwt()).map(res => res.json());
  }
  GetParameterTwo(): Observable<any[]>{
    return this.http.get(this.Url_app + '/api/Billing/GetParameter?maincode=1071', this.jwt()).map(res => res.json());
  }
  //---------------------------------------- for upload file
  // upload(fileToUpload: any) {//fileToUpload: any
  //   alert("wsws");
  //   let input = new FormData();
  //   input.append("file" , fileToUpload);
  //   return this.http.post(this.Url_app + "/api/Public/UploadFile", input , this.jwt()).map(res => res.json());
  // }


//    postFileUpLoad(url: string, data: any): any {
//       let mk = JSON.parse(localStorage.getItem('currentUser'));
//     let headers = new Headers();
//     alert('11')
//     if (localStorage.getItem('currentUser') != null) {
//       alert('if')
//         headers.append('Content-Type', 'multipart/form-data')
//         headers.append('Authorization', "Bearer " + mk.access_token);
//     }
//     // this.slimLoadingBarService.startLoading();
//     return this.http.post(url, data, {
//         headers: headers
//     }).map(res=>res.json());
        
//         // .then(this.extractData)
//         // .catch(this.handleError);
// }
  //----------------------------------------   for power shift
  SaveRequstPowerShiftRes(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/Billing/ChangeRequstBranchDetail', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  //--------------------------------------- for address
  SaveRequstAdressRes(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app +'/api/Billing/InsertAddressToTemp', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  //--------------------------------------- submit end
  SaveSubmit(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app +'/api/Billing/FinalRegisterRequest', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  //--------------------------------------- for change Owner
  SaveRequstOwner(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    // alert(JSON.stringify(data));
    // console.log(JSON.stringify(data));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app +'/api/Billing/ChangeRequstBranchDetail', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }

  //--------------------------------------- for change tariff
  SaveRequstTariff(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/Billing/ChangeRequstBranchDetail', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  //--------------------------------------- for submit license
  SaveRequstSubmitLicense(data): Observable<any[]> {
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/Billing/RequestRegisterAuthorize', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }

  //--------------------------------------- Response For City
  getcity(): Observable<any[]> {
    return this.http.get(this.Url_app + '/api/Billing/GetRegion', this.jwt()).map(res => res.json());
  }
  getcitylvl2(data): Observable<any[]> {
    return this.http.get(this.Url_app + '/api/billing/GetCity?regionId=' + data, this.jwt()).map(res => res.json());
  }

  //--------------------------- paramter 
  paramter(data): Observable<any[]> {
    return this.http.get(this.Url_app + '/api/Billing/GetRequesterDetail?RequesterId=' + data, this.jwt()).map(res => res.json());
  }
  paramterBeranchRequst(Beranch,Requst): Observable<any[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.Url_app + '/api/Billing/GetRequesterDetail?RequestId=' + Requst + '&BeranchCode=' + Beranch , this.jwt()).map(res => res.json());
  }


  // getImages(Beranch: any, Requst: any) {
  //    let reza = JSON.parse(localStorage.getItem('currentUser'));
  //   // alert(JSON.stringify(data));
  //   // console.log(JSON.stringify(data));
  //   let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
  //     let input = new FormData();
  //     // input.append('file', fileToUpload);
  //     // // input.append('IefileName',this.TypeFileUpload);
  //     // input.append('TypeFileUpload', md);
  //     // input.append('BranchCode', md);
  //     // input.append('RequestId', md);
  //     //کوشیار جا ن الان این دوتا داخل ویو مدل هم میان به جای این مقادیر سلکت بزار و مقاذیرشو بفرست

  //     // return this.http.post('http://localhost:1920/api/Public/UploadFile', input);
  //     return this.http.post( this.Url_app +'/api/Public/UploadFile', JSON.stringify(data) , options).map(
  //    (res: Response) => res.json() || {}
  //   );
      
  //   }
  //
  paramterBeranchCode(data): Observable<any[]> {
    return this.http.get(this.Url_app + '/api/IntegrationandSeparation/GetBranchDetailsForSepration?BranchCode=' + data, this.jwt()).map(res => res.json());
  }
  //--------------------------- Response for Phs Amp Pwr Tariff 
  Trf(): Observable<any[]> {
    return this.http.get(this.Url_app + '/api/Calculation/ValidTrfType', this.jwt()).map(res => res.json());
  }
  Phs(TrfType): Observable<any[]> {
    return this.http.get(this.Url_app + '/api/Calculation/ValidPhs?TrfType=' + TrfType , this.jwt()).map(res => res.json());
  }
  Amp(TrfType, Phase): Observable<any[]> {
    return this.http.get(this.Url_app +'/api/Calculation/ValidAmper?TrfType=' + TrfType + '&Phase=' + Phase , this.jwt()).map(res => res.json());
  }
  // PwrCnt(TrfType ,Phase, Amper): Observable<any[]> {
  //   return this.http.get(this.Url_app +'/api/Calculation/ValidPwrCnt' + TrfType + '&TrfType' + Phase + '&Phase' + Amper  , this.jwt()).map(res => res.json());
  // }
  // PwrIcn(TrfType ,Phase ,Amper , powercnt): Observable<any[]> {
  //   return this.http.get(this.Url_app +'/api/Calculation/ValidPwrIcn' + TrfType +'&TrfType' + Phase + '&Phase' + Amper + '&Amper' + powercnt + '&powercnt', this.jwt()).map(res => res.json());
  // }
  // TariffCode(TrfType, Phase, Amper, powercnt, powerIcn): Observable<any[]> {
  //   return this.http.get(this.Url_app +'/api/Calculation/ValidTrfhcode' + TrfType + '&TrfType' + Phase + '&Phase' + Amper + '&Amper' + powercnt + '&powercnt' + powerIcn + '&powerIcn' , this.jwt()).map(res => res.json());
  // }
  // TariffHCode(TrfType, Phase, Amper, powercnt, powerIcn, Trfhcode): Observable<any[]> {
  //   return this.http.get(this.Url_app +'/api/Calculation/ValidTrfcode' + TrfType + '&TrfType' + Phase + '&Phase' + Amper + 'Amper' + powercnt + '&powercnt' + powerIcn + '&powerIcn' + Trfhcode + '&Trfhcode' , this.jwt()).map(res => res.json());
  // }
  //--------------------------- Response For Serach nationalCode && Response for serach Economic 
  serachByNationalCode(data): Observable<any>{
    return this.http.get(this.Url_app +'/api/Billing/GetRegisteredByNatCode?natcode='+ data, this.jwt()).map(res => res.json());
  }
  serachGetRegisteredByEconomic(data): Observable<any>{
    return this.http.get(this.Url_app +'/api/Billing/GetRegisteredByEconomic?economic='+ data, this.jwt()).map(res => res.json());
  }
  // serachByPass(data): Observable<any>{
  //   return this.http.get(this.Url_app +'/api/Billing/GetIdentityByBranchcode?branchcode='+ data, this.jwt()).map(res => res.json());
  // }
  // serachByBillId(data): Observable<any>{
  //   return this.http.get(this.Url_app +'/api/Billing/GetIdentityByBranchcode?branchcode='+ data, this.jwt()).map(res => res.json());
  // }
  CalculationSepration(data): Observable<any>{
    let reza = JSON.parse(localStorage.getItem('currentUser'));
    // alert(JSON.stringify(data));
    // console.log(JSON.stringify(data));
    let headers = new Headers({ 'Authorization': 'Bearer ' + reza.access_token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post( this.Url_app + '/api/IntegrationandSeparation/CalculationSepration', JSON.stringify(data) , options).map(
     (res: Response) => res.json() || {}
    );
  }
  serachByIntegrationSeparation(data): Observable<any>{
    return this.http.get(this.Url_app + '/api/IntegrationandSeparation/GetBranchDetails?BranchCode='+ data, this.jwt()).map(res => res.json());
  }


  serachByPassPwr(data): Observable<any> {
    return this.http.get(this.Url_app + '/api/Billing/GetPwr?branchCode=' + data + '&FormName=1', this.jwt()).map(res => res.json());
  }
  serachByPassTariff(data): Observable<any> {
    return this.http.get(this.Url_app + '/api/Billing/GetPwr?branchCode=' + data + '&FormName=2' ,this.jwt()).map(res => res.json());
  }
  serachByPassOwner(data): Observable<any> {
    return this.http.get(this.Url_app + '/api/Billing/GetPwr?branchCode=' + data + '&FormName=3', this.jwt()).map(res => res.json());
  }
  serachByPassBecome(data): Observable<any> {
    return this.http.get(this.Url_app + '/api/Billing/GetPwr?branchCode=' + data + '&FormName=4', this.jwt()).map(res => res.json());
  }
  serachByPassExisting(data): Observable<any> {
    return this.http.get(this.Url_app + '/api/Billing/GetPwr?branchCode=' + data + '&FormName=5', this.jwt()).map(res => res.json());
  }
  //------------------------ Response for change tariff
  // serachByPassChangeTariff(data): Observable<any>{
  //   return this.http.get(this.Url_app +'/api/Billing/GetPwr?branchCode='+ data, this.jwt()).map(res => res.json());
  // }
  //------------------------ Response For Serach BecomePaermanent
  // serachGetRegisteredByBecomePaermanent(data): Observable<any>{
  //   return this.http.get(this.Url_app +'/api/Billing/'+data, this.jwt()).map(res => res.json());
  // }
  //------------------------ Sevice For Serach
  
  //------------------------
  private jwt() {
    // create authorization header with jwt token
   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.access_token });
      return new RequestOptions({ headers: headers });
    }
  }
}
