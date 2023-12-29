import axios from "axios";

const removeUserAll = async (serverURL) => {
    try{
        const response = await axios.post(`${serverURL}/user/deleteAll`)
        return response.data.statis
    }catch(err){
        console.log(err)
    }
}

export default removeUserAll