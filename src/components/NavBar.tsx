"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { onLogout } from "@/lib/redux/features/authSlice";

export default function NavBar() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="h-[50px] flex justify-between items-center p-4">
      <div>
        {auth.isLogin ? (<div>Hello, {auth.user.firstname}</div>) : (<div>Hello, User!</div>)}
      </div>
      <div>
        {auth.isLogin ? (
          <div>
            <button onClick={() => {dispatch(onLogout())}}>SIGN OUT</button>
          </div>
        ) : (
          <div className="flex gap-4">
              <button onClick={() => router.push("/login")}>SIGN IN</button>
              <button onClick={() => router.push("/register")}>SIGN UP</button>
          </div>
        )}
      
      </div>
    </div>
  )
}
