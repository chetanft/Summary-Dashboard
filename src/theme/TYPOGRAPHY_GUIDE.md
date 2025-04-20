# Typography Style Guide

This document provides guidelines for using typography in the TMS Dashboard application.

## Font Family

The TMS Dashboard uses the Inter font family for all text elements. Inter is a modern, clean sans-serif font that provides excellent readability across different screen sizes and devices.

## Font Weights

- **Regular (400)**: Used for body text and general content
- **Medium (500)**: Used for subtitles, buttons, and emphasized text
- **Semibold (600)**: Used for headings and important UI elements

## Font Sizes

The TMS Dashboard uses a consistent set of font sizes based on the Typography.json file:

- **XXL (28px)**: Used for main page headings (h1)
- **XL (24px)**: Used for section headings (h2)
- **LG (20px)**: Used for subsection headings (h3)
- **MD (16px)**: Used for minor headings (h4) and body text (body1)
- **SM (14px)**: Used for small headings (h5), small body text (body2), and buttons
- **XS (12px)**: Used for captions, overlines, and very small text

## Typography Variants

### Headings

- **h1**: 28px, Semibold (600), line-height 1.4
- **h2**: 24px, Semibold (600), line-height 1.4
- **h3**: 20px, Semibold (600), line-height 1.4
- **h4**: 16px, Semibold (600), line-height 1.4
- **h5**: 14px, Semibold (600), line-height 1.4
- **h6**: 12px, Semibold (600), line-height 1.4

### Body Text

- **body1**: 16px, Regular (400), line-height 1.4
- **body2**: 14px, Regular (400), line-height 1.4

### Other Variants

- **subtitle1**: 16px, Medium (500), line-height 1.4
- **subtitle2**: 14px, Medium (500), line-height 1.4
- **button**: 14px, Medium (500), line-height 1.4, no text transform
- **caption**: 12px, Regular (400), line-height 1.4
- **overline**: 12px, Regular (400), line-height 1.4, uppercase

## Usage Guidelines

### Headings

- Use headings hierarchically (h1 > h2 > h3, etc.)
- Avoid skipping heading levels
- Use h1 for page titles
- Use h2 for major sections
- Use h3 for subsections
- Use h4-h6 for minor headings and UI elements

### Body Text

- Use body1 for primary content
- Use body2 for secondary content, descriptions, and smaller UI elements

### Other Elements

- Use subtitle1 and subtitle2 for emphasized text that isn't a heading
- Use button for button text
- Use caption for supplementary information, timestamps, and metadata
- Use overline for labels, categories, and other organizational text

## Responsive Typography

The typography system is designed to be responsive, with font sizes adjusting based on screen size:

- For screens larger than 1440px, use the default font sizes
- For screens between 800px and 1440px, use slightly smaller font sizes:
  - XXL: 26px (instead of 28px)
  - XL: 21px (instead of 24px)
  - LG: 18px (instead of 20px)
  - MD: 14px (instead of 16px)
  - SM: 12px (instead of 14px)

## Examples

### Page Title
```jsx
<Typography variant="h1">Dashboard Overview</Typography>
```

### Section Heading
```jsx
<Typography variant="h2">Performance Metrics</Typography>
```

### Subsection Heading
```jsx
<Typography variant="h3">Regional Analysis</Typography>
```

### Body Text
```jsx
<Typography variant="body1">
  This is the main content of the page, providing detailed information about the topic.
</Typography>
```

### Secondary Text
```jsx
<Typography variant="body2">
  Additional information that supports the main content but is less important.
</Typography>
```

### Button Text
```jsx
<Button variant="contained">
  Submit
</Button>
```

### Caption
```jsx
<Typography variant="caption">Last updated: 2 hours ago</Typography>
```

## Accessibility Considerations

- Maintain sufficient color contrast between text and background
- Avoid using font sizes smaller than 12px for readable content
- Use appropriate line height (1.4-1.5) to improve readability
- Ensure text can be resized up to 200% without loss of content or functionality
