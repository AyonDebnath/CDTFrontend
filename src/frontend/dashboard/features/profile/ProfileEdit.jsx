import { Link, useParams } from "react-router-dom";

export default function ProfileEdit() {
  const userID = useParams().uid;

  return (
    <div className="d-flex profile-wrapper">
      <div className="flex-shrink-0">
        <Link
          to={`/user-profile-settings/${userID}`}
          className="btn btn-success"
        >
          <i className="ri-edit-box-line align-bottom"></i> Edit Profile
        </Link>
      </div>
    </div>
  );
}
