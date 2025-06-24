import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function page() {
  return (
    <div>
      <SignIn
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}

export default page;
