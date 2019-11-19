import Toast from "@/utils/toast";
import { AtButton } from "taro-ui";
import { REG_MAP } from "@/constant";
import { CSSProperties } from "react";
import { Text } from "@tarojs/components";
import { useDispatch, useSelector } from "@tarojs/redux";
import { sendCodeAsync } from '@/store/module/meb/meb.actions'
import { FC, useState, useCallback, useEffect, useRef } from "@tarojs/taro";
import { RootState } from '@/store/types';

export interface VerificationCodeProps {
	textStyle: CSSProperties,
	/** tel号码 */
	tel: string,
	/** 发送事件 */
	onClick?: () => void
}

const initText = '发送验证码';
const initTime = 6;

const VerificationCode: FC<VerificationCodeProps> = (props) => {
	const dispatch = useDispatch();
	const { textStyle, tel, onClick } = props;
	const [text, setText] = useState(initText);
	const [time, setTime] = useState(initTime);
	const [codeDisabled, setCodeDisabled] = useState(false);
	const verifyState = useSelector((state: RootState) => state.meb.sendCode.state);
	const timerRef = useRef<any>();

	/** 重置验证码相关状态 */
	const resetCodeFn = () => {
		setText(initText);
		setCodeDisabled(false);
		setTime(initTime);
	}

	/** 倒计时相关状态 */
	const countDown = () => {
		setTime(time - 1);
		setText(`重新发送(${time}s)`);
	}

	useEffect(() => {
		if (codeDisabled) {
			if (time < 0 || verifyState === false) {
				resetCodeFn();
				return () => clearTimeout(timerRef.current);
			}
			timerRef.current = setTimeout(() => {
				countDown();
			}, 1000);
		}
		return () => clearTimeout(timerRef.current);
	}, [time, codeDisabled, verifyState]);

	const onSendCodeClick = useCallback(() => {
		if (!REG_MAP.mobileNumber.test(tel)) {
			return Toast.info('手机号码格式不正确');
		}
		countDown();
		setCodeDisabled(true);
		onClick && onClick();
		dispatch(
			sendCodeAsync({ tel })
		);
	}, [tel]);

	return (
		<AtButton onClick={onSendCodeClick} disabled={codeDisabled} size="small" type="primary" customStyle={{ background: 'none' }}>
			<Text style={textStyle}>{text}</Text>
		</AtButton>
	)
}

export default VerificationCode;