// import axios from "axios"
import fetch from 'isomorphic-unfetch'

const Test = ({items}) => {
    console.log(items)
    return (
        <div>
            Test mod
        </div>
    )
}

Test.getInitialProps = async () => {
    const items =  fetch('http://localhost:3000/api/items')
    return {
        items: (await items).json()
    }
}

export default Test;