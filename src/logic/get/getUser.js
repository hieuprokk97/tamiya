
const getUser = async (serverURL) => {
  try{
    const response = await fetch(`${serverURL}/user/all_users`);
    const data = await response.json();
    return data.data
  }catch(error){
    console.log("Error: ", error)
  }
};

export default getUser;
