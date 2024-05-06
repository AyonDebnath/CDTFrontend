import AvailableCourses from "../features/course/AvailableCourses";
import CourseAssessment from "../features/course/CourseAssessment";
import CourseProgress from "../features/course/CourseProgress";
import PreferredPackage from "../features/course/PreferredPackage";
import PageTitle from "../features/user-body/PageTitle";

export default function CourseDetails() {
  return (
    <>
      <PageTitle pageName="Course Details" />
      <div className="row">
        <PreferredPackage />
        <CourseAssessment />
        <AvailableCourses />
        <CourseProgress />
      </div>
    </>
  );
}
