import { AtButton } from "taro-ui";
import { RootState } from "typesafe-actions";
import { connect } from "@tarojs/redux";
import { Component } from "@tarojs/taro";
import { loginActionaAsync } from "@/store/module/meb/actions";
import { DEFAULT_REG_WAY } from "@/constant";

const mapStateToProps = (state: RootState) => ({
  userInfo: state.meb.userInfo
});

const dispatchProps = {
  login: loginActionaAsync.request
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

type State = {}

@connect(
  mapStateToProps,
  dispatchProps
)
class Login extends Component<Props, State> {
  render() {
    const { login } = this.props;  
    return (
      <AtButton  onClick={() => login({
        tel: "13038360142",
        code: "123456",
        open_id: "",
        reg_way: DEFAULT_REG_WAY,
        plate_number: ""
      })}>
        确定
      </AtButton>
    )
  }
}

export default Login