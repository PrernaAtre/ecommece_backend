export type CurrentUser = {id : String};

export interface Authenticationrequest extends Request
{
    params : any,
    currentUser : CurrentUser
}