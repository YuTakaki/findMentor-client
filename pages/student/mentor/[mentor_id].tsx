import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../../components/layout/Layout';

const Mentor = () => {
  return (
    <Layout>
      Mentor

    </Layout>
  )
}

export const getServerSideProps : GetServerSideProps = async({params, req}) => {
  try {
    const mentor_id = params!.mentor_id;
    const mentor_details = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/mentor/${mentor_id}`, {withCredentials: true, headers: {
      Cookie: req.headers.cookie!
    }});
    console.log(mentor_details);
    return {
      props : {
        mentor_details,
      }
    }
    
  } catch (error) {
    console.log(error);
    return {
      props: {}
    }
  }
}

export default Mentor