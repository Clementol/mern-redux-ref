import fetch from 'isomorphic-unfetch'
import ShoppingList from '../components/shoppingList'

 function Home({props}) {
    console.log(props)
  return (
        <div className="container">
          <ShoppingList />
        </div>
  )
}

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

export default Home;
