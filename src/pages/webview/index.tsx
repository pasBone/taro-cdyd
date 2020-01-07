import { WebView } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'

export const WebViewCommon = () => {
  const $router = useRouter();
  return <WebView style="height: 100vh" src={$router.params.url} />
}