import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAppHook } from "../../contexts/AppContext";
import { axiosClient } from "../../api/axios";

const Redirect = () => {
   const [loading, setLoading] = useState(false);

   const { setToken, setUser } = useAppHook();

   const { provider } = useParams();
   const navigate = useNavigate();

   const searchParams = new URLSearchParams(document.location.search);

   useEffect(() => {
      let source = axios.CancelToken.source();

      /**
       * Code: Email verification token.
       * Provider: From Provider redirect link. It is hardcoded to token on the server side.
       */

      const token = searchParams.get("token");

      if (token) {
         async function verify_email() {
            try {
               const tokenData = await axiosClient.get(
                  `/auth/email/verify/${token}`,
                  { cancelToken: source.token }
               );
               setUser(tokenData.data.user);
               navigate('/login')
            } catch (error) {
               console.log(error);
            }
         }

         verify_email();
      }

      /**
       * Code: Authorization code from OAuth provider.
       * Provider: From Provider redirect link.
       */
      const data = { code: searchParams.get("code"), provider };

      if (data.code) {
         setLoading(true);

         const login = async () => {
            try {
               const res = await axiosClient.post(
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
                  navigate("/login");
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
