function LoginSwitcher({ handleIsLogin, isLogin }) {
  return (
    <>
      <div className="bg-input-background mx-auto grid h-10 w-full grid-cols-2 rounded-xl p-1">
        {/* Login */}
        <div
          className={`${isLogin ? "bg-primary text-primary-foreground" : "text-muted-foreground bg-transparent"} flex w-full cursor-pointer items-center justify-center rounded-[calc(0.75rem-0.25rem)] p-0 font-medium`}
          onClick={() => handleIsLogin(true)}
        >
          Login
        </div>
        {/* Sign Up */}
        <div
          className={`${isLogin ? "text-muted-foreground bg-transparent" : "bg-primary text-primary-foreground"} flex w-full cursor-pointer items-center justify-center rounded-[calc(0.75rem-0.25rem)] p-0 font-medium`}
          onClick={() => handleIsLogin(false)}
        >
          Sign Up
        </div>
      </div>
    </>
  );
}

export default LoginSwitcher;
