import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Blog, serverUrl } from '@/context/mycontext';
import BlogCard from '@/components/BlogCard';
import Filter from '@/components/Filter'
import { Box } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'


type staticBlogsProps = {
  staticBlogs: Blog[]
}

export default function Home({ staticBlogs }: staticBlogsProps) {




  const [stateBlogs, setStateBlogs] = useState<Blog[]>(staticBlogs)
  const [category, setCategory] = useState<string>('Select Category')

  useEffect(() => {

    if (category !== 'Select Category') {
      setStateBlogs(staticBlogs.filter((blog: Blog) => blog.category === category))

    } else {
      setStateBlogs(staticBlogs)

    }

  }, [category])


  return (
    <>
      <Head>
        <title>Ice Melon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box 
      width="fit-content" 
       margin={`100px auto 10px auto`}>
        <><Filter handleCategory={(category) => setCategory(category)}></Filter></>
        <div className={styles.AllBlogs}>
        {stateBlogs.map(((blog, i) => (
          <BlogCard
            category={blog.category}
            content={blog.content}
            date={blog.date}
            title={blog.title}
            username={blog.userName}
            key={i}
            _id={blog._id}
          ></BlogCard>)))}</div>
      </Box>
    </>
  )
}


export async function getStaticProps() {
  const res = await fetch(`${serverUrl}/blogs`)
  const data = await res.json()

  return {
    props: {
      staticBlogs: data
    },
    revalidate: 10
  };
}