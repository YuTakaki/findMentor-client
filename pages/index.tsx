import { Button, Container, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Link href='/login'>
      <a>
        <Button
          variant='contained'
        >Login</Button>
      </a>
    </Link>
  )
}

export default Home
