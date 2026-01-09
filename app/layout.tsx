import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Engineer Portfolio | Machine Learning & Deep Learning Expert',
  description: 'Portfolio of an AI Engineer specializing in machine learning, deep learning, LLMs, and computer vision. Building intelligent systems that push the boundaries of AI.',
  keywords: 'AI Engineer, Machine Learning, Deep Learning, LLM, NLP, Computer Vision, PyTorch, TensorFlow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
