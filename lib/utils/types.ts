import { Row } from "@tanstack/react-table";

export type AppFormProps<
  TCreatePayload,
  TUpdatePayload,
  TFormData,
  TResponse = null
> =
  | {
      formType: "create";
      handleCreate: (
        data: TCreatePayload
      ) => Promise<ActionResponse<TResponse>>;
    }
  | {
      formType: "update";
      formObject: TFormData;
      handleUpdate: (
        id: string,
        data: TUpdatePayload
      ) => Promise<ActionResponse<TResponse>>;
    };

export type ActionResponse<T = null> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export type RowActionProps<T> = Row<T>;

export type Override<T, U> = Omit<T, keyof U> & U;
