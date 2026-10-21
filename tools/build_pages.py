"""Builds each subject's index.html from one shared template, so every page has the same header, nav and look.
Run from the repo root: python3 tools/build_pages.py"""
import os

SUBJECTS = [
    # folder, code, nav label, eyebrow, page title, lede, has tools.js
    ("social-studies", "ss", "Social Studies", "Grade 8 Social Studies", "Societies of the Past Atlas", None, False),
    ("science", "sci", "Science", "Grade 8 Science", "Science", "Lessons, diagrams and practice for every unit. Missed a day? Pick the unit, open the lesson and catch up.", True),
    ("ela", "ela", "ELA", "Grade 8 English Language Arts", "English Language Arts", "Lessons, stories and writing help. Missed a day? Pick the unit, open the lesson and catch up.", True),
    ("math", "math", "Math 7", "Grade 7 Mathematics", "Math 7", "Lessons and practice that makes new questions every time. Missed a day? Pick the unit, open the lesson and catch up.", True),
    ("critical-thinking", "ct", "Critical Thinking", "Grade 7/8 Enrichment", "Critical Thinking", "Puzzles, games and the thinking tools behind them.", True),
]

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caladea:wght@400;700&family=Carlito:ital,wght@0,400;0,700;1,400&display=swap">'
ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%231C3A5E'/%3E%3Ctext x='16' y='22' font-family='Georgia' font-size='17' font-weight='700' text-anchor='middle' fill='%23ffffff'%3EM%3C/text%3E%3C/svg%3E"

def nav(active):
    links = "".join(
        f'<a href="../{f}/"{" aria-current=\"page\"" if f == active else ""}>{label}</a>'
        for f, c, label, *_ in SUBJECTS)
    return f'<header class="topbar"><div class="wrap"><a class="home" href="../">Mr. Mangles\' Class</a><nav class="subnav" aria-label="Subjects">{links}</nav></div></header>'

def page(folder, code, label, eyebrow, title, lede, tools):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title} · Mr. Mangles' Class</title>
<meta name="description" content="{eyebrow}: lessons and practice for Mr. Mangles' class.">
<link rel="icon" href="{ICON}">
{FONTS}
<link rel="stylesheet" href="../assets/site.css">
</head>
<body data-subject="{code}">
{nav(folder)}
<section class="wrap head">
  <div class="eyebrow">{eyebrow}</div>
  <h1>{title}</h1>
  <p class="lede">{lede}</p>
  <div class="units" id="units" role="tablist" aria-label="Units"></div>
</section>
<main id="main"></main>
<div class="lightbox" id="lightbox" hidden><img id="lbimg" alt=""><p id="lbcap"></p></div>
<footer class="site"><div class="wrap">Mr. Mangles' Class · École Edward Schreyer School · 2026–27</div></footer>
<script src="data.js"></script>
{'<script src="tools.js"></script>' if tools else ''}
<script src="../assets/hub.js"></script>
</body>
</html>
"""

if __name__ == "__main__":
    for s in SUBJECTS:
        folder = s[0]
        if folder == "social-studies":
            continue
        if not os.path.exists(os.path.join(folder, "data.js")):
            continue
        tools = s[6] and os.path.exists(os.path.join(folder, "tools.js"))
        with open(os.path.join(folder, "index.html"), "w") as f:
            f.write(page(*s[:6], tools))
        print("built", folder)
