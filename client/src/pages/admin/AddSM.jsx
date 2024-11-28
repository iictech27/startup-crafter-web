import React, { useState } from "react";
import axios from "axios";
import Input, {
  FileUpload,
  Select,
  TextArea,
} from "../../components/form/Input";
import Button from "../../components/Button";
import curveLineVector from "/assets/vectors/curveLineVector.png";
import admin_sm from "/assets/images/admin_sm.png";
import { useDispatch, useSelector } from "react-redux";

const AddSM = () => {
  //dispatcher
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.studyMaterial.topics || []);

  //states
  const [topicId, setTopicId] = useState("");
  const [existingTopics, setExistingTopics] = useState(topics);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [isExistingTopicSelected, setIsExistingTopicSelected] = useState(false);
  const [subtopic, setSubtopic] = useState({
    title: "",
    description: "",
    cover_image: "",
    prerequisites: [""],
  });
  const [units, setUnits] = useState([
    { title: "", description1: "", description2: "", modules: [] },
  ]);

  // functions
  const handleTopicChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSelectedTopic(value);
      setIsExistingTopicSelected(true);
      setNewTopic(""); // Clear the new topic input
    }
  };

  const handleNewTopicChange = (e) => {
    const value = e.target.value;
    setNewTopic(value);
    setIsExistingTopicSelected(false);
    setSelectedTopic(""); // Clear the selected topic
  };

  const handlePrerequisiteChange = (index, value) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites[index] = value;
    setPrerequisites(newPrerequisites);
  };

  const addPrerequisite = () => {
    setPrerequisites([...prerequisites, ""]);
  };

  const handleUnitChange = (index, field, value) => {
    const newUnits = [...units];
    newUnits[index][field] = value;
    setUnits(newUnits);
  };

  const addUnit = () => {
    setUnits([
      ...units,
      { title: "", description1: "", description2: "", modules: [] },
    ]);
  };

  const handleModuleChange = (unitIndex, moduleIndex, field, value) => {
    const newUnits = [...units];
    if (!newUnits[unitIndex].modules[moduleIndex]) {
      newUnits[unitIndex].modules[moduleIndex] = {
        title: "",
        contentFile: null,
      };
    }
    newUnits[unitIndex].modules[moduleIndex][field] = value;
    setUnits(newUnits);
  };

  const addModule = (unitIndex) => {
    const newUnits = [...units];
    newUnits[unitIndex].modules.push({ title: "", contentFile: null });
    setUnits(newUnits);
  };

  const handleFileChange = (unitIndex, moduleIndex, file) => {
    const newUnits = [...units];
    newUnits[unitIndex].modules[moduleIndex].contentFile = file;
    setUnits(newUnits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store IDs of created resources for cleanup
    const createdResources = [];

    try {
      // Create SubTopic
      const subtopicResponse = await axios.post(
        `/api/v1/admin/study-material/create-subtopic/${topicId}`,
        {
          title: subtopic.title,
          description: subtopic.description,
          prerequisites: subtopic.prerequisites,
          cover_image: subtopic.cover_image,
        }
      );
      const subtopicId = subtopicResponse.data.data.uuid;
      createdResources.push({ type: "subtopic", id: subtopicId });

      // Create Units and Modules
      for (const unit of units) {
        const unitResponse = await axios.post(
          `/api/v1/admin/study-material/create-unit/${subtopicId}`,
          {
            title: unit.title,
            description1: unit.description1,
            description2: unit.description2,
          }
        );

        const unitId = unitResponse.data.data.uuid;
        createdResources.push({ type: "unit", id: unitId });

        // Create Modules for each Unit
        for (const module of unit.modules) {
          const formData = new FormData();
          formData.append("title", module.title);
          formData.append("contentFile", module.contentFile);
          console.log(module.title);
          console.log(module.contentFile);
          await axios.post(
            `/api/v1//admin/study-material/create-module/${unitId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }

      alert("Content created successfully!");
    } catch (error) {
      console.error("Error creating content:", error);
      alert("Error creating content. Please try again.");

      // Cleanup created resources
      await cleanupCreatedResources(createdResources);
    }
  };

  // Cleanup function to delete created resources
  const cleanupCreatedResources = async (resources) => {
    for (const resource of resources) {
      try {
        if (resource.type === "subtopic") {
          await axios.delete(
            "/api/v1/admin/study-material/delete-subtopic",
            resource.id
          );
        } else if (resource.type === "unit") {
          await axios.delete(
            "/api/v1/admin/study-material/delete-unit",
            resource.id
          );
        }
      } catch (cleanupError) {
        console.error(
          `Error cleaning up ${resource.type} with ID ${resource.id}:`,
          cleanupError
        );
      }
    }
  };

  return (
    <>
      <div className="heading flex flex-row-reverse justify-around items-center">
        <div className="relative">
          <h1 className="text-4xl font-imprima font-bold tracking-wider">
            Add Study <span className="text-blue-600">Materials</span>
          </h1>
          <img
            src={curveLineVector}
            alt="curve_line"
            className="absolute top-[100%] left-[15%] translate-x-[15%] translate-y-[50%]"
          />
        </div>
        <img src={admin_sm} alt="add study materials" />
      </div>
      <div className="formContainer bg-blue-100 rounded-[20px] p-3 md:p-6">
        <form onSubmit={handleSubmit}>
          <div className="w-full grid grid-cols-1 gap-4">
            <div className="topic w-full bg-white p-4">
              <h1 className="capitalize text-3xl font-semibold my-4">
                Add / Select <span className="text-blue-600">Topic</span>
              </h1>
              <hr className="w-48 h-2 mb-4 bg-blue-700 border-0" />
              {/* Select Existing Topic */}
              <Select
                label="Select Existing Topic"
                name="existingTopics"
                value={selectedTopic}
                onChange={handleTopicChange}
                options={existingTopics.map((topic) => ({
                  value: topic.uuid,
                  label: topic.title,
                }))}
                className="w-full"
              />

              {/* Input for New Topic */}
              <Input
                label="New Topic"
                value={newTopic}
                onChange={handleNewTopicChange}
                required
                disabled={isExistingTopicSelected} // Disable if an existing topic is selected
              />
            </div>
            <div className="subtopic grid grid-cols-1 bg-white p-4">
              <h1 className="capitalize text-3xl font-semibold my-4">
                Add <span className="text-blue-600">Subtopic</span>
              </h1>
              <hr className="w-28 h-2 mb-4 bg-blue-700 border-0" />

              <FileUpload
                label="Upload Poster"
                content="poster"
                onChange={(e) =>
                  setSubtopic({ ...subtopic, cover_image: e.target.files[0] })
                }
                className="col-span-1 mt-4 mb-6"
              />

              <Input
                label="Subtopic Title"
                value={subtopic.title}
                onChange={(e) =>
                  setSubtopic({ ...subtopic, title: e.target.value })
                }
                required
              />

              <TextArea
                label="Description"
                value={subtopic.description}
                onChange={(e) =>
                  setSubtopic({ ...subtopic, description: e.target.value })
                }
                required
              />
              <h3 className="mt-4">Prerequisites</h3>
              {subtopic.prerequisites.map((prerequisite, index) => (
                <div key={index}>
                  <Input
                    label={`Prerequisite ${index + 1}`}
                    value={prerequisite}
                    onChange={(e) =>
                      handlePrerequisiteChange(index, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <Button
                title="Add Prerequisite"
                btnColor="gradientBtnColor"
                className="mt-4"
                onHandleClick={addPrerequisite}
              />
            </div>
            <div className="unit-module grid grid-cols-1 bg-white p-4">
              <h1 className="capitalize text-3xl font-semibold my-4">
                Add <span className="text-blue-600">Unit</span>
              </h1>
              <hr className="w-16 h-2 mb-4 bg-blue-700 border-0" />
              {units.map((unit, unitIndex) => (
                <div key={unitIndex}>
                  <Input
                    label="Unit Title"
                    value={unit.title}
                    onChange={(e) =>
                      handleUnitChange(unitIndex, "title", e.target.value)
                    }
                    required
                  />
                  <TextArea
                    label="Description 1"
                    value={unit.description1}
                    onChange={(e) =>
                      handleUnitChange(
                        unitIndex,
                        "description1",
                        e.target.value
                      )
                    }
                    className="col-span-2"
                    required
                  />
                  <TextArea
                    label="Description 2"
                    value={unit.description2}
                    onChange={(e) =>
                      handleUnitChange(
                        unitIndex,
                        "description2",
                        e.target.value
                      )
                    }
                    className="col-span-2"
                    required
                  />

                  <h1 className="capitalize text-3xl font-semibold my-4">
                    Add <span className="text-blue-600">Module</span>
                  </h1>
                  <hr className="w-28 h-2 mb-4 bg-blue-700 border-0" />
                  {unit.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="grid grid-cols-1">
                      <Input
                        label="Module Title"
                        value={module.title}
                        onChange={(e) =>
                          handleModuleChange(
                            unitIndex,
                            moduleIndex,
                            "title",
                            e.target.value
                          )
                        }
                        required
                      />
                      <FileUpload
                        label="Upload Content"
                        content="content"
                        onChange={(file) =>
                          handleFileChange(unitIndex, moduleIndex, file)
                        }
                        className="my-4"
                      />
                    </div>
                  ))}
                  <Button
                    title="Add Module"
                    btnColor="gradientBtnColor"
                    className="mt-4"
                    onHandleClick={() => addModule(unitIndex)}
                  />
                </div>
              ))}
              <Button
                title="Add Unit"
                btnColor="gradientBtnColor"
                className="mt-4"
                onHandleClick={addUnit}
              />
            </div>
            <Button
              type="submit"
              title="Create"
              btnColor="gradientBtnColor"
              className="mt-4"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSM;
