import React, { useContext, useState } from 'react'
import { Button, Heading, useToast } from '@chakra-ui/react'
import { MyContext, MyContextType, serverUrl } from '@/context/mycontext'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../styles/Sign.module.css'

const SignUp = () => {

  const router = useRouter()
  const toast = useToast()
  const { setData } = useContext<MyContextType>(MyContext);

  const initialData = {
    email: "",
    password: "",
    userName: ""
  }

  const [userData, setUserData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { title, value } = e.target

    setUserData({ ...userData, [title]: value })

  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await fetch(`${serverUrl}/users/signIn`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(response => {
      if (response.ok) {
        setData({
          userId: null,
          token: null
        })
        if (typeof window !== 'undefined') {
          localStorage.clear()
        }
        router.push('/signin')
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
        setLoading(false)
      } else if (response.status === 409) {
        toast({
          title: `Email Already Exists, You Can Login Back.`,
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      }
      else if (response.status === 410) {
        toast({
          title: `UserName Already Exists, Please choose another One.`,
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      }
      else {
        toast({
          title: `Error Occured Please Try Again.`,
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      }
    })
      .catch(error => {
        console.error(error);
        toast({
          title: `Error Occured Please Try Again.`,
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      });


  }

  return (
    <><Head>
      <title>Sign Up | Ice Melon</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <div
        className={styles.signUpPage}

      >
        <form
          className={styles.signUpForm}

          onSubmit={handleSubmit}
        ><Heading
        marginBottom={'15px'}
        >Sign Up </Heading>
    
          <label

            className={styles.Label}
            htmlFor="username"
          >
            Username
          </label>
          <input

placeholder='Enter UserName'
            className={styles.Input}
            value={userData.userName}
            onChange={handleChange}
            type="text"
            title="userName"
            required
          />

          <label
            className={styles.Label}
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={styles.Input}
            value={userData.email}
            onChange={handleChange}
            placeholder='Enter Email'
            type="email"
            title="email"
            required
          />

          <label
            className={styles.Label}
            htmlFor="password"
          >
            Password
          </label>
          <input
          placeholder='Enter Password'
            className={styles.Input}
            value={userData.password}
            onChange={handleChange}
            type="password"
            title="password"
            required
          />

          <Button

            isLoading={loading}
            loadingText='Loading'
            type="submit"
            backgroundColor={'#4caf50'}
            colorScheme={'telegram'}
            color={'#fff'}
          >
            Sign up
          </Button>
        </form>
      </div>
    </>);
};

export default SignUp;


