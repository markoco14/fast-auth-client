import { useUserContext } from "@/app/UserContext";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const { loginUser } = useUserContext();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    loginUser(data);
    reset();

    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">Email</label>
        <input
          type="email"
          className="rounded p-2 shadow"
          {...register("username", { required: true })}
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2">Password</label>
        <input
          type="password"
          className="rounded p-2 shadow"
          {...register("password", { required: true })}
        />
      </div>
      <button className="rounded bg-blue-300 px-4 py-1 text-blue-900 hover:bg-blue-500 hover:text-white">
        Login
      </button>
    </form>
  );
}
