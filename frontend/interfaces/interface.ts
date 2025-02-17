
export interface MysqlTaskData{
    title:string;
    description:string;
    status:boolean;
    dateDue:string;
    uuid:string
};

export interface TaskData{
    title:string;
    description:string;
    status:boolean;
    dueDate:Date; 
};

export interface TaskState{
    task:string;
    tasks: [];
    message:string
}

export interface AuthState {
    isLoggedIn: boolean;
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    message: string;
    user: any | null;
    token: string;
  }