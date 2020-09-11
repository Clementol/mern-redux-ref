import Head from 'next/head'
import Login from "../components/auth/login"

const HomePage = () => {
    return (
        <>
        <Head>
        <title>Login to manage Shopping List</title>
        </Head>
        <div className="bg">
        <div className="container">
            <Login />
        </div>
        </div>
        
        </>
    )
}

export default HomePage;

//Home.getInitialProps = async () => {
  // const res = await fetch(`http://localhost:3000/api/getProducts`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //   }
  // })
  // const productData = await res.json();
  // return {
    // products: productData
  //}
 
//}
