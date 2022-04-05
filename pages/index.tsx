import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Link href='/login'>
        <a>
          <Button
            variant='contained'
            color='primary'
          >Login</Button>
        </a>
      </Link>
    </>
  )
}

export default Home
