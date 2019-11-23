type ILoad = {
  /** 是否最后一页 */
  lastPage: boolean,
  /** 是否在加载中 */
  loading: boolean
}

export const useLoadMore = (load: ILoad) => {
  if (load.lastPage) {
    return 'noMore'
  } else {
    if (load.loading) {
      return 'loading'
    } else {
      return 'more'
    }
  }
}