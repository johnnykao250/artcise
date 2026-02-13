# Git + GitHub + Vercel setup (push = auto deploy)

Do these in order. Use the same terminal (PowerShell or CMD) after installing Git.

---

## Start from scratch (one-time setup)

Open a terminal and run these **in order**. Replace the email and name with yours.

```bash
cd C:\Users\user\artcise

git config --global user.email "your-email@gmail.com"
git config --global user.name "Your Name"

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/johnnykao250/artcise.git
git push -u origin main
```

When `git push` runs, sign in to GitHub in the browser if it asks. Then go to [Vercel Dashboard](https://vercel.com/dashboard) → Add New → Project → Import **johnnykao250/artcise** → Deploy.

---

## 1. Install Git (one-time)

- Your browser should open to **https://git-scm.com/download/win**
- Download **64-bit Git for Windows** and run the installer
- Use default options (just click Next)
- When done, **close and reopen your terminal** (or Cursor) so `git` is recognized

---

## 2. Create a GitHub account (if you don’t have one)

- Go to **https://github.com/join**
- Sign up with your **Gmail** (or any email)
- Verify your email and finish sign-up

---

## 3. Create a new repository on GitHub

- Go to **https://github.com/new**
- **Repository name:** `artcise`
- Choose **Private** or **Public**
- Leave **“Add a README”** unchecked (you already have code)
- Click **Create repository**
- Keep the page open; you’ll need the repo URL (e.g. `https://github.com/YOUR_USERNAME/artcise`)

---

## 4. Push your project from your PC to GitHub

In a terminal, run these from your project folder (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd C:\Users\user\artcise

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/artcise.git
git push -u origin main
```

- **First time:** Git may ask for your **name** and **email** (for commits). Use any name and the same email as GitHub.
- **When you `git push`:** GitHub will ask you to sign in. Use **GitHub in the browser** (it will open a page to log in and authorize). Or use a **Personal Access Token** instead of a password: GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic), tick `repo`, then use the token as the password when Git asks.

---

## 5. Connect the repo to Vercel (auto deploy)

- Go to **https://vercel.com/dashboard**
- Click **Add New…** → **Project**
- Under **Import Git Repository**, choose **GitHub** and **authorize** if asked
- Select the **artcise** repo and click **Import**
- Leave **Framework Preset** as **Next.js**
- Click **Deploy**
- When it finishes, your site is live and **every push to `main` will auto-deploy**

---

## After setup: how to update the site

1. Edit your code in `C:\Users\user\artcise`
2. In the same folder, run:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

3. Vercel will build and update **artcise.vercel.app** (and **artcisebid.com** once the domain is connected) in about 1–2 minutes.

---

**Quick links**

- Git download: https://git-scm.com/download/win  
- GitHub sign up: https://github.com/join  
- New repo: https://github.com/new  
- Vercel dashboard: https://vercel.com/dashboard  
