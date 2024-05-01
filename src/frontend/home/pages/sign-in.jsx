import ErrorModal from "../../shared/elements/ErrorModal";
import CTA from "../features/banner/calltoaction";
import Header from "../features/header/header";
import SignUpModal from "../features/modals/sign-up";
import SignInForm from "../features/sign-body/sign-in-form";

function SignIn() {
  return (
    <>
      {/* <!-- Page Banner Area
  ============================================ --> */}
      <Header pageName="Sign In" />
      {/* <!-- SignIn Area Area
  ============================================ --> */}
      <SignInForm />
      {/* <!-- CTA Area
  ============================================ --> */}
      <CTA />

      {/* <!-- Signup Modal Area
  ============================================ --> */}
      <SignUpModal />
    </>
  );
}

export default SignIn;
