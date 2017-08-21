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
