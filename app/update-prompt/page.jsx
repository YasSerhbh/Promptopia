'use client'

import {useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPost = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');


    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })


    useEffect(() => {

        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        promptId && getPromptDetails();

    }, [promptId])

    const editPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if (!promptId) return alert('Prompt not found!')

        try {

            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,                    
                })
            })
            

            if(response.ok) {
                router.push('/profile')
            }
        }
        catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }


  return (

    <Suspense fallback={<div>Loading...</div>}>
    <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
    />
    </Suspense>
  )
}

export default EditPost