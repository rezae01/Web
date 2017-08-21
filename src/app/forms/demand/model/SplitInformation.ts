export class SplitInformation {
    id = 1;
    PhoneNumber?: string;
    Address?: string;
    BranchSrl?: string;
    Phs?: string;
    Amp?: string;
    TrfCode?: string;
    PwrCnt?: string;
    BranchCode?: string;
    CityNameID?: string;
    RegionNameID?: string;
    FileNumber?: string;
    FullName?: string;
    VillageCode?: string;
    BranchCodeView?: string;
    constructor(
        id?: number,
        PhoneNumber?: string,
        Address?: string,
        BranchSrl?: string ,
        Phs?: string,
        Amp?: string,
        TrfCode?: string,
        PwrCnt?: string,
        BranchCode?: string,
        CityNameID?: string,
        RegionNameID?: string,
        FileNumber?: string,
        FullName?: string,
        VillageCode?: string,
        BranchCodeView?: string,
    ) {
        this.id = id;
        this.PhoneNumber = PhoneNumber;
        this.Address = Address;
        this.BranchSrl = BranchSrl;
        this.Phs = Phs;
        this.Amp = Amp;
        this.TrfCode = TrfCode;
        this.PwrCnt = PwrCnt;
        this.BranchCode = BranchCode;
        this.CityNameID = CityNameID;
        this.RegionNameID = RegionNameID;
        this.FileNumber = FileNumber;
        this.FullName = FullName;
        this.VillageCode = VillageCode;
        this.BranchCodeView = BranchCodeView;
    }
}