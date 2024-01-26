import { Request, Response } from "express";

export function register(req: Request, res: Response) {
  const { email, password, username } = req.body;
  console.log({
    email,
    password,
    username,
  });
  res.send("register");
}

export function login(req: Request, res: Response) {
  res.send("login");
}
