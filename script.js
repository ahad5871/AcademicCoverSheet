const fields = [
  "type",
  "topic",
  "courseTitle",
  "courseCode",
  "experimentDate",
  "submissionDate",
  "studentName",
  "studentId",
  "section",
  "program",
  "studentDepartment",
  "teacherName",
  "designation",
  "teacherDepartment"
];

fields.forEach(function (id) {
  const element = document.getElementById(id);

  element.addEventListener("input", updatePreview);
  element.addEventListener("change", updatePreview);
});

function formatDate(dateValue) {
  if (!dateValue) return "";

  const parts = dateValue.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return day + " " + monthNames[Number(month) - 1] + " " + year;
}

function formatTeacherDepartment(department) {
  if (!department) return "";
  return "Department of " + department;
}

function updatePreview() {
  const type = document.getElementById("type").value;

  document.getElementById("previewTitle").innerText = type + " on";

  document.getElementById("pTopic").innerText =
    document.getElementById("topic").value;

  document.getElementById("pCourseTitle").innerText =
    document.getElementById("courseTitle").value;

  document.getElementById("pCourseCode").innerText =
    document.getElementById("courseCode").value;

  document.getElementById("pExperimentDate").innerText =
    formatDate(document.getElementById("experimentDate").value);

  document.getElementById("pSubmissionDate").innerText =
    formatDate(document.getElementById("submissionDate").value);

  document.getElementById("pStudentName").innerText =
    document.getElementById("studentName").value;

  document.getElementById("pStudentId").innerText =
    document.getElementById("studentId").value;

  document.getElementById("pSection").innerText =
    document.getElementById("section").value;

  document.getElementById("pProgram").innerText =
    document.getElementById("program").value;

  document.getElementById("pStudentDepartment").innerText =
    document.getElementById("studentDepartment").value;

  document.getElementById("pTeacherName").innerText =
    document.getElementById("teacherName").value;

  document.getElementById("pDesignation").innerText =
    document.getElementById("designation").value;

  document.getElementById("pTeacherDepartment").innerText =
    formatTeacherDepartment(document.getElementById("teacherDepartment").value);
}

/* DEFAULT LOGO FALLBACK */
window.addEventListener("load", function () {
  const logo = document.getElementById("previewLogo");
  const placeholder = document.getElementById("logoPlaceholder");

  logo.onerror = function () {
    logo.style.display = "none";
    placeholder.style.display = "flex";
  };
});

/* STRICT ONE-PAGE A4 PDF EXPORT */
async function downloadPDF() {
  const element = document.getElementById("coverPage");

  element.classList.add("exporting");

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  });

  const imageData = canvas.toDataURL("image/jpeg", 1.0);

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  pdf.addImage(imageData, "JPEG", 0, 0, 210, 297);
  pdf.save("academic-cover-sheet.pdf");

  element.classList.remove("exporting");
}

/* INITIAL PREVIEW */
updatePreview();