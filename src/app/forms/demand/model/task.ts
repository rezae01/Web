export class AdjacentBranch {
    AuthorizationNum?: string;
    AuthorizationIssueDate?: string;
    AuthorizationExpDate?: string;
    AuthorizationIssuer?: string;
    AuthorizationType?: string;
    LetterNum?: string;
    NationalCode?: string;
    Phase?: number;
    Amper?: number;
    DocumentType?: number;
    constructor(
        AuthorizationNum?: string,
        AuthorizationIssueDate?: string,
        AuthorizationExpDate?: string,
        AuthorizationIssuer?: string,
        AuthorizationType?: string,
        LetterNum?: string,
        NationalCode?: string,
        Phase?: number,
        Amper?: number,
        DocumentType?: number,
    ) {
        this.AuthorizationNum =  AuthorizationNum;
        this.AuthorizationIssueDate = AuthorizationIssueDate ;
        this.AuthorizationExpDate = AuthorizationExpDate ;
        this.AuthorizationIssuer = AuthorizationIssuer ;
        this.AuthorizationType =  AuthorizationType;
        this.LetterNum =  LetterNum;
        this.NationalCode = NationalCode ;
        this.Phase = Phase ;
        this.Amper = Amper ;
        this.DocumentType = DocumentType;
    }
}
export class CalculationData {
    id2?: number;
    TrfType?: number;
    Phs?: number;
    TrfHCode?: number;
    Count?: number;
    PwrIcn?: number;
    PwrCnt?: number;
    VoltCode?: number;
    Amp?: number;
    FmlCode?: number;
    constructor(
        id2?: number,
        TrfType?: number,
        Phs?: number,
        TrfHCode?: number,
        Count?: number,
        PwrIcn?: number,
        PwrCnt?: number,
        VoltCode?: number,
        Amp?: number,
        FmlCode?: number,
    ) {
        this.id2 = id2;
        this.TrfType = TrfType;
        this.Phs = Phs;
        this.TrfHCode = TrfHCode;
        this.Count = Count;
        this.PwrIcn = PwrIcn;
        this.PwrCnt = PwrCnt;
        this.VoltCode = VoltCode;
        this.Amp = Amp;
        this.FmlCode = FmlCode;
      }
}
export class Task {
    id: number;
    RequesterId: number;
    FormId: number;
    ProcessId: number;
    CalculationDatas?: CalculationData[] = [];
    AdjacentBranch?: {

    };
    constructor(
        id: number,
        RequesterId: number,
        FormId: number,
        ProcessId: number,
        CalculationDatas: CalculationData[] = [],
        AdjacentBranch?: {
            AuthorizationNum?: string;
            AuthorizationIssueDate?: string;
            AuthorizationExpDate?: string;
            AuthorizationIssuer?: string;
            AuthorizationType?: string;
            LetterNum?: string;
            NationalCode?: string;
            Phase?: number;
            Amper?: number;
            DocumentType?: number;
        },
    ) {
        this.id = id;
        this.RequesterId = RequesterId;
        this.FormId = FormId;
        this.ProcessId = ProcessId;
        this.AdjacentBranch = {};
        this.CalculationDatas = [];
    }
}
