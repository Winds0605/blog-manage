import React from 'react'
import { TAmovieTagsfindAll, TAmovieTagsAdd, TAmovieTagsDelete } from 'route/tags'
import Tag from '../index'

export default () => {
    return (
        <>
            <Tag title="电影标签管理" tagFindAll={TAmovieTagsfindAll} tagAdd={TAmovieTagsAdd} tagDelete={TAmovieTagsDelete} />
        </>
    )
}
