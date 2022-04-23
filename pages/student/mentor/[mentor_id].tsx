import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../../components/layout/Layout';
import { get } from '../../../services/request';

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
    const mentor_details = await get(`/api/mentor/${mentor_id}`, {headers: {
      Cookie: req.headers.cookie!
    }});
    console.log(mentor_details);
    return {
      props : {
        mentor_details : mentor_details.data
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