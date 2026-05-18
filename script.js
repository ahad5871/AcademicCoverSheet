const fields = ["type", "topic", "courseTitle", "courseCode", "experimentDate", "submissionDate", "studentName", "studentId", "section", "program", "studentDepartment", "teacherName", "designation", "teacherDepartment"];

fields.forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("input", updatePreview);
  el.addEventListener("change", updatePreview);
});

function formatDate(dateValue) {
  if (!dateValue) return "";
  const parts = dateValue.split("-");
  const year = parts[0]; const month = parts[1]; const day = parts[2];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return day + " " + monthNames[Number(month) - 1] + " " + year;
}

function formatTeacherDepartment(department) { if (!department) return ""; return "Department of " + department; }

function updatePreview() {
  document.getElementById("previewTitle").innerText = document.getElementById("type").value + " on";
  document.getElementById("pTopic").innerText = document.getElementById("topic").value;
  document.getElementById("pCourseTitle").innerText = document.getElementById("courseTitle").value;
  document.getElementById("pCourseCode").innerText = document.getElementById("courseCode").value;
  document.getElementById("pExperimentDate").innerText = formatDate(document.getElementById("experimentDate").value);
  document.getElementById("pSubmissionDate").innerText = formatDate(document.getElementById("submissionDate").value);
  document.getElementById("pStudentName").innerText = document.getElementById("studentName").value;
  document.getElementById("pStudentId").innerText = document.getElementById("studentId").value;
  document.getElementById("pSection").innerText = document.getElementById("section").value;
  document.getElementById("pProgram").innerText = document.getElementById("program").value;
  document.getElementById("pStudentDepartment").innerText = document.getElementById("studentDepartment").value;
  document.getElementById("pTeacherName").innerText = document.getElementById("teacherName").value;
  document.getElementById("pDesignation").innerText = document.getElementById("designation").value;
  document.getElementById("pTeacherDepartment").innerText = formatTeacherDepartment(document.getElementById("teacherDepartment").value);
}

async function downloadPDF() {
  const element = document.getElementById("coverPage");
  element.classList.add("exporting");
  const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#fff" });
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  pdf.addImage(canvas.toDataURL("image/jpeg", 1.0), "JPEG", 0, 0, 210, 297);
  pdf.save("AcademicCoverSheet.pdf");
  element.classList.remove("exporting");
}

updatePreview();