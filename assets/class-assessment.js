/* A draft is scoped to the assessment and this browser tab. Printable answers
   use normal flowing text so long responses are never clipped by a textarea. */
(() => {
  const page = document.querySelector(".assessment");
  const fields = [...page.querySelectorAll("[data-answer]")];
  const key = "grade8-assessment-v1:" + page.dataset.file;
  const status = document.getElementById("work-status");
  let canSave = true;
  try {
    const saved = JSON.parse(sessionStorage.getItem(key) || "{}");
    for (const field of fields) if (typeof saved?.[field.id] === "string") field.value = saved[field.id];
  } catch { canSave = false; }
  function syncPaper() {
    for (const field of fields) {
      const output = document.getElementById(field.id + "-paper");
      output.textContent = field.value;
      output.classList.toggle("filled", Boolean(field.value.trim()));
    }
  }
  function save() {
    syncPaper();
    try { sessionStorage.setItem(key, JSON.stringify(Object.fromEntries(fields.map(f => [f.id, f.value])))); }
    catch { canSave = false; }
    status.textContent = canSave ? "Draft kept in this tab." : "Download or print your answers before leaving this page.";
  }
  page.addEventListener("input", save);
  window.addEventListener("beforeprint", syncPaper);
  document.getElementById("print-test").onclick = () => { syncPaper(); window.print(); };
  document.getElementById("download-test").onclick = () => {
    const lines = [page.querySelector("h1").textContent, page.querySelector(".meta").textContent];
    for (const field of fields) lines.push("", field.labels[0].textContent.trim(), field.value.trim() || "[blank]");
    const url = URL.createObjectURL(new Blob([lines.join("\n")], {type:"text/plain;charset=utf-8"}));
    const a = document.createElement("a"); a.href = url; a.download = page.dataset.file + "-answers.txt";
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url),1500);
  };
  document.getElementById("clear-test").onclick = () => {
    for (const f of fields) f.value = "";
    save(); document.getElementById("reset-panel").open = false;
    status.textContent = "Ready for a new student."; fields[0].focus();
  };
  syncPaper();
})();
