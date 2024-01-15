
const getUserSemiFinal = async (serverURL) => {
    try{
      const response = await fetch(`${serverURL}/round/list-user-semifinal`);
      const data = await response.json();
      return data.data
    }catch(error){
      console.log("Error: ", error)
    }
  };
  
  export default getUserSemiFinal;
  