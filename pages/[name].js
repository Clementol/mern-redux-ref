import Head from 'next/head';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import ShoppingList from '../components/shoppingList';
import { LoginLink } from '../components/itemModal';

 function UserItems() {
     const router = useRouter();
    const {auth} = useSelector( (state) => state );
   
  return (
      <>
        <Head>
            <title>{router.query.name}'s Items</title>
        </Head>
        <div className="container">
          { auth.confirmed && auth.isAuthenticated ? <ShoppingList /> : LoginLink }
        </div>
    </>
  )
}

export default UserItems;
