import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from "next/router";
import { useFetchUserId } from "../../hooks/fetchHooks";
import { getUser } from "../../api/users";
import CardInfo from '../../components/Card/CardInfo';
import Spinner from '../../components/Spinner/Spinner';
import { withCSR } from '../../HOC/with-CSR';

const SingleUser = () => {
  const { query: { id } } = useRouter()

  const { data, isLoading, isFetching } = useFetchUserId(id)

  if(isFetching || isLoading) return <Spinner />

  return (
    <main>
        <CardInfo
          avatar={data.data.avatar}
          email={data.data.email}
          first_name={data.data.first_name}
          last_name={data.data.last_name}
          text={data.support.text}
          url={data.support.url}
        />
    </main>
  );
};

export const getServerSideProps = withCSR(async (ctx) => {
  const { id } = ctx.params;
  const queryClient = new QueryClient();
  let isError = false;

  try {
    await queryClient.fetchQuery(['user', id], () => getUser(id));
  } catch (error) {
    isError = true
    ctx.res.statusCode = error.response.status;
  }
// Referensi
// https://tanstack.com/query/v4/docs/react/guides/ssr 
  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient)
    }
  }

})

export default SingleUser;


