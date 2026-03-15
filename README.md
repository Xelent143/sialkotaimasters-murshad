# Sialkot AI Masters Website

A modern, custom-coded website for Sialkot AI Masters — an AI solutions company serving Pakistani businesses.

## 🚀 Live Site
URL: www.sialkotaimasters.com (configure with your hosting)

## 📁 File Structure

```
website-sialkot-ai-masters/
├── index.html          # Home page
├── about.html          # About us page
├── services.html       # Services page
├── store.html          # AI Tools Store
├── contact.html        # Contact page
├── css/
│   ├── styles.css      # Main stylesheet (1000+ lines)
│   └── store.css       # Store-specific styles
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Upload your images here
└── README.md           # This file
```

## 🛠️ Setup Instructions

### 1. Stripe Integration

Replace `YOUR_STRIPE_PUBLISHABLE_KEY` in `js/main.js` with your actual Stripe publishable key:

```javascript
const stripe = Stripe('pk_live_YOUR_ACTUAL_KEY');
```

Replace the payment link in the `buyNow` function with your Stripe Payment Link:

```javascript
const stripeLink = 'https://buy.stripe.com/YOUR_ACTUAL_PAYMENT_LINK';
```

### 2. Form Backend (Optional)

The contact form currently shows a success message without sending. To make it functional:

**Option A:** Use Formspree (easiest)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B:** Connect to your own backend
```javascript
fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
})
```

### 3. Update Content

Replace placeholder content:
- Add your actual photos in `images/` folder
- Update testimonials with real customer feedback
- Add your LinkedIn profile URL in `about.html`
- Update Calendly link with your actual booking URL

### 4. Analytics (Optional)

Add Google Analytics or Facebook Pixel tracking code before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎨 Customization

### Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-900: #1a365d;    /* Main brand color */
    --accent-500: #f59e0b;     /* CTA/button color */
    /* ... more variables */
}
```

### Content
All text content is in the HTML files:
- Hero headlines: `index.html` (line ~45)
- Pricing: `store.html` (line ~89)
- Services: `services.html`

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Modern gradient design
- ✅ Smooth animations
- ✅ Stripe payment integration
- ✅ WhatsApp click-to-chat
- ✅ Mobile navigation
- ✅ FAQ accordion
- ✅ Form validation
- ✅ Toast notifications

## 🚀 Deployment

### Option 1: Netlify (Free)
1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Get instant HTTPS URL
3. Connect custom domain

### Option 2: Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Option 3: Traditional Hosting
1. Upload files via FTP/cPanel
2. Point domain to hosting
3. Ensure SSL certificate is installed

## 📞 Support

For questions or customizations:
- WhatsApp: 0302-2922242
- Email: saad@sialkotaimasters.com

---

Built with ❤️ by Sialkot AI Masters
