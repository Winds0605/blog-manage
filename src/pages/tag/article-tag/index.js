import React from 'react'
import { TAarticleTagsfindAll, TAarticleTagsDelete, TAarticleTagsAdd } from 'route/tags'
import Tag from '../index'

export default () => {
    return (
        <>
            <Tag title="文章标签管理" tagFindAll={TAarticleTagsfindAll} tagAdd={TAarticleTagsAdd} tagDelete={TAarticleTagsDelete} />
        </>
    )
}
