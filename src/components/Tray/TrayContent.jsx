import React, { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";

import { UserContext } from "../../contexts/UserContext";

import TrayCard from "./TrayCard";
import { AddIcon, AddedIcon } from "../CollectionCard/CardActions";
import CardEffortPoints from "../CollectionCard/CardEffortPoints";

import { truncate } from "../BookmarkCardCached/utils";
import addOrRemoveFromTray from "./addOrRemoveFromTray";
import UserProgress from "./UserProgress";

const TrayContent = ({ tray, setTray, tagAwards, expendedEffort }) => {
  const { u } = useContext(UserContext);
  const [user] = u;
  const [trayIdArray, setTrayIdArray] = useState([]);

  useEffect(() => {
    setTrayIdArray(tray.map((t) => t.id));
  }, [tray]);

  const totalEffort = () => {
    let effortArray = tray.map((course) => {
      return course.attributes.totalEffort;
    });

    let sumEffort = effortArray.reduce((sum, x) => sum + x);
    return sumEffort;
  };

  const EffortWidget = () => {
    return (
      <CardEffortPoints effort={totalEffort()} extraClass={`badge-primary`} />
    );
  };

  const trayCourses = tray.map((course) => {
    return (
      <TrayCard key={course.id}>
        <dt>{course.attributes.title}</dt>
        <dd>
          <article className="prose prose-sm dark:prose-invert">
            <ReactMarkdown>
              {truncate(course.attributes.details || "", 240)}
            </ReactMarkdown>
          </article>
          <button
            className="btn btn-square"
            onClick={() => addOrRemoveFromTray(trayIdArray, course.id, setTray, user)}
          >
            <AddedIcon />
          </button>
        </dd>
      </TrayCard>
    );
  });

  return (
    <>
      <UserProgress tagAwards={tagAwards} expendedEffort={expendedEffort} />

      {tray.length === 0 ? (
        <p className="prose m-4">
          You have not added any lesson yet. You should{" "}
          <span className="inline-flex border rounded p-1">
            add <AddIcon />
          </span>{" "}
          a lesson that you're interested in, and check the Learning Tray again.
        </p>
      ) : (
        <>
          <h2 className="prose prose-lg mx-4">Pending Lessons</h2>
          <h3 className="prose prose-md mx-4">
            Expected Effort{" "}
            <div className="badge badge-md badge-primary">{totalEffort()}</div>
            <EffortWidget />
          </h3>

          <dl>{trayCourses}</dl>
          {/* <TrayCard setTray={setTray} />
          <TrayCard setTray={setTray} />  */}
        </>
      )}

      <p className="text-xs text-gray-500">
        {tray.length > 0 && JSON.stringify(tray[0])}
      </p>
      {/* <p className="text-xs text-gray-500">{JSON.stringify(tray)}</p> */}
    </>
  );
};

export default TrayContent;
