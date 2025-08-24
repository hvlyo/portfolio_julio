# Modern Portfolio Website

A stunning, responsive personal portfolio website built with Next.js, featuring infinite scroll navigation, smooth animations, and modern design principles.

## 🚀 Features

### Core Functionality
- **Infinite Scroll Navigation** - Smooth section-to-section scrolling with progress indicator
- **Responsive Design** - Optimized for all devices (desktop, mobile, tablet)
- **Modern UI/UX** - Clean, professional design with subtle animations
- **Performance Optimized** - Lazy loading, optimized images, and smooth transitions

### Sections
1. **Hero Section** - Full-screen introduction with contact info and social links
2. **Case Studies** - Project showcase with detailed modals and expandable content
3. **Presentations & Decks** - PDF and presentation sharing with preview/download
4. **Visual Gallery** - Masonry layout with lightbox functionality for images/videos
5. **Creative Sandbox** - Interactive experiments and demos
6. **Contact** - Contact form with multiple communication channels

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **SEO Optimized** with proper metadata
- **Accessible** with ARIA labels and keyboard navigation
- **Dark Mode Ready** (easily implementable)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Intersection Observer**: react-intersection-observer
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information
Update the following files with your information:

1. **Hero Section** (`components/sections/Hero.tsx`)
   - Name and profession
   - Contact information
   - Social media links

2. **Metadata** (`app/layout.tsx`)
   - Page title and description
   - SEO keywords
   - Open Graph data

3. **Contact Information** (`components/sections/Contact.tsx`)
   - Email, phone, LinkedIn, WhatsApp
   - Contact form endpoints

### Content Updates

#### Case Studies
Edit `components/sections/CaseStudies.tsx`:
```typescript
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Project description",
    shortDescription: "Brief description",
    image: "your-image-url",
    category: "Category",
    duration: "Timeline",
    team: "Team size",
    technologies: ["Tech1", "Tech2"],
    content: "Detailed HTML content"
  }
]
```

#### Presentations/Decks
Edit `components/sections/Decks.tsx`:
```typescript
const decks: Deck[] = [
  {
    id: 1,
    title: "Your Presentation",
    description: "Description",
    thumbnail: "thumbnail-url",
    category: "Category",
    date: "Date",
    audience: "Target audience",
    fileUrl: "/path/to/file.pdf",
    slides: 25
  }
]
```

#### Visual Gallery
Edit `components/sections/VisualGallery.tsx`:
```typescript
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Your Work",
    description: "Description",
    type: 'image', // or 'video'
    src: "full-size-url",
    thumbnail: "thumbnail-url",
    category: "Category",
    tags: ["tag1", "tag2"],
    aspectRatio: 'landscape' // or 'portrait', 'square', 'wide'
  }
]
```

### Styling Customization

#### Colors
Update `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#your-color-50',
    100: '#your-color-100',
    // ... more shades
  }
}
```

#### Fonts
Update `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

### Adding New Sections

1. Create a new component in `components/sections/`
2. Add it to the sections array in `app/page.tsx`
3. Update the navigation in `components/Navigation.tsx`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Optimization

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic with Next.js
- **Bundle Analysis**: Built-in with Next.js
- **Caching**: Optimized for production

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure
```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navigation.tsx     # Navigation component
│   └── sections/          # Section components
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #38bdf8)
- **Dark Mode**: Dark grays (#0f172a to #334155)
- **Accent**: Purple and pink gradients

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (for code)

### Animations
- **Entrance**: Fade in and slide up
- **Hover**: Scale and shadow effects
- **Transitions**: Smooth 300ms transitions

## 🔒 Security

- **Form Validation**: Client-side validation
- **XSS Protection**: Built-in with React
- **CSRF Protection**: Implement for production forms

## 📈 SEO

- **Meta Tags**: Complete SEO optimization
- **Open Graph**: Social media sharing
- **Structured Data**: Ready for implementation
- **Sitemap**: Generate for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support or questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

## 🎉 Credits

- **Icons**: [Lucide React](https://lucide.dev/)
- **Images**: [Unsplash](https://unsplash.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

**Happy coding! 🚀**
