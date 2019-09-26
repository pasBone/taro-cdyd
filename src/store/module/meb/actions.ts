import { mebApi } from "src/api/meb"
import { createAsyncAction } from "typesafe-actions"

export const loginActionaAsync = createAsyncAction(
  "meb/登录",
  "meb/登录成功",
  "meb/登录失败",
)<mebApi.LoginReq, mebApi.LoginRes, any>();

export const sendCodeActionaAsync = createAsyncAction(
  "meb/发送验证码",
  "meb/发送验证码成功",
  "meb/发送验证码失败",
)<mebApi.SendCodeReq, any, any>();