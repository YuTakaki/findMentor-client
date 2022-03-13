import { Button, Container, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <main>
      <Container>
        <Stack 
          // direction='row'
          spacing={2}
          alignItems='center'
        >
          <Link href='/login?account_type=student'>
            <a>
              <Button
                variant='contained'
              >Student</Button>
            </a>
          </Link>
          <Link href='/login?account_type=mentor'>
            <a>
              <Button 
                variant='contained'
                color='secondary'
              >Mentor</Button>
            </a>
          </Link>
        </Stack>
      </Container>
    </main>
  )
}

export default Home
