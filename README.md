# IELTS Master - Practice Platform 🚀

A modern, high-performance web application designed to help students master the IELTS Writing module. Built with **Next.js 15**, this platform provides a realistic simulation environment for both Task 1 (Academic) and Task 2 (Essay) writing practice.

![IELTS Master Preview](/image.png)

## ✨ Features

### 📊 Comprehensive Dashboard
- **Progress Tracking**: Monitor your average band scores and practice streaks.
- **Score Trends**: Interactive charts showing your performance over time.
- **Quick Insights**: Breakdown of Lexical Resource and Grammatical Range performance.
- **Goal Management**: Weekly targets to keep you motivated.

### ✍️ Professional Writing Interface
- **Realistic Simulation**: Mimics the actual IELTS computer-delivered test environment.
- **Smart Timer**: Integrated countdown with alerts for time management.
- **Real-time Word Counter**: Color-coded feedback as you reach word count targets.
- **Auto-Save**: Robust saving mechanism ensures your drafts are never lost.
- **Task Instructions**: Dedicated panel with brainstorming prompts and requirements.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: JavaScript (ESM)
- **Styling**: Vanilla CSS with CSS Modules (Premium teal/cyan theme)
- **Charts**: [Recharts](https://recharts.org/)
- **State/Persistence**: LocalStorage for offline-first resilience

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
├── app/               # Next.js App Router (Layouts, Pages, Styles)
├── components/        # Reusable UI Components
├── data/              # Writing Task Database
├── utils/             # Timer, Word Counting, and Storage Utilities
├── public/            # Static Assets
└── README.md          # Project Documentation
```

## 🚢 Deployment

The application is optimized for deployment on **Vercel**. Simply push your code to GitHub and import the project into Vercel for automatic CI/CD.

For manual builds:
```bash
npm run build
npm run start
```

## 🔮 Roadmap

- [ ] **AI Evaluator**: Integrate LLMs for automated band-score feedback.
- [ ] **Listening Module**: Interactive audio practice sessions.
- [ ] **Reading Module**: Timed reading comprehension tests.
- [ ] **User Accounts**: Cloud synchronization for progress across devices.

## 📄 License

MIT

---
*Built with ❤️ for IELTS aspirants.*
