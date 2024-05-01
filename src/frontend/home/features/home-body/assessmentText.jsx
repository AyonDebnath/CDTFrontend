import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";

export default function AssessmentText() {
  const [visi, setVisi] = useState(false);

  return (
    <>
      <p className="assessment-text">
        Assessment
        <span
          onClick={() => {
            setVisi(!visi);
          }}
        >
          <CiCircleInfo />
        </span>
      </p>
      <p
        className={`info-assess-text ${visi ? "" : "destroy"}`}
        onClick={() => setVisi(!visi)}
      >
        Assessment is the first step in your driving journey, where the
        instructor evaluates your skills.
      </p>
    </>
  );
}
