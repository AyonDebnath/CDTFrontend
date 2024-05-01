/* eslint-disable react/no-unescaped-entities */

import PageTitle from "../features/user-body/PageTitle";
import ActionTile from "../features/user-body/ActionTile";
import InfoTile from "../features/user-body/InfoTile";
// import MessageBoard from "../features/user-body/MessageBoard";
import SuggestedCourse from "../features/user-body/SuggestedCourse";

export default function Dashboard() {
  return (
    <>
      {/* <!-- start page title --> */}
      <PageTitle pageName="Dashboard" />
      {/* <!-- end page title --> */}
      <ActionTile />
      {/* <!-- end col --> */}

      <InfoTile />
      {/* <!-- end row --> */}

      <div className="row">
        {/* <MessageBoard /> */}
        {/* <!-- end col --> */}
        <SuggestedCourse />
        {/* <!-- end row --> */}
      </div>
      {/* <!-- container-fluid --> */}
    </>
  );
}
