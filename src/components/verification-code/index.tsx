import Toast from "@/utils/toast";
import { AtButton } from "taro-ui";
import { REG_MAP } from "@/constant";
import { CSSProperties } from "react";
import { Text } from "@tarojs/components";
import { useDispatch, useSelector } from "@tarojs/redux";
import { timer } from "rxjs";
import { scan, takeWhile } from "rxjs/operators";
import { sendCodeAsync } from '@/store/module/meb/meb.actions'
import { FC, useState, useCallback, useEffect } from "@tarojs/taro";
import { RootState } from '@/store/types';

export interface VerificationCodeProps {
	textStyle: CSSProperties,
	/** tel号码 */
	tel: string,
	/** 发送事件 */
	onClick?: () => void
}

const initText = '发送验证码';

const VerificationCode: FC<VerificationCodeProps> = (props) => {
	const dispatch = useDispatch();
	const { textStyle, tel, onClick } = props;
	const [text, setText] = useState(initText);
	const [codeDisabled, setCodeDisabled] = useState(false);
	const verifyState = useSelector((state: RootState) => state.meb.sendCode.state);

	useEffect(() => {
		if (verifyState === false) {
			console.log('状态失败/查询初始化时间');
		}
	}, [verifyState])

	const onSendCodeClick = useCallback(() => {
		if (!REG_MAP.mobileNumber.test(tel)) {
			return Toast.info('手机号码格式不正确')
		}

		setCodeDisabled(true);
		onClick && onClick();

		dispatch(
			sendCodeAsync({ tel })
		)

		timer(0, 1000).pipe(
			scan(num => num - 1, 60),
			takeWhile(num => num > 0)
		).subscribe({
			next: num => setText(`重新发送(${num}s)`),
			complete: () => {
				setText(initText);
				setCodeDisabled(false);
				console.log('done');
			},
		})
	}, [tel])

	return (
		<AtButton onClick={onSendCodeClick} disabled={codeDisabled} size="small" type="primary" customStyle={{ background: 'none' }}>
			<Text style={textStyle}>{text}</Text>
		</AtButton>
	)
}

export default VerificationCode;