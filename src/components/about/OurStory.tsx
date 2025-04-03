
import React from "react";
import StoryContent from "./StoryContent";
import FloatingAvatars from "./FloatingAvatars";

const OurStory = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <StoryContent />
          <FloatingAvatars />
        </div>
      </div>
    </section>
  );
};

export default OurStory;
