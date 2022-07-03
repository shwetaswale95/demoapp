export enum MODAL_TYPE {
    CREATE = 'create',
    EDIT = 'edit'
}

export interface EmplyeeModel {
    id?:number;
    firstname:string;
    lastname:string;
    email:string;

}