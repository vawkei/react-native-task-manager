import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState,TaskData } from "@/interfaces/interface";

const initialTaskState:TaskState = {
    task:"",
    tasks:[],
    message:""
};

export const taskSlice = createSlice({
    name:"task",
    initialState:initialTaskState,
    reducers:{
        UPDATED_TASK(state:TaskState,action:PayloadAction<{msg:string}>){
            // this runs after we update the task.
            const data = action.payload.msg
            console.log("data:",data);

            state.message = data;
        },
        CREATE_TASK(state:TaskState,action:PayloadAction<{msg:string,task:TaskData}>){
            const data = action.payload.msg
            console.log("data:",data);

            state.message = data
        },
        RESET_TASK_MSG(state:TaskState){
            state.message=""
        }
    }
});

export const {UPDATED_TASK, CREATE_TASK, RESET_TASK_MSG} = taskSlice.actions;

