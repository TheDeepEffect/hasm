import { useMutation } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { CREATE_POST } from '../resolvers/mutations'
import { createPost, createPostVariables } from './../../generated/createPost'
import { useStore } from './useStore'
import { FEED } from './../resolvers/queries'
import { fetchImage } from '../helpers'
import { Feed } from '../../generated/Feed'
import { IAddPostKey, IAddPostState, IAddPostValue } from '../../types'

export const useAddPost = () => {
    const { state: store, toggleAddPost } = useStore()
    const history = useHistory()
    const {
        AddPost: { visible },
    } = store

    const [state, setLocalState] = useState<IAddPostState>({
        imageFile: '',
        imagePreview: '',
        description: '',
        isPrivate: false,
    })

    const handleOnCloseClick = useCallback(() => {
        toggleAddPost()
        setLocalState({
            imageFile: '',
            imagePreview: '',
            description: '',
            isPrivate: false,
        })
    }, [toggleAddPost])

    const handleOnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            // @ts-ignore
            reader.onload = (img) => setState('imageFile', img.target?.result)
            setState('imagePreview', URL.createObjectURL(file))
        }
    }

    const handleEscape = useCallback(
        (event) => {
            if (event.keyCode === 27) {
                handleOnCloseClick()
            }
        },
        [handleOnCloseClick]
    )

    useEffect(() => {
        if (visible) document.addEventListener('keydown', handleEscape, false)
        return () => {
            document.removeEventListener('keydown', handleEscape, false)
        }
    }, [handleEscape, visible])

    const [onCreatePost, { loading, data, error }] = useMutation<
        createPost,
        createPostVariables
    >(CREATE_POST, {
        update: async (cache, { data }) => {
            const existingPosts = cache.readQuery<Feed>({
                query: FEED,
            })
            let postImage, profilePic
            const url = data?.createPost?.url
            const profile_pic = data?.createPost?.author?.profile_pic
            if (url) {
                postImage = await fetchImage(url)
            }
            if (profile_pic) {
                profilePic = await fetchImage(profile_pic)
            }
            const newPost = {
                ...data?.createPost,
                url: postImage ? postImage : url,
                author: {
                    ...data?.createPost?.author,
                    profile_pic: profilePic ? profilePic : profile_pic,
                },
            }
            if (existingPosts && data?.createPost) {
                cache.writeQuery({
                    query: FEED,
                    data: {
                        // @ts-ignore
                        feed: [{ ...newPost }, ...existingPosts?.feed],
                    },
                })
            }
        },
        onCompleted: () => handleOnCloseClick(),
        onError: (err) => {
            if (err.message === 'Unauthenticated User') {
                history.push('/login')
            }
        },
    })

    const setState = (key: IAddPostKey, value: IAddPostValue) => {
        setLocalState((state) => ({
            ...state,
            [key]: value,
        }))
    }
    const validateData = () => {
        if (!state?.imageFile) {
            return false
        }
        return true
    }
    const handleOnAddPost = () => {
        if (validateData()) {
            onCreatePost({
                variables: {
                    createPostUrl: state?.imageFile,
                    createPostIsPrivate: state?.isPrivate,
                    createPostDescription: state?.description,
                },
            })
        }
    }
    return {
        handleOnAddPost,
        data,
        loading,
        error,
        setState,
        state,
        visible,
        handleOnImageChange,
        handleOnCloseClick,
    }
}
