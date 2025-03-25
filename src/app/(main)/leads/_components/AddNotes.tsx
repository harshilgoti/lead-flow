"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AddNote = () => {
  const [showNote, setShowNote] = useState(false);
  return (
    <div>
      <Button variant={"outline"} onClick={() => setShowNote(!showNote)}>
        Add Note
      </Button>
      {showNote && "Notes"}
    </div>
  );
};

export default AddNote;
