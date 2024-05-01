import Fail from "../modals/Fail";
import Success from "../modals/Sucess";
import Reconsider from "../modals/Reconsider";
import SuccessPay from "../modals/SucessPay";
import Score from "../modals/Score";
import Appointment from "../modals/Appointment";
import SuccessApp from "../modals/SucessApp";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <script>document.write(new Date().getFullYear());</script>©{" "}
              <a href="https://shaswataweb.netlify.app">Shaswata Web</a>.
            </div>
          </div>
        </div>
      </footer>
      <Appointment />
      {/* <!-- END layout-wrapper -->

      <!--start confirm-appointment-modal--> */}
      <SuccessApp />
      {/* <!-- /.modal -->
      <!--end confirm-appointment-modal-->

      <!--start appointment-modal--> */}

      {/* <!-- /.modal -->
      <!--end appointment-modal-->

      <!--start score-modal--> */}
      <Score />
      {/* 
      <!--end score-modal-->
      <!--Success Payment Modal Start--> */}
      <SuccessPay />
      {/* <!--Success Payment Modal End-->

      <!--Reconsider Appointment Modal Start--> */}
      <Reconsider />
      {/* <!--Reconsider Appointment Modal End-->

      <!--Fail Appointment Modal Start--> */}
      <Fail />
      {/* <!--Fail Appointment Modal End-->

      <!--Success Appointment Modal Start--> */}
      <Success />
      {/* <!--Success Payment Modal End--> */}
    </>
  );
}
