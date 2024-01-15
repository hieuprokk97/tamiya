
const getListUser = async (serverURL) => {
    try{
      const response = await fetch(`${serverURL}/round/get-list`);
      const data = await response.json();
      return data.data
    }catch(error){
      console.log("Error: ", error)
    }
  };
  
  export default getListUser;
  