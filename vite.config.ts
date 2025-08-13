import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'public', 'User-Testing');
    await fs.mkdir(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'configure-server',
      configureServer(server) {
        const app = express();
        app.use(cors());
        app.use(express.json({ limit: '10mb' }));

        // Serve static files from public/User-Testing
        app.use('/User-Testing', express.static(path.join(__dirname, 'public', 'User-Testing')));

        // Upload image endpoint
        app.post('/api/upload-image', upload.single('image'), async (req, res) => {
          try {
            if (!req.file) {
              return res.status(400).json({ success: false, error: 'No file uploaded' });
            }
            res.json({ 
              success: true, 
              filename: req.file.filename,
              path: `/User-Testing/${req.file.filename}`
            });
          } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ success: false, error: error.message });
          }
        });

        // Delete image endpoint
        app.delete('/api/delete-image/:filename', async (req, res) => {
          try {
            const { filename } = req.params;
            const filePath = path.join(__dirname, 'public', 'User-Testing', filename);
            
            try {
              await fs.access(filePath);
              await fs.unlink(filePath);
              res.json({ success: true, message: 'Image deleted successfully' });
            } catch (error) {
              res.json({ success: true, message: 'Image already deleted or not found' });
            }
          } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ success: false, error: error.message });
          }
        });

        // Save method data endpoint
        app.post('/api/save-method/:slug', async (req, res) => {
          try {
            const { slug } = req.params;
            const data = req.body;
            const filePath = path.join(__dirname, 'src', 'data', 'methods', `${slug}.json`);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            res.json({ success: true, message: 'Method data saved successfully' });
          } catch (error) {
            console.error('Error saving method data:', error);
            res.status(500).json({ success: false, error: error.message });
          }
        });

        // Save resource data endpoint
        app.post('/api/save-resource/:slug', async (req, res) => {
          try {
            const { slug } = req.params;
            const data = req.body;
            const filePath = path.join(__dirname, 'src', 'data', 'resources', `${slug}.json`);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2));
            res.json({ success: true, message: 'Resource data saved successfully' });
          } catch (error) {
            console.error('Error saving resource data:', error);
            res.status(500).json({ success: false, error: error.message });
          }
        });

        // Save content endpoint
        app.post('/api/save-content', async (req, res) => {
          try {
            const { path: contentPath, content } = req.body;
            console.log('Saving content to:', contentPath, content);
            res.json({ success: true, message: 'Content saved successfully' });
          } catch (error) {
            console.error('Error saving content:', error);
            res.status(500).json({ success: false, error: error.message });
          }
        });

        // Apply express middleware to Vite
        server.middlewares.use(app);
      }
    }
  ],
  server: {
    port: 5173
  }
}) 