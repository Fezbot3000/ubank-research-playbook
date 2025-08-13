# Edit Mode Guide

## How to Use Edit Mode

The Research Playbook now includes an inline editing feature that allows you to update all text content directly on the page without needing to edit code files.

### Starting Edit Mode

1. **Start the development server**: Run `npm run dev` to start the application
2. **Click "Edit Mode"**: In the header, click the "Edit Mode" button to enable editing
3. **Visual indicator**: The page will have a cyan border when edit mode is active

### Editing Content

When in edit mode:
- All text fields will have a subtle border indicating they're editable
- Click on any text to start editing
- The field will highlight with a cyan outline when active
- Press `Enter` to save single-line edits
- Press `Escape` to cancel editing
- Click outside the field to save changes

### Saving Changes

- **Save All**: Click the "Save All" button in the header to save all changes
- **Unsaved indicator**: You'll see "Unsaved changes" warning when there are pending changes
- Changes are saved directly to the JSON files in `src/data/methods/`

### Exiting Edit Mode

- Click "Cancel" to exit without saving
- If you have unsaved changes, you'll be prompted to confirm

### What Can Be Edited

Currently editable content includes:
- Method titles
- Method descriptions/purpose
- Step titles and descriptions
- Any text content on method pages

### Technical Details

- Changes are saved to the actual JSON files, not a database
- The API endpoints are integrated directly into the Vite development server
- Only method data is currently saveable (other pages coming soon)

### Security Note

⚠️ This feature is intended for development use only. Do not use in production as it allows direct file system access. 