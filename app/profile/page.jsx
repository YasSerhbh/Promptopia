'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Profile from '@components/Profile';



const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        session?.user.id && fetchData();

    }, [])

    const handleEdit = (post) => {
        post ? console.log('Post:', post) : console.log('No post');
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {

        const confirmDelete = confirm('Are you sure you want to delete this post?');

        if (confirmDelete) {

        try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
                method: 'DELETE'
            });

            const filteredPosts = posts.filter(p => p._id !== post._id);
            setPosts(filteredPosts);
        }
        catch (error) {
            console.log(error)
        } 
    }   
}


  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Profile
            name='My'
            desc='Welcome to your profile page! Here you can view and edit your profile information. You can also view your posts and edit or delete them.'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    </Suspense>
  )
}

export default MyProfile