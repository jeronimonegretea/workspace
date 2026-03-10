# Git Cheat Sheet

This is a quick reference for common Git commands:

## Configuration

- `git config --global user.name "Your Name"`
- `git config --global user.email "you@example.com"`

## Basic Workflow

- `git init` - Initialize a new repository
- `git clone <repository>` - Clone a repository
- `git add <file>` - Stage changes
- `git commit -m "message"` - Commit staged changes
- `git status` - Show the working tree status
- `git log` - View commit history

## Branching

- `git branch` - List branches
- `git branch <name>` - Create a new branch
- `git checkout <branch>` - Switch branches
- `git merge <branch>` - Merge a branch into current

## Remote Repositories

- `git remote add origin <url>` - Add a remote
- `git push origin <branch>` - Push changes
- `git pull origin <branch>` - Fetch and merge

## Stashing

- `git stash` - Stash changes
- `git stash apply` - Reapply stashed changes

## Other Useful Commands

- `git diff` - Show changes
- `git reset --hard` - Reset working tree
- `git rebase` - Reapply commits on top of another base

Feel free to add more commands as needed.
