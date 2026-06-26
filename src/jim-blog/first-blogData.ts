import type { BlogPost } from "./types";

const post: BlogPost = {
  slug: "first-blog",
  title: "My First Blog Post",
  date: "2026-06-26",
  summary:
    "A small rundown of myself and trying out using my website as a blog.",
  tags: ["Intro"],
  body: [
    { type: "heading", text: "Who am I" },
    {
      type: "paragraph",
      text:
        "Hello there! I am Jim or James, and if you haven't read elsewhere on this website I am an aspiring engineer, be it electrical, software, or something I have yet to try. " +
        "I am currently working on finishing up my degree at Wayne State University (at the time of writing this) and am honestly excited about what the future of the tech space as a whole holds for my generation. " +
        "I am someone who has always enjoyed automation in many ways and with the rise of so many new great tools, building out new and exciting apps or features has never been so quick. " +
        "With it comes a lot of responsibility to learn and grow to the new form the space has taken, so I am looking forward to eventually getting my feet wet with a proper tech project somewhere. ",
    },
    { type: "heading", text: "Writing a Blog" },
    {
      type: "paragraph",
      text:
        "I am not traditionally someone who likes to make posts on social medias or publicize information about myself that I don't find helpful to myself or others. " +
        "With that being said I do want to come back to here and on a semi regular basis add to a small personal blog with my corner of the internet for anyone that may read it. " +
        "I hope to either document my own personal journey, projects I work on with challenges I overcome, or simple how-to's for things I work on and want to have a reference to for myself and others. " +
        "I am going to keep this one short just to test that my github workflow fires off right and make sure cloudflare doesn't throw anything unexpected my way, but if you did read to here thank you for your time reading this!",
    },
  ],
};

export default post;
