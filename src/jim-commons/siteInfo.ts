// Static site info for the portfolio.
//
// This used to be backed by Firebase/Firestore. The site is now fully static,
// so the values below are plain client-side data. Edit `aboutMe` to your own
// bio.

const aboutMe =
  "Hi, I'm Jim Weaver. I'm a Computer Science and Electrical & Computer Engineering student at Wayne State University, graduating in 2028. " +
  "I like to build and self-host full-stack software like chat services, AI tooling, and game servers, all running on bare metal I own and maintain. " +
  "I am currently working to build out projects that I think are good to learn from or build out solutions to problems I have with modern software.";

export default function useGeneralInfo() {
  return { aboutMe };
}
