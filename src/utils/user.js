import { setAuthHeaders, client } from "./auth"

const userContext = async () => {
    setAuthHeaders();
    try {
      const data = await client.get("/auth/me");
      return data;
    } catch (e) {
      console.log({ message: e.message, stack: e.stack });
      return null
    }
  };


export {
    userContext
}