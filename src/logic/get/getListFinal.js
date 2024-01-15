
const getListFinal = async (serverURL) => {
    try{
      const response = await fetch(`${serverURL}/round/list-user-final`);
      const data = await response.json();
      return data.data
    }catch(error){
      console.log("Error: ", error)
    }
  };
  
  export default getListFinal;
  