# BFAutomations Website

A modern, animated landing page for BFAutomations - an AI automation consultancy company.

## Features

- **Monochrome Design**: Clean black, white, and gray color scheme
- **GSAP Animations**: Smooth scroll-triggered animations and effects
- **Interactive Calendar**: Booking system with time slot selection
- **Responsive Design**: Works on all devices
- **Custom Cursor**: Animated cursor effect (desktop only)
- **3D Card Tilts**: Interactive hover effects on solution cards
- **Text Scramble**: Animated text effects on hero title
- **Parallax Effects**: Floating shapes with parallax scrolling

## File Structure

```
bfautomations_site1/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── app.js              # JavaScript functionality
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Quick Start

1. Open `index.html` in your browser
2. No build step required - it's vanilla HTML/CSS/JS

## Calendly Integration

The booking system now uses Calendly's embedded widget for seamless appointment scheduling. Calendly handles all the booking logic, calendar integration, and email confirmations automatically.

### Setup Instructions

1. **Sign up for Calendly** (if you haven't already):
   - Go to [calendly.com](https://calendly.com) and create an account
   - Set up your availability and create an event type (e.g., "30min Strategy Call")

2. **Get Your Calendly Embed Code**:
   - In Calendly, go to your event type settings
   - Click on "Share" → "Embed on Website"
   - Copy the embed code (it will look like the code already in `index.html`)

3. **Update the Embed URL**:
   - In `index.html`, find this line:
     ```html
     data-url="https://calendly.com/YOUR_CALENDLY_USERNAME/30min"
     ```
   - Replace `YOUR_CALENDLY_USERNAME` with your actual Calendly username
   - Make sure the event type matches what you created in Calendly

4. **Customize the Event** (Optional):
   - In Calendly, you can customize:
     - Event duration and name
     - Availability settings
     - Confirmation emails
     - Calendar integrations (Google Calendar, Outlook, etc.)
     - Custom questions for invitees

### How It Works

- Visitors see your available time slots directly on your website
- They select a time and fill out the booking form
- Calendly automatically:
  - Adds the event to your calendar
  - Sends confirmation emails to both you and the client
  - Handles time zone conversions
  - Manages rescheduling and cancellations

### Benefits of Calendly

- **Professional**: Clean, modern booking interface
- **Reliable**: Handles double-bookings and conflicts automatically
- **Integrated**: Connects with Google Calendar, Outlook, Zoom, etc.
- **Mobile-friendly**: Works perfectly on all devices
- **Analytics**: Track booking metrics and performance

### Customization Options

You can customize the Calendly widget by adding URL parameters:

```html
data-url="https://calendly.com/YOUR_USERNAME/30min?hide_event_type_details=1&hide_gdpr_banner=1"
```

Common parameters:
- `hide_event_type_details=1` - Hide event description
- `hide_gdpr_banner=1` - Hide GDPR banner
- `primary_color=000000` - Match your brand colors
- `text_color=ffffff` - Customize text color

### Alternative Options

If you prefer different booking systems:

#### Option 1: Google Calendar Appointment Scheduling
- Go to Google Calendar → Settings → Appointment scheduling
- Create appointment slots
- Share the booking link

#### Option 2: Other Booking Platforms
- Acuity Scheduling
- Bookwhen
- SimplyBook.me

## Customization

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --black: #0a0a0a;        /* Primary dark */
    --white: #fafafa;        /* Primary light */
    --gray-500: #737373;     /* Mid gray */
    /* ... etc */
}
```

### Update Content

Edit the HTML directly in `index.html`:
- Company name: Search for "BFAutomations"
- Stats: Update `data-target` attributes in hero section
- Services: Modify the solution cards
- Contact info: Update footer links

### Add More Animations

The site uses GSAP. Add new animations in `app.js`:

```javascript
gsap.from('.your-element', {
    scrollTrigger: {
        trigger: '.your-element',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8
});
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Tips

1. Images are not included - add your own to the `images/` folder
2. Consider lazy loading images below the fold
3. Minify CSS/JS for production
4. Use a CDN for faster loading

## Deployment

### Netlify
1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Get instant hosting with HTTPS

### Vercel
```bash
npm i -g vercel
vercel
```

### GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in settings
3. Select the main branch

## Credits

- Icons: [Lucide](https://lucide.dev/)
- Animations: [GSAP](https://greensock.com/gsap/)
- Fonts: System fonts (SF Mono, system-ui)

## License

This is a custom website created for BFAutomations.
