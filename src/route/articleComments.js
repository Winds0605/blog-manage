const base = '/articleComments'


// 根据文章ID获取所有评论
export const ACfindComentsById = `${base}/findCommentsById`

// 增加一条评论
export const ACadd = `${base}/add`

// 删除某篇文章的评论
export const ACdeleteByArticleId = `${base}/deleteByArticleId`

// 删除某个评论
export const ACdeleteByCommentId = `${base}/deleteByCommentId`

// 删除某个子评论
export const ACdeleteSubCommentBySubId = `${base}/deleteSubCommentBySubId`

// 增加一条子留言
export const ACaddSubComment = `${base}/addSubComment`




