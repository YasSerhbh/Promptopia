'use client';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Profile from '@components/Profile';




const MyProfile = ({params}) => {

    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');


    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        userId && fetchData();

    }, [])




  return (

        <Profile
            name={`${params.username}'s`}
            desc={`Welcome to ${params.username}'s profile page! Here you can view their posts and follow them.`}
            data={posts}
        />
  )
}

export default MyProfile