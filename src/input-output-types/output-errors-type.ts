export interface ErrorMessage {
  message: string | null;
  field: string | null;
}

export interface OutputErrorsType {
  errorsMessages: ErrorMessage[] | null;
}