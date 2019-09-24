import { mebApi } from "src/api/meb"
import { createAsyncAction } from "typesafe-actions"

export const loginActionaAsync = createAsyncAction(
  "meb/登录",
  "meb/登录成功",
  "meb/登录失败",
)<mebApi.LoginReq, mebApi.LoginRes, any>()