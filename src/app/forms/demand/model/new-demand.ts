export class CalculationData {
    id?: number;
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
        id?: number,
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
        this.id = id;
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
export class NewDemand {
    id: number;
    RequesterId: number;
    FormId: number;
    ProcessId: number;
    CalculationDatas?: CalculationData[] = [];
    constructor(
        id: number,
        RequesterId: number,
        FormId: number,
        ProcessId: number,
        CalculationDatas: CalculationData[] = [],
    ) {
        this.id = id;
        this.RequesterId = RequesterId;
        this.FormId = FormId;
        this.ProcessId = ProcessId;
        this.CalculationDatas = [];
    }
}
