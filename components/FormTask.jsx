import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useState, useMemo } from "react";

const FormTask = ({
  type,
  persons,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Choose persons for this task "]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    //() => Array.from((person) => selectedKeys.has(person.id)).map((person) => person.name).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  // Update the post state with selected person IDs
  const handleSelectedKeysChange = (newKeys) => {
    setSelectedKeys(newKeys);

    // Convert selected keys to an array of person IDs
    const selectedPersonIds = Array.from(newKeys).map(Number);

    // Update the post state with the selected person IDs
    setPost({ ...post, selectedPersonIds });
  };
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Task </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} a task and make sure to enter the right informations.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Task Name
          </span>
          <input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            placeholder="Write task name here ..."
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description {` `}
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="Write description here ..."
            required
            className="form_textarea"
          />
        </label>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Multiple selection example"
            variant="flat"
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectedKeysChange}
          >
            {persons.map((person) => (
              <DropdownItem key={person.id}>{person.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1 text-sm rounded-full bg-primary-orange text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormTask;
