'use client'
import {useState} from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const PromptCard = ({post, handleTagClick, handleDelete, handleEdit}) => {


    const {data: session} = useSession();
    const router = useRouter();
    const pathName = usePathname();
    const [copied, setCopied] = useState('')

    const handleCopy = () => {

        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => {setCopied('')}, 2000);


    }

    // post.creator._id

    const handleProfileClick = () => {

        if (pathName === '/profile') return;

        if (session?.user.id === post.creator._id) {
            router.push('/profile')
            return;
        }



        router.push(`/profile/${post.creator.username}?id=${post.creator._id}`)

        // router.push({
        //     pathname: `/profile/${post.creator.username}`,
        //     query: { id: post.creator._id },
        //   });
    }

  return (
    <div className='prompt_card'>
        <div className='flex justify-between items-start gap-5'>
            <div className='flex flex-1 justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
                <Image 
                    src={post.creator.image}
                    alt='profile image'
                    width={40}
                    height={40}
                    className='rounded-full object-contain'
                />

                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>
                        {post.creator.username}
                    </h3>
                    <p className='font-inter text-sm text-gray-500'>
                        {post.creator.email}
                    </p>
                </div>
            </div>
            <div className='copy_btn' onClick={handleCopy}>
                <Image
                    src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                    width={12}
                    height={12}
                />
            </div>
        </div>

        <p className='my-4 font-satoshi text-sm text-gray-700'>
            {post.prompt}
        </p>

        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => {handleTagClick && handleTagClick(post.tag)}}>
            #{post.tag}
        </p>

        {session?.user.id === post.creator._id && 
            pathName === '/profile' && (
                <div className='gap-4 mt-5 pt-3 border-t border-gray-100 flex-center'>
                    <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
                        Edit
                    </p>
                    <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
                        Delete
                    </p>
                </div>
            )
        }
    </div>
  )
}

export default PromptCard