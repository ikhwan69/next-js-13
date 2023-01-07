import { useState } from 'react'
import Card from '../components/Card/Card'
import Grid from '../components/Grid/Grid'
import Spinner from '../components/Spinner/Spinner'
import Pagination from '../components/Pagination/Pagination'
import Link from 'next/link'
import { useFetchUser } from '../hooks/fetchHooks'

const Home = () => {
  const [activePage, setActivePage] = useState(1)
  const { data, isLoading, isFetching, error } = useFetchUser(activePage)
  

  console.log(data)

  
 
  
  if (error) return <div>Oh noooooooo something went wrong!</div>;

  return (
    <main className='main-element relative h-screen overflow-y-scroll'>
      {isLoading || isFetching ? (
      <Spinner />
      ) : (
        <>
        <Grid className="p-4 m-auto max-w-4xl">
          {data && (
              data.data.slice(0, 4).map((user) => (
                <div className='duration-300 cursor-pointer hover:opacity-80' key={user.id} >
                  <Link href={`/posts/${user.id}`}  >
                  <Card avatar={user.avatar} first_name={user.first_name} />
                  </Link>
                </div>
              ))
            )}
          </Grid>
          <Pagination
            activePage={activePage}
            setActivePage={setActivePage}
            pages={2}
          />
        </>
      )}
    </main>
  )
}
export default Home;


