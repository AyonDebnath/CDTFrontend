import PageTitle from "../features/user-body/PageTitle";
import { useContext } from "react";
import { WindowContext } from "../../shared/context/window-context";
import ActionTile from "../features/user-body/ActionTile";
import CoverPhoto from "../features/profile/CoverPhoto";
import ProfilePhoto from "../features/profile/ProfilePhoto";
import ProfileEdit from "../features/profile/ProfileEdit";
import ProfileInfo from "../features/profile/ProfileInfo";
import ProfileAbout from "../features/profile/ProfileAbout";

export default function Profile() {
  const wind = useContext(WindowContext);
  return (
    <>
      {/* <!-- start page title --> */}
      <PageTitle pageName="Profile" />
      {/* <!-- end page title --> */}
      <CoverPhoto />
      <ProfilePhoto />

      <div className="row">
        <div className="col-lg-12">
          <div>
            <ProfileEdit />
            {/* <!-- Tab panes --> */}
            <div className="tab-content pt-4 text-muted">
              <div
                className="tab-pane active"
                id="overview-tab"
                role="tabpanel"
              >
                <div className="row">
                  <ProfileInfo />
                  {/* <!--end col--> */}
                  <div className="col-xxl-9">
                    <ProfileAbout />
                    {/* <!-- end card --> */}
                    <ActionTile />
                  </div>
                  {/* <!--end col--> */}
                </div>
                {/* <!--end row--> */}
              </div>
            </div>
            {/* <!--end tab-content--> */}
          </div>
        </div>
        {/* <!--end col--> */}
      </div>
      {/* <!--end row--> */}
    </>
  );
}
