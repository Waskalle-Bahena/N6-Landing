# N6 Solutions Landing Page

A modern, premium landing page for N6 Solutions - a software engineering and digital platform partner for growing businesses.

![N6 Solutions](https://img.shields.io/badge/N6-Solutions-blue)
![Status](https://img.shields.io/badge/status-production-success)
![License](https://img.shields.io/badge/license-proprietary-red)

## Overview

This landing page positions N6 Solutions as a modern software engineering consultancy, moving away from traditional web design agency aesthetics to a premium, enterprise-ready SaaS-inspired design inspired by companies like Vercel, Stripe, Linear, and Raycast.

## Features

- **Dark Theme Design** - Premium dark theme with subtle gradients and soft glow accents
- **Modern Typography** - Inter font family for clean, enterprise-grade typography
- **Smooth Animations** - Scroll-triggered fade-in animations and 3D card hover effects
- **Responsive Design** - Fully responsive across all device sizes
- **Telegram Integration** - Contact form sends messages directly to Telegram bot
- **Modern Sections**:
  - Hero with gradient text and animated background
  - Services (Platform Engineering, Ecommerce, Custom Software, APIs, Technical Support)
  - Why N6 (Modern Stack, Scalability, Performance, Technical Ownership)
  - Technologies showcase
  - Process workflow
  - Case Studies
  - Enterprise-style CTA
  - Contact form
  - Minimal footer

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom CSS with CSS variables
- **Bootstrap 4** - Grid system and responsive utilities
- **Vanilla JavaScript** - Smooth scroll, animations, form handling
- **PHP** - Telegram bot integration
- **Telegram Bot API** - Contact form notifications

## Project Structure

```
n6-landing/
├── assets/
│   ├── bootstrap/          # Bootstrap CSS framework
│   ├── css/
│   │   └── n6-modern.css   # Custom modern styling
│   ├── images/
│   │   └── n6logo-166x166.png
│   ├── js/
│   │   └── n6-modern.js    # Custom JavaScript
│   └── popper/             # Popper.js for Bootstrap
├── Classes/
│   └── PHPMailer/          # Legacy email library (not used)
├── Functions/
│   ├── sendMail.php        # Legacy email handler (not used)
│   └── sendTelegram.php    # Telegram bot handler
├── index.html              # Main landing page
└── README.md               # This file
```

## Installation

### Prerequisites

- Web server (Apache, Nginx, or PHP built-in server)
- PHP 7.0 or higher
- cURL extension for PHP

### Setup

1. **Clone or download the project**

```bash
cd /var/www/n6-landing
```

2. **Configure Telegram Bot**

Create a Telegram bot via [@BotFather](https://t.me/BotFather) and obtain:
- Bot Token
- Chat ID (get from [@userinfobot](https://t.me/userinfobot))

3. **Update Telegram Configuration**

Copy the example config file and add your credentials:

```bash
cp config.telegram.example.php config/telegram.php
```

Edit `config/telegram.php`:

```php
return [
    'bot_token' => 'YOUR_BOT_TOKEN_HERE',
    'chat_id' => 'YOUR_CHAT_ID_HERE'
];
```

**Security Note:** The `config/` directory is in `.gitignore` to prevent committing sensitive credentials to version control.

4. **Start the Server**

Using PHP built-in server:
```bash
php -S localhost:8000
```

Or configure with Apache/Nginx for production.

## Configuration

### Telegram Bot Setup

1. Start a conversation with [@BotFather](https://t.me/BotFather)
2. Create a new bot with `/newbot`
3. Copy the bot token
4. Send a message to your bot
5. Get your chat ID from [@userinfobot](https://t.me/userinfobot)
6. Update the credentials in `Functions/sendTelegram.php`

### Customization

#### Colors

Edit CSS variables in `assets/css/n6-modern.css`:

```css
:root {
  --bg-primary: #000000;
  --gradient-cyan: #00d4ff;
  --gradient-blue: #3b82f6;
  --gradient-purple: #8b5cf6;
  /* ... more variables */
}
```

#### Content

Edit HTML content in `index.html`:
- Hero headline and description
- Service descriptions
- Case study content
- Contact information

#### Logo

Replace `assets/images/n6logo-166x166.png` with your logo.

## Contact Form

The contact form uses Telegram Bot API for notifications. When a user submits the form:

1. Form data is validated (name, email, message required)
2. Data is sent to `Functions/sendTelegram.php`
3. PHP script formats the message and sends to Telegram
4. User receives success/error notification via SweetAlert

### Form Fields

- **Name** (required, max 40 characters)
- **Email** (required, max 50 characters, validated)
- **Phone** (optional, max 15 characters)
- **Message** (required, max 500 characters)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized CSS with CSS variables
- Minimal JavaScript dependencies
- CDN-hosted jQuery
- Lazy loading animations via Intersection Observer
- Smooth scroll for better UX

## Security

- Input sanitization on server-side
- Email validation
- CSRF protection recommended for production
- Telegram bot token should be kept secure

## Deployment

### Production Checklist

- [ ] Update Telegram bot credentials
- [ ] Test contact form functionality
- [ ] Update social media links
- [ ] Update contact information
- [ ] Add analytics tracking
- [ ] Configure SSL certificate
- [ ] Set up proper error logging
- [ ] Enable caching headers

## Maintenance

### Regular Updates

- Keep Bootstrap updated
- Monitor Telegram bot API changes
- Update dependencies as needed
- Review and update case studies

## License

Proprietary - All rights reserved © 2024 N6 Solutions

## Support

For support or inquiries:
- Email: contacto@n6solutions.mx
- Phone: 33-24-97-19-98
- Website: https://n6solutions.mx

## Credits

- Design inspired by Vercel, Stripe, Linear, Raycast, Supabase, Resend
- Built with Bootstrap 4
- Icons: Emoji icons for services
- Font: Inter by Google Fonts

---

**N6 Solutions** - Engineering Digital Platforms That Scale
