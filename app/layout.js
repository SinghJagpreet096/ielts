import './globals.css';

export const metadata = {
    title: 'IELTS Master - Writing Practice',
    description: 'Practice IELTS Writing Task 1 and Task 2 with AI-powered feedback and progress tracking',
    keywords: 'IELTS, writing practice, Task 1, Task 2, English test preparation',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <div className="app-layout">
                    {children}
                </div>
            </body>
        </html>
    );
}
