import curveLineVector from "../assets/vectors/curveLineVector.png";
import idea_submit from "../assets/images/idea_submit-cropped.svg";
import Input, { FileUpload, TextArea } from "../components/form/Input";
import { Button } from "../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitIdea } from "../features/ideas/ideaSlice";

export default function Idea() {
  const { uuid } = useSelector((store) => store.user.users || {});
  const dispatch = useDispatch();

  const [userIdeas, setUserIdeas] = useState({
    title: "",
    description: "",
    document: "",
    QA: "",
  });
  const [isIdeaSubmitted, setIdeaSubmitted] = useState(false);

  const submitIdeaForm = (e) => {
    e.preventDefault();

    //FormData
    const formData = new FormData();
    formData.append("submittedBy", uuid);
    formData.append("title", userIdeas.title);
    formData.append("description", userIdeas.description);
    formData.append("QA", userIdeas.QA);

    if (userIdeas.document) {
      formData.append("document", userIdeas.document);
    }

    console.log(formData);

    dispatch(submitIdea(formData));
    // console.log(res);
    setIdeaSubmitted(true);

    setUserIdeas({
      title: "",
      description: "",
      document: "",
      QA: "",
    });
  };

  return (
    <>
      <div className="w-full flex flex-col bg-indigo-200">
        <div className="flex flex-col justify-center items-center gap-y-6">
          <div className="heading relative mt-6">
            <h1 className="text-4xl text-center font-imprima font-bold tracking-wider capitalize">
              <span className="text-blue-600">submit your </span>creative ideas
            </h1>
            <img
              src={curveLineVector}
              alt="curve_line"
              className="hidden md:block absolute top-[100%] left-[35%] translate-x-[35%] translate-y-[50%]"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full p-6">
            <div className="basis-1/2">
              <img
                src={idea_submit}
                alt="idea_submit"
                className="w-full h-full"
              />
            </div>
            <div className="basis-1/2">
              {isIdeaSubmitted ? (
                <div className="max-w-md mx-auto mt-10 p-6 bg-green-100 border border-green-300 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-green-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold text-green-800">
                      Idea Submitted Successfully!
                    </h2>
                  </div>
                  <p className="mt-2 text-green-700">
                    Thank you for your submission. We appreciate your input and
                    will review your idea shortly.
                  </p>
                </div>
              ) : (
                <form
                  className="p-6 flex flex-col gap-y-5"
                  onSubmit={submitIdeaForm}
                >
                  <Input
                    type="text"
                    label="title"
                    value={userIdeas.title}
                    required={true}
                    onChange={(e) =>
                      setUserIdeas({ ...userIdeas, title: e.target.value })
                    }
                  />
                  <TextArea
                    label="description"
                    value={userIdeas.description}
                    required={true}
                    onChange={(e) =>
                      setUserIdeas({
                        ...userIdeas,
                        description: e.target.value,
                      })
                    }
                  />

                  <FileUpload
                    label="Upload Document (.pdf/.ppt)"
                    content="pdf/ppt"
                    required={true}
                    onChange={(e) =>
                      setUserIdeas({
                        ...userIdeas,
                        document: e.target.files[0],
                      })
                    }
                    className=""
                  />
                  <Input
                    type="text"
                    label="QA"
                    value={userIdeas.QA}
                    onChange={(e) =>
                      setUserIdeas({ ...userIdeas, QA: e.target.value })
                    }
                  />
                  <Button type="submit" title="submit" btnColor="bg-blue-900" />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
