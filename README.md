# AI Career Mentor

A Next.js application that uses open-source AI (Ollama) to generate personalized career paths based on user quiz responses.

## Features

- 🔐 **Authentication**: Supabase authentication
- 🤖 **AI-Powered**: Uses Ollama (open-source AI) to generate career recommendations
- 📊 **Quiz System**: Interactive quiz to assess user preferences
- 🗺️ **Career Path Generation**: AI-generated personalized 4-phase career paths
- 💾 **Database**: Supabase for data storage

## Prerequisites

- Node.js 18+ and npm/pnpm
- Ollama installed and running (for AI features)
- Supabase account and project

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aicareermentor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Ollama Configuration (Open-source AI)
   OLLAMA_URL=http://localhost:11434
   OLLAMA_MODEL=llama3.2
   
   # Optional: Hugging Face (Alternative AI)
   # HUGGINGFACE_API_KEY=your_key_here
   # HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.2
   ```

4. **Install and setup Ollama**
   - Download from: https://ollama.ai
   - Install Ollama
   - Pull the model: `ollama pull llama3.2`
   - Ensure Ollama is running (it starts automatically)

5. **Setup Supabase Database**
   - Run the SQL scripts in the `scripts/` directory to create the necessary tables
   - Configure Row Level Security (RLS) policies as needed

## Running the Application

### Development Mode

**Standard mode:**
```bash
npm run dev
```

**With auto-open browser:**
```bash
npm run dev:open
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
aicareermentor/
├── app/
│   ├── api/
│   │   ├── career-path/     # Career path generation API
│   │   ├── quiz/            # Quiz submission API
│   │   └── submit-quiz/     # Quiz submission with AI
│   ├── auth/                # Authentication pages
│   ├── career-path/         # Career path display page
│   ├── quiz/                # Quiz page
│   └── profile/             # User profile page
├── components/             # React components
├── lib/
│   └── supabase/           # Supabase client configuration
├── scripts/                 # SQL database scripts
└── public/                 # Static assets
```

## How It Works

1. **User Registration/Login**: Users authenticate via Supabase
2. **Quiz Completion**: Users answer 5 career-related questions
3. **AI Analysis**: Ollama AI analyzes responses and generates recommendations
4. **Career Path Generation**: AI creates a personalized 4-phase career path
5. **Path Display**: User views their customized career roadmap

## Technologies Used

- **Next.js 16**: React framework
- **Supabase**: Authentication and database
- **Ollama**: Open-source AI for career recommendations
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `OLLAMA_URL` | Ollama API URL (default: http://localhost:11434) | Yes (for AI) |
| `OLLAMA_MODEL` | Ollama model name (default: llama3.2) | Yes (for AI) |
| `HUGGINGFACE_API_KEY` | Hugging Face API key (optional fallback) | No |
| `HUGGINGFACE_MODEL` | Hugging Face model name | No |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For issues and questions, please open an issue in the repository.

