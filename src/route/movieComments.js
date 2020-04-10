const base = '/movieComments'


// 根据文章ID获取所有评论
export const MCfindCommentsById = `${base}/findCommentById`

// 增加一条评论
export const MCadd = `${base}/add`

// 增加一条子评论
export const MCaddSubComment = `${base}/addSubComment`

// 删除某部电影的评论
export const MCdeleteByMovieId = `${base}/deleteByMovieId`

// 删除电影某个评论
export const MCdeleteByCommentId = `${base}/deleteByCommentId`

// 删除某个子评论
export const MCdeleteSubCommentByCommentId = `${base}/deleteSubCommentByCommentId`
