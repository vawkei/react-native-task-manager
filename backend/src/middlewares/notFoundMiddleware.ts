import { Request,Response } from "express";

export const notFound = (_req:Request,res:Response)=>{
  res.status(404).send("route doesn't exist");
  return
}