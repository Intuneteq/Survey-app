import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// import { useAppHook } from "../../contexts/AppContext";

const Redirect = () => {
   const [loading, setLoading] = useState<boolean>(false);
   // const { setToken, setUser } = useAppHook();
   const { provider } = useParams();

   const searchParams = new URLSearchParams(document.location.search);

   useEffect(() => {
      let source = axios.CancelToken.source();

      console.log('provider', provider);
      

      const data = { code: searchParams.get("code"), type: provider };

      if (data.code) {
         setLoading(true);
         const login = async () => {
            try {
               const res = await axios.post(
                  "http://localhost:8000/api/auth/oauth",
                  data,
                  {
                     cancelToken: source.token,
                  }
               );
console.log(res);

               // setUser(res.data.user);
               // setToken(res.data.token);
            } catch (error) {
               if (axios.isCancel(error)) {
                  console.log("canceled");
               } else {
                  console.log(error);
               }
            }
            setLoading(false);
         };

         login();
      }

      // Cancel token here
      return () => {
         console.log("unmounting");

         source.cancel();
      };
   }, []);

   const isLoading = <p>loading....</p>;
   const content = <div>Redirecting...</div>;

   return loading ? isLoading : content;
};

export default Redirect;
