import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("facebook");
      }}
    >
      <button type="submit">Signin with Facebook</button>
    </form>
  );
}
