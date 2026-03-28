import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logoutUser } from "../services/AuthService";

const LOCAL_KEY = "auth_state";
export const useAuthStore = create(
  persist(
    (set,get) => ({
      user: null,
      accessToken: null,
      authStatus:false,
      authLoading:false,

      setAuth: (user, accessToken,authStatus) =>
        set({ user, accessToken ,authStatus}),

      logout: async(silent=false) =>{
        try {
            set({authLoading:true})
            await logoutUser();
        } catch (error) {
            console.log(error)
        }finally{
            set({authLoading:false})
        }
        set({ user: null, accessToken: null ,authStatus:false})},

      isLogin:()=>{
        if(get().authStatus && get().accessToken) return true;
        else return false;
      }
    }),
    {
      name: LOCAL_KEY,
    }
  )
);