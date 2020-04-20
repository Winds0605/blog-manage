const base = '/messages'

// 获取所有留言
export const MEfindAll = `${base}/findAll`

// 增加一条留言
export const MEadd = `${base}/add`

// 增加一条子留言
export const MEaddSubMessage = `${base}/addSubMessage`

// 删除一条留言
export const MEdeleteByMessageId = `${base}/deleteByMessageId`

// 删除一条子留言
export const MEdeleteSubMessageBySubId = `${base}/deleteSubMessageBySubId`
