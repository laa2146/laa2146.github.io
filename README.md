# Personal Portfolio Website

A clean, minimal, and professional personal portfolio website that's easy to update and deploy. All content is managed through a single JSON configuration file.

## Features

- 📝 Easy content management via `data.json`
- 🎨 Clean and minimal design
- 📱 Fully responsive layout
- 🚀 Ready for GitHub Pages deployment
- ✨ Smooth scrolling navigation
- 🔧 No build process required

## Sections Included

- **Header**: Name, tagline, and contact information
- **About Me**: Personal introduction and background
- **Projects**: Showcase your work with descriptions, technologies, and links
- **Skills**: Organized by categories
- **Education**: Academic background
- **Hobbies**: Personal interests

## Getting Started

### Local Development

1. Clone this repository
2. Open `data.json` and update with your information
3. Open `index.html` in a web browser

Then visit `http://localhost:8000` in your browser.

## Updating Your Portfolio

All content is managed in the `data.json` file. Simply edit this file to update your portfolio.

### Structure of data.json

```json
{
  "name": "Your Name",
  "tagline": "Your professional tagline",
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "website": "https://yourwebsite.com"
  },
  "about": {
    "title": "About Me",
    "description": "A brief summary",
    "paragraphs": [
      "Detailed paragraph 1",
      "Detailed paragraph 2"
    ]
  },
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "technologies": ["Tech1", "Tech2"],
      "link": "https://github.com/...",
      "demo": "https://demo-link.com"
    }
  ],
  "skills": {
    "categories": [
      {
        "name": "Category Name",
        "items": ["Skill1", "Skill2"]
      }
    ]
  },
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University Name",
      "location": "City, State",
      "year": "2020",
      "description": "Additional details"
    }
  ],
  "hobbies": [
    {
      "name": "Hobby Name",
      "description": "Description of hobby"
    }
  ]
}
```

### Adding New Items

#### Add a New Project
```json
{
  "title": "My New Project",
  "description": "What this project does",
  "technologies": ["React", "Node.js"],
  "link": "https://github.com/username/project",
  "demo": "https://project-demo.com"
}
```

#### Add a New Skill Category
```json
{
  "name": "New Category",
  "items": ["Skill 1", "Skill 2", "Skill 3"]
}
```

#### Add Education Entry
```json
{
  "degree": "Bachelor of Science",
  "institution": "University Name",
  "location": "City, State",
  "year": "2020",
  "description": "Relevant coursework or achievements"
}
```

#### Add a Hobby
```json
{
  "name": "Photography",
  "description": "What you enjoy about it"
}
```

## Deploying to GitHub Pages

1. **Create a GitHub repository**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be available at `https://yourusername.github.io/portfolio/`

3. **Update Your Portfolio**
   ```powershell
   # Edit data.json with your changes
   git add data.json
   git commit -m "Update portfolio content"
   git push
   ```
   
   Your changes will be live in a few minutes!

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #34495e;
    --accent-color: #3498db;
    --text-color: #333;
    --light-gray: #ecf0f1;
    --border-color: #bdc3c7;
    --white: #ffffff;
}
```

### Modifying Layout

- Edit `styles.css` to adjust spacing, fonts, and layout
- Modify `index.html` to change the structure
- Update `script.js` to change how data is displayed

## File Structure

```
personal_portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript for loading data
├── data.json           # Your portfolio content (EDIT THIS!)
├── README.md           # This file
└── .gitignore         # Git ignore file
```

## Browser Support

This portfolio works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Tips

- Keep your `data.json` file valid JSON (use a JSON validator if needed)
- Use absolute URLs for external links
- Optimize images before adding them
- Test locally before pushing to GitHub
- Keep descriptions concise and impactful

## License

Feel free to use this template for your own portfolio. No attribution required.

## Support

If you encounter issues:
1. Validate your `data.json` using [JSONLint](https://jsonlint.com/)
2. Check the browser console for errors
3. Ensure all files are in the correct locations
4. Make sure you're using a local server for development (not just opening the HTML file)

---

**Happy Portfolio Building! 🚀**
