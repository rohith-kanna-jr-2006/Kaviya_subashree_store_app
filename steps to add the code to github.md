To add your code to GitHub, you generally follow a three-step cycle: Stage, Commit, and Push. Here is how to do it using both the command line and the VS Code interface.

Method 1: Using the Command Line
This is the most flexible way and works in any environment.

Stage your changes: This tells Git which files you want to include in your next update.

powershell:
# To add every modified file in the project
git add . 
# OR to add a specific file
git add App.js

Commit your changes: This saves a "snapshot" of your staged files locally with a descriptive message.

powershell:
git commit -m "Fixed bottom navigation alignment and standardized icons"

Push to GitHub: This sends your local commits to the online repository.

powershell:
git push origin main


Method 2: Using VS Code Source Control (UI)
If you prefer a visual interface, VS Code makes this very easy:

1) Open Source Control: Click the icon that looks like a branch (or press Ctrl + Shift + G).
2) Stage Changes: Hover over the "Changes" list and click the + (plus) icon next to the files you want to add (this is the same as git add).
3) Commit: Type your message in the text box at the top (e.g., "Style updates") and click the Checkmark (Commit) button.
4) Push: Click the "Sync Changes" button at the bottom left (in the blue status bar) or click the three dots ... in the Source Control menu and select Push.

Pro-Tip: How to check what's happening
If you are ever unsure what state your code is in, run this command:

powershell:
git status

It will tell you exactly which files are modified, which are staged, and if you are ahead of your GitHub repository.