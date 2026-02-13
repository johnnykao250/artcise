# View Artcise on your desktop (127.0.0.1)

## Quick try – port 3001

1. Double-click **`START_SERVER.bat`** in this folder.
2. Wait until the window shows **"✓ Ready"** or **"Local: http://localhost:3001"**.
3. Open your browser and go to: **http://127.0.0.1:3001**

(We use port **3001** because 3000 is sometimes blocked on Windows.)

---

## If it still doesn’t load

**A. What does the black window show?**
- If it closes right away → Node might not be installed or not on PATH. Install from https://nodejs.org (LTS).
- If you see “Error: listen EADDRINUSE” → something is using the port. Restart the PC and try again, or we can change to another port.
- If you see “Ready” but the browser can’t connect → try **http://localhost:3001** instead of 127.0.0.1, or temporarily turn off Windows Firewall / VPN to test.

**B. Use the live site instead**  
Your site is always available at: **https://artcise.vercel.app**
