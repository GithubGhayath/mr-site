// Central place for external links & tweakable constants.
export const config = {
  // The application repository (browser URL — the SSH clone form doesn't open in a browser).
  GITHUB_REPO: 'https://github.com/GithubGhayath/Automating-slicing-machine-new-UI-new',
  EMAIL: 'businesscloude@gmail.com',
  university: {
    name: { en: 'Damascus University', ar: 'جامعة دمشق' },
    dept: {
      en: 'Department of Mechanical Design Engineering',
      ar: 'قسم هندسة التصميم الميكانيكي',
    },
  },
  // Thesis PDF in /public. Viewing is open; the download action asks for a
  // request instead (see components/ThesisRequest.jsx).
  THESIS_PDF: 'thesis.pdf',
  // Optional public form endpoint (Formspree / Web3Forms / Getform ...) used to
  // post thesis access requests. Supplied at build time via
  // VITE_THESIS_FORM_ENDPOINT — it is a public endpoint id, never a secret, and
  // it is never committed. With no endpoint set, requests are handed to the
  // visitor's own mail client instead. A static site has no server and must
  // never carry mail credentials.
  THESIS_REQUEST_ENDPOINT: import.meta.env.VITE_THESIS_FORM_ENDPOINT || '',
  // Drop the project video into /public and set the filename here.
  PROJECT_VIDEO: '', // e.g. 'project-video.mp4'
  // Production-line layout image in /public (annotated Wood-Mizer MR200 line render).
  PRODUCTION_LINE_IMG: 'production-line.jpg',
  // Web-ready 3D model of the machine in /public, shown in the Gallery.
  // SolidWorks cannot be read by a browser, so export the part as glTF/GLB
  // (File > Save As > .GLB, SolidWorks 2019+) or STL and name it here.
  MACHINE_MODEL: 'machine/smrm.glb',
  // Desktop-application demo video in /public (shown in the Software section).
  APP_DEMO_VIDEO: 'app-demo.mp4',
};
