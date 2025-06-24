import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function page() {
  return (
    <div>
      <SignUp
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
}

export default page;
