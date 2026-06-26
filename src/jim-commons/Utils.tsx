export function openResumeInNewTab() {
  window.open("/JimWeaverResume.pdf", "_blank");
}

export function openGitHub() {
  window.open("https://github.com/Qdust41", "_blank");
}

export function openLinkedIn() {
  window.open("https://www.linkedin.com/in/james-weaver-43bba5308", "_blank");
}

export const EMAIL = "jim.weaver.work@gmail.com";

export function openEmail() {
  window.location.href = `mailto:${EMAIL}`;
}
