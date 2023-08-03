import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAppHook } from "../../contexts/AppContext";

const Redirect = () => {
   const [loading, setLoading] = useState<boolean>(false);

   const { setToken, setUser } = useAppHook();

   const { provider } = useParams();
   const navigate = useNavigate();

   const searchParams = new URLSearchParams(document.location.search);

   useEffect(() => {
      let source = axios.CancelToken.source();

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

               setUser(res.data.user);
               setToken(res.data.token);
            } catch (error) {
               if (axios.isCancel(error)) {
                  console.log("canceled");
               } else {
                  console.log(error);
                  navigate('/login')
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
