import { useState } from "react";
import selectMentor from "./selectMentor";

import CardEffortPoints from "../CollectionCard/CardEffortPoints";
import CollectionModal from "../CollectionModal";

const MentorProfile = ({ mentor }) => {
  return (
    <>
      <img
        src={mentor?.imageURL}
        alt={mentor?.name}
        className="mask mask-hexagon rounded-md filter grayscale sepia-25 self-center w-5 h-5 rounded-full mx-2"
      />

      <span className="font-bold">{mentor?.name}</span>
    </>
  );
};

const AlreadyAssignedBtn = () => {
  return (
    <div className="tooltip" data-tip="You have a mentor for this elective.">
      <button disabled className="btn gap-2 btn-disabled btn-block">
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <span className="text-xs">Assigned</span>
        </span>
      </button>
    </div>
  );
};

const ConfirmAssignmentBtn = ({
  trayId,
  expertId,
  user,
  bookmarkedCollections,
  setBookmarkedCollections,
}) => {
  const [btnEnable, setBtnEnable] = useState(true);

  return (
    <button
      className={`btn gap-2 btn-block hover:animate-pulse ${
        !btnEnable && "btn-disabled loading"
      }`}
      onClick={() => {
        setBtnEnable(false);
        selectMentor(
          trayId,
          expertId,
          user,
          bookmarkedCollections,
          setBookmarkedCollections
        );
      }}
    >
      <span className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
          />
        </svg>

        <span className="text-xs ml-2">Confirm</span>
      </span>
    </button>
  );
};

export const LessonCardFrame = ({ children, lesson, wide }) => {
  return (
    <div className="card bg-base-100 shadow-xl overflow-visible mb-4">
      <div className="card-body">
        <div className="gap-1">
          <div
            className={`grid gap-1 items-center ${
              wide ? "grid-cols-1 md:grid-cols-2" : "grid-cols-3"
            }`}
          >
            <div className={`text-left ${!wide && "md:col-span-2 col-span-3"}`}>
              <h2 className="card-title">
                <label
                  htmlFor={lesson.id}
                  className="text-secondary text-2xl hover:text-success hover:animate-pulse hover:cursor-pointer"
                >
                  {lesson.attributes?.title}
                </label>
              </h2>
              {lesson.status === "ongoing" ||
              lesson.status === "preaccept" ||
              lesson.status === "completed" ? (
                lesson.assigned_expert && (
                  <>
                    <p className="font-light text-sm">
                      {lesson.status === "preaccept"
                        ? "Suggested Mentor:"
                        : "Assigned Mentor"}
                    </p>
                    <span className="flex items-center">
                      <MentorProfile
                        mentor={lesson.assigned_expert?.attributes}
                      />
                    </span>
                  </>
                )
              ) : (
                <>
                  <p className="font-light text-sm">Suggested Mentor:</p>
                  <span className="flex items-center">
                    <MentorProfile
                      mentor={lesson.attributes?.recommendedExpert}
                    />
                    {/* {JSON.stringify(lesson.attributes?.totalEffort)} */}
                  </span>
                </>
              )}
              <br />
              <CardEffortPoints
                effort={lesson.attributes?.totalEffort}
                extraClass={lesson.status === "completed" && `badge-secondary`}
              />
            </div>
            <div className="col-span-3 lg:col-span-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MentorAssignmentCard = ({
  lesson,
  user,
  bookmarkedCollections,
  setBookmarkedCollections,
}) => {
  return (
    <LessonCardFrame lesson={lesson}>
      {/* TODO: need to handle cases when there is no available expert */}
      <div className="col-span-3 lg:col-span-1">
        {lesson.status === "ongoing" ? (
          <AlreadyAssignedBtn />
        ) : lesson.status === "preaccept" ? (
          <span className="flex items-center">
            <span className="text-xs ml-2 prose prose-slate">
              Waiting for confirmation
            </span>
          </span>
        ) : (
          <ConfirmAssignmentBtn
            trayId={lesson.trayId}
            expertId={lesson.attributes?.recommendedExpert?.id}
            user={user}
            bookmarkedCollections={bookmarkedCollections}
            setBookmarkedCollections={setBookmarkedCollections}
          />
        )}
      </div>
      <CollectionModal
        collectionId={lesson.id}
        showSubmitButton={lesson.status === "ongoing" ? true : false}
      />
    </LessonCardFrame>
  );
};

export default MentorAssignmentCard;
