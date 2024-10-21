import Link from "next/link";

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <div className="my-4">
        Don&apos;t have any account ?
        <Link href="/auth/register" className="text-green-400"> Create new.</Link>
      </div>
    </div>
  );
};

export default Login;
