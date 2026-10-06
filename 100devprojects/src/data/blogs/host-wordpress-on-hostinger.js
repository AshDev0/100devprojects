// Blog Post: How to Host a WordPress Website on Hostinger
// Author: Ashwani
// Status: DRAFT — every TODO(ashwani) and [SCREENSHOT: ...] must be resolved before publishing.

export const hostWordpressOnHostingerBlog = {
  id: 13,
  title: "How to Host a WordPress Website on Hostinger - Step-by-Step Setup Guide for Beginners",
  slug: "how-to-host-wordpress-website-on-hostinger",
  category: "Tutorial",
  author: "Ashwani",
  datePublished: "TODO", // TODO(ashwani): set to the real publish date (YYYY-MM-DD) when publishing
  readTime: "12 min read",

  meta: {
    title: "Hostinger WordPress Setup: Host Your Website Step by Step",
    description:
      "A beginner-friendly Hostinger WordPress setup guide: pick a plan, connect a domain, install WordPress from hPanel, enable SSL and configure your first settings.",
    keywords: [
      "hostinger wordpress setup",
      "how to host wordpress website on hostinger",
      "install wordpress on hostinger",
      "hostinger hpanel wordpress",
      "wordpress hosting for beginners india",
      "wordpress ssl https setup",
      "wordpress first settings"
    ],
    canonicalUrl:
      "https://100devprojects.in/blog/how-to-host-wordpress-website-on-hostinger"
  },

  excerpt:
    "Set up your first WordPress website on Hostinger, step by step. Choose a plan, connect your domain, install WordPress from hPanel, turn on free SSL, and get the essential settings and plugins right from day one.",

  affiliate: { partner: "hostinger", sub: "wp-setup" },

  content: `
Want your own website but not sure where to start? This guide walks you through hosting a **WordPress** website on **Hostinger**, from buying a plan to checking your site's speed.

It is written for beginners and students. You do not need to know how to code. If you can fill in a form and click a few buttons, you can follow along.

By the end, you will have:
- A live WordPress website on your own domain
- HTTPS (the padlock in the browser) working on every page
- Clean permalinks, the right timezone and no sample content
- A small set of free plugins for caching, backups and SEO
- A baseline speed report from PageSpeed Insights

Let's get started.

---

## What you need before you start

Keep these ready before you begin. It makes the whole setup much faster.

- **An email address** you check regularly. Your hosting account, invoices and WordPress admin emails go here.
- **A payment method.** TODO(ashwani): list the payment methods Hostinger accepts in India (verify on the Hostinger checkout page).
- **A domain name idea.** Short, easy to spell and easy to say out loud. Have two or three backups in case your first choice is taken.
- **About one hour** of uninterrupted time.
- **A notes file or password manager** to save your hPanel login, WordPress admin login and any passwords you create.

Tip: Never reuse your email password for your WordPress admin account. Use a long, unique password.

---

## Choosing a hosting plan

Hostinger offers more than one type of hosting, so pick the plan before anything else.

TODO(ashwani): add a short comparison of the current Hostinger plans suitable for a first WordPress site (plan names, number of websites, storage, whether a free domain is included). Take every detail from the official Hostinger pricing page on the day you publish. No prices in this post.

When comparing plans, check these points on the official plan page:

- **Number of websites** you can host on the plan
- **Storage and bandwidth** limits
- **Whether a free domain** is included, and for how long
- **Whether SSL** is included
- **Backups** (how often they run, and whether they are included)
- **Renewal price**, not just the first-term price

Tip: Many hosting providers charge less per month for longer terms, and renewal prices are often higher than the first term. Check both before you commit.

[SCREENSHOT: Hostinger pricing page showing the plan section, with the plan used in this tutorial highlighted]

:::cta hostinger wp-setup

---

## Buying or connecting a domain

Your domain is your website's address, like **yourname.in**. You have two options.

### Option 1: Register a new domain with Hostinger

TODO(ashwani): confirm whether the plan used in this tutorial includes a free domain, and the exact steps to claim it in hPanel.

1. Log in to hPanel.
2. Open the domains section. TODO(ashwani): confirm the exact menu name and path.
3. Search for the domain you want and complete the registration.
4. Verify your email if the registrar asks you to. Unverified domains can be suspended.

[SCREENSHOT: hPanel domain search / domain claim screen]

### Option 2: Connect a domain you already own

If you bought your domain somewhere else (GoDaddy, Namecheap, BigRock, etc.), you need to point it to Hostinger.

1. In hPanel, find the nameservers for your hosting account. TODO(ashwani): add the exact nameserver values and where hPanel shows them.
2. Log in to your domain registrar's dashboard.
3. Replace the existing nameservers with Hostinger's nameservers and save.
4. Wait for DNS propagation. This usually happens within a few hours but can take up to 48 hours.

[SCREENSHOT: hPanel screen showing the nameservers to use]
[SCREENSHOT: Example registrar screen where nameservers are changed]

Tip: While DNS is propagating, your site may load for some people and not for others. That is normal. Do not keep changing settings during this time.

---

## Installing WordPress from hPanel

hPanel is Hostinger's control panel. You can install WordPress from it without uploading any files yourself.

TODO(ashwani): write the exact click-path for the current hPanel version (menu names change over time). Capture one screenshot per step.

1. Log in to hPanel and start adding a new website. TODO(ashwani): exact button/menu name.
2. Choose **WordPress** as the platform.
3. Create your **WordPress admin account**: email, a strong password and the site language.
4. Select the domain you want to install WordPress on.
5. If the installer offers optional themes or plugins and you are unsure, skip them. You can add them later.
6. Wait for the installation to finish.

[SCREENSHOT: hPanel "add website" / platform selection screen]
[SCREENSHOT: WordPress admin account creation form (blur the email and password)]
[SCREENSHOT: Installation complete screen]

Once it is done, open **yourdomain.com/wp-admin** in your browser and log in with the admin account you just created. This is your **WordPress Dashboard**.

[SCREENSHOT: WordPress Dashboard after first login]

---

## Free SSL and forcing HTTPS

An SSL certificate lets your site load over **HTTPS**. Browsers show a padlock instead of a "Not secure" warning, and visitors' data is encrypted in transit. Google also uses HTTPS as a ranking signal.

TODO(ashwani): confirm in Hostinger's docs whether SSL is included free with the plan used here, whether it is installed automatically, and the exact hPanel path to check its status.

### Step 1: Check that SSL is active

1. In hPanel, open the SSL section for your website. TODO(ashwani): exact menu path.
2. Make sure the certificate status shows as active for your domain.
3. If it is still being set up, wait. New certificates can take a little time to issue, especially right after DNS changes.

[SCREENSHOT: hPanel SSL status showing an active certificate]

### Step 2: Force HTTPS

Having a certificate is not enough. Visitors who type **http://** should be redirected to **https://** automatically.

1. Turn on the "force HTTPS" option in hPanel. TODO(ashwani): confirm this option exists and where it is.
2. In WordPress, go to **Settings → General**.
3. Make sure both **WordPress Address (URL)** and **Site Address (URL)** start with **https://**.
4. Save changes, then log in again if WordPress asks you to.

[SCREENSHOT: hPanel force HTTPS toggle]
[SCREENSHOT: WordPress Settings → General with both URLs using https://]

Test it: open **http://yourdomain.com** in a private window. It should end up on **https://yourdomain.com** with the padlock showing.

---

## Essential first settings

Spend five minutes on these settings now. Changing some of them later, especially permalinks, can break links that are already shared or indexed.

### Permalinks

1. Go to **Settings → Permalinks**.
2. Select **Post name**.
3. Click **Save Changes**.

Your post URLs now look like **yourdomain.com/my-first-post** instead of **yourdomain.com/?p=123**. They are cleaner, easier to share and better for SEO.

[SCREENSHOT: Settings → Permalinks with "Post name" selected]

### Timezone, date and site title

1. Go to **Settings → General**.
2. Set **Site Title** and **Tagline** to describe your website.
3. Under **Timezone**, choose **Kolkata** (UTC+5:30) if you are in India.
4. Pick the date format you prefer and save.

The correct timezone matters because scheduled posts publish according to it.

[SCREENSHOT: Settings → General showing Site Title, Tagline and Timezone]

### Delete the sample content

A fresh WordPress install includes demo content. Remove it before anyone visits.

- **Posts → All Posts:** move the **Hello world!** post to Trash.
- **Pages → All Pages:** delete the **Sample Page** (and any other demo pages you will not use).
- **Comments:** delete the sample comment.
- **Plugins → Installed Plugins:** deactivate and delete plugins you did not choose and do not need.
- **Appearance → Themes:** keep your active theme plus one default theme as a backup. Delete the rest.

[SCREENSHOT: Posts screen with "Hello world!" being moved to Trash]

---

## Must-have plugins for a new site

You do not need dozens of plugins. Every extra plugin is more code to update and another thing that can break. Start with these three free ones, all from **Plugins → Add New Plugin**.

### 1. LiteSpeed Cache (speed)

LiteSpeed Cache is a free caching and optimisation plugin. Its server-level caching only works on servers that run LiteSpeed.

TODO(ashwani): confirm from Hostinger's docs that the plan used here runs on LiteSpeed, and whether LiteSpeed Cache comes pre-installed.

After activating it, the default settings are a reasonable start. Avoid turning on every optimisation at once. Change one setting, test your site, then move on.

[SCREENSHOT: LiteSpeed Cache dashboard after activation]

### 2. A backup plugin (safety)

A free backup plugin such as **UpdraftPlus** lets you save copies of your site to cloud storage like Google Drive.

1. Install and activate the plugin.
2. Connect a remote storage location (do not keep backups only on the same server).
3. Set a schedule, for example weekly files and daily database backups.
4. Run one manual backup right now so you have a clean starting point.

TODO(ashwani): mention what backups Hostinger itself provides on this plan, from its docs.

[SCREENSHOT: Backup plugin settings with a remote storage connected]

### 3. An SEO plugin (search visibility)

Install **one** free SEO plugin, such as **Yoast SEO** or **Rank Math**. Never run two SEO plugins at the same time, because they output duplicate meta tags.

Use the setup wizard to:
- Set your site name and logo
- Generate an XML sitemap
- Choose which content types should appear in search results

Then submit the sitemap URL in **Google Search Console**.

[SCREENSHOT: SEO plugin setup wizard]

---

## Speed check with PageSpeed Insights

Now measure where you stand, so you have a baseline to compare against later.

1. Open **pagespeed.web.dev** in your browser.
2. Enter your homepage URL and click **Analyze**.
3. Check both the **Mobile** and **Desktop** tabs. Focus on mobile first: Google uses mobile-first indexing.
4. Look at the **Core Web Vitals**: LCP (loading), INP (responsiveness) and CLS (layout shifts).
5. Scroll down to the **Diagnostics** and **Opportunities** for specific fixes.

[SCREENSHOT: PageSpeed Insights mobile report for the tutorial site]

TODO(ashwani): add the real before/after scores from your own test site. Do not write any numbers you have not measured.

Common quick wins for new sites:
- Compress images before uploading them, and keep them close to the size they are shown at
- Use a lightweight theme
- Remove plugins you are not using
- Let your caching plugin handle page caching

---

## Common errors and fixes

### "Error establishing a database connection"

WordPress cannot reach its database. On a fresh install, it is often temporary. Wait a few minutes and refresh. If it continues, check that the database name, user and password in **wp-config.php** match the database in hPanel. TODO(ashwani): add the hPanel path to the database section.

### "Too many redirects" after enabling HTTPS

This usually means two settings are fighting each other. Check that both URLs in **Settings → General** use **https://**, keep only one "force HTTPS" method active, and clear your browser cache and your caching plugin's cache.

### "Not secure" warning even with SSL active

This is usually **mixed content**: some images or scripts still load over **http://**. Update old URLs to **https://**, then re-check the page. Your browser's developer console lists the exact files causing the warning.

### Domain shows a parking page or does not load

DNS changes have not finished propagating, or the nameservers were entered incorrectly. Double-check the nameservers at your registrar and give it up to 48 hours.

### White screen or "There has been a critical error"

A plugin or theme is usually the cause, often right after an update. Deactivate the most recently installed or updated plugin. If you cannot reach the dashboard, rename that plugin's folder inside **wp-content/plugins** using the File Manager. TODO(ashwani): add the hPanel path to the File Manager.

### Forgot your WordPress admin password

Click **Lost your password?** on the login page to get a reset link by email. TODO(ashwani): check whether hPanel also offers an admin password reset, and where.

---

## FAQ

### Is Hostinger good for beginners?

TODO(ashwani): answer from your own experience setting up this tutorial site. Only include what you actually saw.

### Do I need coding knowledge to host a WordPress website?

No. Everything in this guide is done through hPanel and the WordPress Dashboard. Coding helps later if you want to customise your theme, but it is not needed to launch.

### Can I move my existing WordPress site to Hostinger?

TODO(ashwani): confirm from Hostinger's docs whether migration is offered, and on which plans.

### Do I get a free domain?

TODO(ashwani): confirm from the Hostinger plan page whether the plan used here includes a free domain and for how long.

### How long does it take for a new website to appear on Google?

There is no fixed time. Submitting your sitemap in Google Search Console and publishing useful content helps Google discover your pages faster.

### WordPress.com vs WordPress.org — which one is this?

This guide uses **self-hosted WordPress** (the software from WordPress.org) installed on your own hosting. WordPress.com is a separate hosted service with its own plans.

---

## What's next?

Your site is live, secure and set up properly. Next, pick a lightweight theme, create your key pages (Home, About, Contact, Privacy Policy) and publish your first post.

If you also want to learn how websites work under the hood, try building one of our hands-on [JavaScript projects](/projects). Knowing HTML, CSS and JavaScript makes customising WordPress much easier.

Happy building!
  `,

  tags: [
    "wordpress",
    "hostinger",
    "web-hosting",
    "tutorial",
    "beginner",
    "ssl",
    "wordpress-plugins"
  ],
  relatedProjects: [],
  featured: true,
  views: 0
};
