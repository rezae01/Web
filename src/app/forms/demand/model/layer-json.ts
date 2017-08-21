export class LayerJson {
    JsonRow: any;
    AfterRow: any;
    JsonError: any;
    JsonErrorMessage: any;
    constructor(
        JsonRow: any,
        AfterRow: any,
        JsonError: any,
        JsonErrorMessage: any,
    ) {
        this.JsonRow = JsonRow;
        this.AfterRow = AfterRow;
        this.JsonError = JsonError;
        this.JsonErrorMessage = JsonErrorMessage;
    }
}